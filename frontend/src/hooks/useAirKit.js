import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { useContracts } from './useContracts'
// Import JWT service
import { getAirKitJWT } from '../services/jwtService'

// AIR Kit SDK Configuration
const getAirKitConfig = () => ({
  partnerId: import.meta.env.VITE_AIRKIT_PARTNER_ID,
  issuerDid: import.meta.env.VITE_AIRKIT_ISSUER_DID,
  apiUrl: import.meta.env.VITE_AIRKIT_API_URL || 'https://api.moca.network',
  widgetUrl: import.meta.env.VITE_AIRKIT_WIDGET_URL || 'https://widget.moca.network',
  environment: import.meta.env.VITE_AIRKIT_ENVIRONMENT || 'testnet'
})

// Hook for DID Management
export const useDID = () => {
  const { address, isConnected } = useAccount()
  const { identityRegistry } = useContracts()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [did, setDid] = useState(null)

  // Load DID from smart contract on mount
  useEffect(() => {
    const loadDID = async () => {
      if (isConnected && address && identityRegistry) {
        try {
          setLoading(true)
          const hasIdentity = await identityRegistry.read.hasIdentity([address])
          
          if (hasIdentity) {
            const [didURI, createdAt, updatedAt] = await identityRegistry.read.getIdentity([address])
            setDid({
              did: didURI,
              document: {
                '@context': ['https://www.w3.org/ns/did/v1'],
                id: didURI,
                verificationMethod: [{
                  id: `${didURI}#keys-1`,
                  type: 'EcdsaSecp256k1VerificationKey2019',
                  controller: didURI,
                  publicKeyHex: address
                }],
                authentication: [`${didURI}#keys-1`]
              },
              metadata: {
                created: new Date(Number(createdAt) * 1000).toISOString(),
                updated: new Date(Number(updatedAt) * 1000).toISOString(),
                owner: address
              }
            })
          }
        } catch (err) {
          console.error('Failed to load DID from contract:', err)
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
    }

    loadDID()
  }, [address, isConnected, identityRegistry])

  const generateDID = useCallback(async (options = {}) => {
    if (!isConnected || !identityRegistry) {
      setError('Wallet not connected or contract not available')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      // Generate DID URI
      const randomId = Math.random().toString(36).substr(2, 9)
      const didURI = `did:moca:${randomId}`
      
      // Register identity on smart contract
      const tx = await identityRegistry.write.registerIdentity([address, didURI])
      
      // Wait for transaction confirmation
      // Note: In a real app, you'd wait for the transaction to be mined
      
      const newDid = {
        did: didURI,
        document: {
          '@context': ['https://www.w3.org/ns/did/v1'],
          id: didURI,
          verificationMethod: [{
            id: `${didURI}#keys-1`,
            type: 'EcdsaSecp256k1VerificationKey2019',
            controller: didURI,
            publicKeyHex: address
          }],
          authentication: [`${didURI}#keys-1`]
        },
        metadata: {
          created: new Date().toISOString(),
          owner: address,
          transactionHash: tx,
          ...options
        }
      }

      setDid(newDid)
      return newDid
    } catch (err) {
      console.error('DID generation failed:', err)
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [address, isConnected, identityRegistry])

  const resolveDID = useCallback(async (didURI) => {
    if (!identityRegistry) {
      setError('Contract not available')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const ownerAddress = await identityRegistry.read.getAddressFromDID([didURI])
      
      if (ownerAddress === '0x0000000000000000000000000000000000000000') {
        throw new Error('DID not found')
      }

      const [, createdAt, updatedAt] = await identityRegistry.read.getIdentity([ownerAddress])
      
      const resolvedDid = {
        did: didURI,
        document: {
          '@context': ['https://www.w3.org/ns/did/v1'],
          id: didURI,
          verificationMethod: [{
            id: `${didURI}#keys-1`,
            type: 'EcdsaSecp256k1VerificationKey2019',
            controller: didURI,
            publicKeyHex: ownerAddress
          }],
          authentication: [`${didURI}#keys-1`]
        },
        metadata: {
          created: new Date(Number(createdAt) * 1000).toISOString(),
          updated: new Date(Number(updatedAt) * 1000).toISOString(),
          owner: ownerAddress,
          resolved: new Date().toISOString()
        }
      }
      
      return resolvedDid
    } catch (err) {
      console.error('DID resolution failed:', err)
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [identityRegistry])

  return {
    did,
    loading,
    error,
    generateDID,
    resolveDID,
    isConnected
  }
}

// Hook for Verifiable Credentials
export const useVerifiableCredentials = () => {
  const { address, isConnected } = useAccount()
  const { credentialIssuer } = useContracts()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [credentials, setCredentials] = useState([])

  // Load credentials from smart contract
  useEffect(() => {
    const loadCredentials = async () => {
      if (isConnected && address && credentialIssuer) {
        try {
          setLoading(true)
          const credentialHashes = await credentialIssuer.read.getHolderCredentials([address])
          
          const credentialPromises = credentialHashes.map(async (hash) => {
            try {
              const [issuer, holder, credentialType, issuedAt, expiresAt, isRevoked] = 
                await credentialIssuer.read.getCredential([hash])
              
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
  }, [address, isConnected, credentialIssuer])

  const issueCredential = useCallback(async (credentialData) => {
    if (!isConnected || !credentialIssuer) {
      setError('Wallet not connected or contract not available')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      // Create credential hash from the data
      const credentialString = JSON.stringify({
        type: credentialData.type,
        subject: credentialData.subject,
        issuer: credentialData.issuer,
        timestamp: Date.now()
      })
      
      // Simple hash function (in production, use proper cryptographic hash)
      const credentialHash = `cred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Set expiration (default to 1 year if not specified)
      const expiresAt = credentialData.expiresAt || 
        Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year from now
      
      // Issue credential on smart contract
      const tx = await credentialIssuer.write.issueCredential([
        credentialData.holder || address,
        credentialHash,
        credentialData.type,
        expiresAt
      ])

      // Create the credential object
      const newCredential = {
        id: credentialHash,
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/security/suites/secp256k1-2019/v1'
        ],
        type: ['VerifiableCredential', credentialData.type],
        issuer: address, // Current user is the issuer
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
          transactionHash: tx
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
  }, [address, isConnected, credentialIssuer, credentials])

  const verifyCredential = useCallback(async (credential) => {
    if (!credentialIssuer) {
      setError('Contract not available')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const isValid = await credentialIssuer.read.verifyCredential([credential.id])
      
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
  }, [credentialIssuer])

  const revokeCredential = useCallback(async (credentialId) => {
    if (!isConnected || !credentialIssuer) {
      setError('Wallet not connected or contract not available')
      return false
    }

    setLoading(true)
    setError(null)

    try {
      // Revoke credential on smart contract
      const tx = await credentialIssuer.write.revokeCredential([credentialId])
      
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
  }, [address, isConnected, credentialIssuer, credentials])

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
  const { credentialIssuer } = useContracts()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [presentations, setPresentations] = useState([])

  // Remove localStorage for presentations - use smart contracts for verification
  useEffect(() => {
    // In production, this would load presentation history from smart contract events
    // For now, initialize empty array
    setPresentations([])
  }, [])

  const createPresentation = useCallback(async (credentials, options = {}) => {
    if (!isConnected || !credentialIssuer) {
      setError('Wallet not connected or contract not available')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      // Verify all credentials are valid before creating presentation
      const verificationPromises = credentials.map(async (credential) => {
        try {
          const isValid = await credentialIssuer.read.verifyCredential([credential.id])
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
  }, [address, isConnected, credentialIssuer, presentations])

  const verifyPresentation = useCallback(async (presentation) => {
    if (!credentialIssuer) {
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
            const isValid = await credentialIssuer.read.verifyCredential([credential.id])
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
  }, [credentialIssuer])

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
// Export a simplified service for any remaining AIR Kit specific functionality
export const getAirKitConfig = () => ({
  partnerId: import.meta.env.VITE_AIRKIT_PARTNER_ID,
  issuerDid: import.meta.env.VITE_AIRKIT_ISSUER_DID,
  apiUrl: import.meta.env.VITE_AIRKIT_API_URL || 'https://api.moca.network',
  widgetUrl: import.meta.env.VITE_AIRKIT_WIDGET_URL || 'https://widget.moca.network',
  environment: import.meta.env.VITE_AIRKIT_ENVIRONMENT || 'testnet'
})