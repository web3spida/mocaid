import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { createPublicClient, createWalletClient, http, custom } from 'viem'
// Import JWT service
import { getAirKitJWT } from '../services/jwtService'

// Get AIR Kit configuration from environment variables
const getAirKitConfig = () => ({
  partnerId: import.meta.env.VITE_AIRKIT_PARTNER_ID,
  issuerDid: import.meta.env.VITE_AIRKIT_ISSUER_DID,
  verifierDid: import.meta.env.VITE_AIRKIT_VERIFIER_DID,
  apiUrl: import.meta.env.VITE_AIRKIT_API_URL || 'https://api.moca.network',
  widgetUrl: import.meta.env.VITE_AIRKIT_WIDGET_URL || 'https://widget.moca.network',
  environment: import.meta.env.VITE_AIRKIT_ENVIRONMENT || 'testnet'
})

// Hook for DID Management
export const useDID = () => {
  const { address, isConnected } = useAccount()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [did, setDid] = useState(null)
  const [publicKey, setPublicKey] = useState(null)

  const generateDID = useCallback(() => {
    setLoading(true)
    setError(null)

    try {
      if (!address) {
        throw new Error('Wallet not connected')
      }

      // Generate DID URI
      const randomId = Math.random().toString(36).substr(2, 9)
      const didURI = `did:moca:${randomId}`
      const newPublicKey = address // Use address as public key

      setDid(didURI)
      setPublicKey(newPublicKey)
      
      return { did: didURI, publicKey: newPublicKey }
    } catch (err) {
      console.error('DID generation failed:', err)
      setError(err.message)
      return { did: null, publicKey: null }
    } finally {
      setLoading(false)
    }
  }, [address])

  return {
    did,
    publicKey,
    loading,
    error,
    generateDID,
  }
}

// Hook for Verifiable Credentials
export const useVerifiableCredentials = () => {
  const { address, isConnected } = useAccount()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [credentials, setCredentials] = useState([])

  // Env + chain config
  const CHAIN_ID = parseInt(import.meta.env.VITE_MOCA_CHAIN_ID || '7001')
  const RPC_URL = import.meta.env.VITE_MOCA_TESTNET_RPC_URL || import.meta.env.VITE_MOCA_RPC_URL || 'https://devnet-rpc.mocachain.org'
  const CREDENTIAL_ISSUER_ADDRESS = import.meta.env.VITE_CREDENTIAL_ISSUER_ADDRESS

  const chain = {
    id: CHAIN_ID,
    name: 'Moca Testnet',
    nativeCurrency: { name: 'MOCA', symbol: 'MOCA', decimals: 18 },
    rpcUrls: { default: { http: [RPC_URL] }, public: { http: [RPC_URL] } }
  }

  const publicClient = createPublicClient({ chain, transport: http(RPC_URL) })
  const walletClient = typeof window !== 'undefined' ? createWalletClient({ chain, transport: custom(window.ethereum) }) : null

  // Minimal ABI for credential issuer interactions
  const CREDENTIAL_ISSUER_ABI = [
    {
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'credentialHash', type: 'string' },
        { name: 'credentialType', type: 'string' },
        { name: 'expiresAt', type: 'uint256' }
      ],
      name: 'issueCredential',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ name: 'credentialHash', type: 'string' }],
      name: 'verifyCredential',
      outputs: [{ name: 'isValid', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ name: 'credentialHash', type: 'string' }],
      name: 'revokeCredential',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ name: 'holder', type: 'address' }],
      name: 'getHolderCredentials',
      outputs: [{ name: 'credentialHashes', type: 'string[]' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ name: 'credentialHash', type: 'string' }],
      name: 'getCredential',
      outputs: [
        { name: 'issuer', type: 'address' },
        { name: 'holder', type: 'address' },
        { name: 'credentialType', type: 'string' },
        { name: 'issuedAt', type: 'uint256' },
        { name: 'expiresAt', type: 'uint256' },
        { name: 'isRevoked', type: 'bool' }
      ],
      stateMutability: 'view',
      type: 'function'
    }
  ]

  // Load credentials from smart contract
  useEffect(() => {
    const loadCredentials = async () => {
      if (isConnected && address && CREDENTIAL_ISSUER_ADDRESS) {
        try {
          setLoading(true)
          const credentialHashes = await publicClient.readContract({
            address: CREDENTIAL_ISSUER_ADDRESS,
            abi: CREDENTIAL_ISSUER_ABI,
            functionName: 'getHolderCredentials',
            args: [address]
          })
          
          const credentialPromises = credentialHashes.map(async (hash) => {
            try {
              const [issuer, holder, credentialType, issuedAt, expiresAt, isRevoked] = await publicClient.readContract({
                address: CREDENTIAL_ISSUER_ADDRESS,
                abi: CREDENTIAL_ISSUER_ABI,
                functionName: 'getCredential',
                args: [hash]
              })
              
              return {
                id: hash,
                '@context': [
                  'https://www.w3.org/2018/credentials/v1',
                  'https://w3id.org/security/suites/secp256k1-2019/v1'
                ],
                type: ['VerifiableCredential', credentialType],
                issuer: issuer,
                holder: holder,
                issuanceDate: new Date(Number(issuedAt) * 1000).toISOString(),
                expirationDate: expiresAt > 0 ? new Date(Number(expiresAt) * 1000).toISOString() : null,
                credentialSubject: {
                  id: `did:moca:${holder}`,
                  type: credentialType
                },
                credentialStatus: {
                  id: `${hash}#status`,
                  type: 'RevocationList2020Status',
                  revoked: isRevoked
                },
                proof: {
                  type: 'EcdsaSecp256k1Signature2019',
                  created: new Date(Number(issuedAt) * 1000).toISOString(),
                  proofPurpose: 'assertionMethod',
                  verificationMethod: `${issuer}#keys-1`
                }
              }
            } catch (err) {
              console.error(`Failed to load credential ${hash}:`, err)
              return null
            }
          })
          
          const loadedCredentials = (await Promise.all(credentialPromises)).filter(Boolean)
          setCredentials(loadedCredentials)
        } catch (err) {
          console.error('Failed to load credentials from contract:', err)
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
    }

    loadCredentials()
  }, [address, isConnected, CREDENTIAL_ISSUER_ADDRESS])

  const issueCredential = useCallback(async (credentialData) => {
    if (!isConnected || !walletClient || !CREDENTIAL_ISSUER_ADDRESS) {
      setError('Wallet not connected or contract not available')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      // Create a simple credential hash (replace with cryptographic hash in production)
      const credentialHash = `cred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Set expiration (default to 1 year if not specified)
      const expiresAt = credentialData.expiresAt || Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)

      // Issue credential on smart contract
      const txHash = await walletClient.writeContract({
        address: CREDENTIAL_ISSUER_ADDRESS,
        abi: CREDENTIAL_ISSUER_ABI,
        functionName: 'issueCredential',
        account: address,
        args: [
          credentialData.holder || address,
          credentialHash,
          credentialData.type,
          expiresAt
        ]
      })

      // Create the credential object
      const newCredential = {
        id: credentialHash,
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/security/suites/secp256k1-2019/v1'
        ],
        type: ['VerifiableCredential', credentialData.type],
        issuer: address,
        holder: credentialData.holder || address,
        issuanceDate: new Date().toISOString(),
        expirationDate: new Date(expiresAt * 1000).toISOString(),
        credentialSubject: {
          id: `did:moca:${credentialData.holder || address}`,
          ...credentialData.subject
        },
        credentialStatus: {
          id: `${credentialHash}#status`,
          type: 'RevocationList2020Status',
          revoked: false
        },
        proof: {
          type: 'EcdsaSecp256k1Signature2019',
          created: new Date().toISOString(),
          proofPurpose: 'assertionMethod',
          verificationMethod: `${address}#keys-1`,
          transactionHash: txHash
        }
      }

      // Update local state
      const updatedCredentials = [...credentials, newCredential]
      setCredentials(updatedCredentials)
      
      return newCredential
    } catch (err) {
      console.error('Credential issuance failed:', err)
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [address, isConnected, walletClient, CREDENTIAL_ISSUER_ADDRESS, credentials])

  const verifyCredential = useCallback(async (credential) => {
    if (!CREDENTIAL_ISSUER_ADDRESS) {
      setError('Contract not available')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const isValid = await publicClient.readContract({
        address: CREDENTIAL_ISSUER_ADDRESS,
        abi: CREDENTIAL_ISSUER_ABI,
        functionName: 'verifyCredential',
        args: [credential.id]
      })
      
      return {
        verified: isValid,
        status: isValid ? 'valid' : 'invalid',
        checks: {
          signature: isValid,
          expiration: credential.expirationDate ? new Date(credential.expirationDate) > new Date() : true,
          revocation: !credential.credentialStatus?.revoked,
          issuer: true
        },
        verifiedAt: new Date().toISOString()
      }
    } catch (err) {
      console.error('Credential verification failed:', err)
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [CREDENTIAL_ISSUER_ADDRESS])

  const revokeCredential = useCallback(async (credentialId) => {
    if (!isConnected || !walletClient || !CREDENTIAL_ISSUER_ADDRESS) {
      setError('Wallet not connected or contract not available')
      return false
    }

    setLoading(true)
    setError(null)

    try {
      // Revoke credential on smart contract
      await walletClient.writeContract({
        address: CREDENTIAL_ISSUER_ADDRESS,
        abi: CREDENTIAL_ISSUER_ABI,
        functionName: 'revokeCredential',
        account: address,
        args: [credentialId]
      })
      
      // Update local state
      const updatedCredentials = credentials.map(cred => 
        cred.id === credentialId 
          ? { ...cred, credentialStatus: { ...cred.credentialStatus, revoked: true } }
          : cred
      )
      setCredentials(updatedCredentials)
      
      return true
    } catch (err) {
      console.error('Credential revocation failed:', err)
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [address, isConnected, walletClient, CREDENTIAL_ISSUER_ADDRESS, credentials])

  return {
    credentials,
    loading,
    error,
    issueCredential,
    verifyCredential,
    revokeCredential,
    isConnected
  }
}

// Hook for Verifiable Presentations
export const useVerifiablePresentations = () => {
  const { address, isConnected } = useAccount()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [presentations, setPresentations] = useState([])

  // Env + chain config (mirror credentials hook setup)
  const CHAIN_ID = parseInt(import.meta.env.VITE_MOCA_CHAIN_ID || '7001')
  const RPC_URL = import.meta.env.VITE_MOCA_TESTNET_RPC_URL || import.meta.env.VITE_MOCA_RPC_URL || 'https://devnet-rpc.mocachain.org'
  const CREDENTIAL_ISSUER_ADDRESS = import.meta.env.VITE_CREDENTIAL_ISSUER_ADDRESS

  const chain = {
    id: CHAIN_ID,
    name: 'Moca Testnet',
    nativeCurrency: { name: 'MOCA', symbol: 'MOCA', decimals: 18 },
    rpcUrls: { default: { http: [RPC_URL] }, public: { http: [RPC_URL] } }
  }

  const publicClient = createPublicClient({ chain, transport: http(RPC_URL) })

  // Minimal ABI for credential issuer interactions used in presentation verification
  const CREDENTIAL_ISSUER_ABI = [
    {
      inputs: [{ name: 'credentialHash', type: 'string' }],
      name: 'verifyCredential',
      outputs: [{ name: 'isValid', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    }
  ]

  // Remove localStorage for presentations - use smart contracts for verification
  useEffect(() => {
    // In production, this would load presentation history from smart contract events
    // For now, initialize empty array
    setPresentations([])
  }, [])

  const createPresentation = useCallback(async (credentials, options = {}) => {
    if (!isConnected || !CREDENTIAL_ISSUER_ADDRESS) {
      setError('Wallet not connected or contract not available')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      // Verify all credentials are valid before creating presentation
      const verificationPromises = credentials.map(async (credential) => {
        try {
          const isValid = await publicClient.readContract({
            address: CREDENTIAL_ISSUER_ADDRESS,
            abi: CREDENTIAL_ISSUER_ABI,
            functionName: 'verifyCredential',
            args: [credential.id]
          })
          return { credential, isValid }
        } catch (err) {
          console.error(`Failed to verify credential ${credential.id}:`, err)
          return { credential, isValid: false }
        }
      })

      const verificationResults = await Promise.all(verificationPromises)
      const invalidCredentials = verificationResults.filter(result => !result.isValid)
      
      if (invalidCredentials.length > 0) {
        throw new Error(`Invalid credentials found: ${invalidCredentials.map(r => r.credential.id).join(', ')}`)
      }

      const presentation = {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/security/suites/secp256k1-2019/v1'
        ],
        id: `urn:uuid:${crypto.randomUUID()}`,
        type: ['VerifiablePresentation'],
        verifiableCredential: Array.isArray(credentials) ? credentials : [credentials],
        holder: `did:moca:${address}`,
        created: new Date().toISOString(),
        proof: {
          type: 'EcdsaSecp256k1Signature2019',
          created: new Date().toISOString(),
          challenge: options.challenge || `challenge_${Math.random().toString(36).substr(2, 16)}`,
          domain: options.domain || 'mocaid.network',
          proofPurpose: 'authentication',
          verificationMethod: `did:moca:${address}#keys-1`,
          jws: null // In production, generate proper cryptographic signature
        }
      }

      // Store presentation in state for current session
      const updatedPresentations = [...presentations, presentation]
      setPresentations(updatedPresentations)
      
      return presentation
    } catch (err) {
      console.error('Presentation creation failed:', err)
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [address, isConnected, CREDENTIAL_ISSUER_ADDRESS, presentations])

  const verifyPresentation = useCallback(async (presentation) => {
    if (!CREDENTIAL_ISSUER_ADDRESS) {
      setError('Contract not available')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      // Verify all credentials in the presentation
      const credentialVerifications = await Promise.all(
        presentation.verifiableCredential.map(async (credential) => {
          try {
            const isValid = await publicClient.readContract({
              address: CREDENTIAL_ISSUER_ADDRESS,
              abi: CREDENTIAL_ISSUER_ABI,
              functionName: 'verifyCredential',
              args: [credential.id]
            })
            return isValid
          } catch (err) {
            console.error(`Failed to verify credential ${credential.id}:`, err)
            return false
          }
        })
      )

      const allCredentialsValid = credentialVerifications.every(Boolean)
      
      // Basic presentation structure validation
      const hasValidStructure = presentation && 
                               presentation['@context'] && 
                               presentation.verifiableCredential && 
                               presentation.proof

      const isValid = hasValidStructure && allCredentialsValid

      return {
        verified: isValid,
        status: isValid ? 'valid' : 'invalid',
        holder: presentation.holder,
        credentialCount: presentation.verifiableCredential.length,
        credentialVerifications,
        verifiedAt: new Date().toISOString()
      }
    } catch (err) {
      console.error('Presentation verification failed:', err)
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [CREDENTIAL_ISSUER_ADDRESS])

  return {
    presentations,
    loading,
    error,
    createPresentation,
    verifyPresentation,
    isConnected
  }
}

// Hook for Schema Management (kept simple as schemas are typically managed off-chain)
export const useSchemas = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // Remove localStorage for schemas - use smart contracts for schema management
  const [schemas, setSchemas] = useState([])

  const createSchema = useCallback(async (schemaData) => {
    setLoading(true)
    setError(null)

    try {
      // Create schema object
      const newSchema = {
        id: `schema_${Date.now()}`,
        title: schemaData.title,
        description: schemaData.description,
        type: 'object',
        properties: schemaData.properties || {},
        required: schemaData.required || [],
        created: new Date().toISOString(),
        version: '1.0.0'
      }

      const updatedSchemas = [...schemas, newSchema]
      setSchemas(updatedSchemas)
      
      return newSchema
    } catch (err) {
      console.error('Schema creation failed:', err)
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [schemas])

  // Load schemas from smart contract events (in production)
  useEffect(() => {
    // In production, this would load schemas from smart contract events
    // For now, initialize empty array
    setSchemas([])
  }, [])

  return {
    schemas,
    loading,
    error,
    createSchema
  }
}

// Remove the AIR Service class and related functions since we're using smart contracts directly
// The getAirKitConfig function is already defined at the top of the file