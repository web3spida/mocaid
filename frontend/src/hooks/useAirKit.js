import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'

// AIR Kit SDK integration (mock implementation - replace with actual SDK)
class AirKitSDK {
  constructor(apiKey, endpoint) {
    this.apiKey = apiKey
    this.endpoint = endpoint
  }

  async generateDID(address) {
    // Mock implementation - replace with actual AIR Kit SDK calls
    try {
      const response = await fetch(`${this.endpoint}/did/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ address }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate DID')
      }
      
      const data = await response.json()
      return {
        did: `did:moca:${address.toLowerCase()}`,
        publicKey: data.publicKey || `0x${Math.random().toString(16).substr(2, 64)}`,
        privateKey: data.privateKey || `0x${Math.random().toString(16).substr(2, 64)}`,
      }
    } catch (error) {
      // Fallback to local generation for demo
      return {
        did: `did:moca:${address.toLowerCase()}`,
        publicKey: `0x${Math.random().toString(16).substr(2, 64)}`,
        privateKey: `0x${Math.random().toString(16).substr(2, 64)}`,
      }
    }
  }

  async createVerifiableCredential(issuer, subject, credentialData) {
    try {
      const response = await fetch(`${this.endpoint}/credentials/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          issuer,
          subject,
          credentialData,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create verifiable credential')
      }
      
      return await response.json()
    } catch (error) {
      // Fallback to mock credential for demo
      return {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential'],
        issuer,
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: subject,
          ...credentialData,
        },
        proof: {
          type: 'EcdsaSecp256k1Signature2019',
          created: new Date().toISOString(),
          proofPurpose: 'assertionMethod',
          verificationMethod: `${issuer}#keys-1`,
          jws: `eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.${btoa(JSON.stringify(credentialData))}.${Math.random().toString(36)}`,
        },
      }
    }
  }

  async verifyCredential(credential) {
    try {
      const response = await fetch(`${this.endpoint}/credentials/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ credential }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to verify credential')
      }
      
      const result = await response.json()
      return result.verified || false
    } catch (error) {
      // Fallback verification for demo
      return credential && credential.proof && credential.credentialSubject
    }
  }

  async createPresentation(credentials, holder) {
    try {
      const response = await fetch(`${this.endpoint}/presentations/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          credentials,
          holder,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create presentation')
      }
      
      return await response.json()
    } catch (error) {
      // Fallback to mock presentation for demo
      return {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation'],
        holder,
        verifiableCredential: credentials,
        proof: {
          type: 'EcdsaSecp256k1Signature2019',
          created: new Date().toISOString(),
          proofPurpose: 'authentication',
          verificationMethod: `${holder}#keys-1`,
          challenge: Math.random().toString(36),
          jws: `eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.${btoa(JSON.stringify({ holder, credentials }))}.${Math.random().toString(36)}`,
        },
      }
    }
  }
}

// Initialize AIR Kit SDK
const airKitSDK = new AirKitSDK(
  import.meta.env.VITE_AIRKIT_API_KEY || 'demo-key',
  import.meta.env.VITE_AIRKIT_ENDPOINT || 'https://api.mocaverse.xyz/airkit'
)

// Custom hook for DID management
export const useDID = () => {
  const { address } = useAccount()
  const [did, setDid] = useState(null)
  const [publicKey, setPublicKey] = useState(null)
  const [privateKey, setPrivateKey] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateDID = useCallback(async () => {
    if (!address) {
      setError('Wallet not connected')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await airKitSDK.generateDID(address)
      setDid(result.did)
      setPublicKey(result.publicKey)
      setPrivateKey(result.privateKey)
      
      // Store in localStorage for persistence
      localStorage.setItem(`did_${address}`, JSON.stringify(result))
      
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [address])

  // Load DID from localStorage on mount
  useEffect(() => {
    if (address) {
      const stored = localStorage.getItem(`did_${address}`)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setDid(parsed.did)
          setPublicKey(parsed.publicKey)
          setPrivateKey(parsed.privateKey)
        } catch (err) {
          console.error('Failed to parse stored DID:', err)
        }
      }
    }
  }, [address])

  const clearDID = useCallback(() => {
    setDid(null)
    setPublicKey(null)
    setPrivateKey(null)
    if (address) {
      localStorage.removeItem(`did_${address}`)
    }
  }, [address])

  return {
    did,
    publicKey,
    privateKey,
    generateDID,
    clearDID,
    isLoading,
    error,
  }
}

// Custom hook for Verifiable Credentials
export const useVerifiableCredentials = () => {
  const { address } = useAccount()
  const [credentials, setCredentials] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const createCredential = useCallback(async (issuerDID, credentialData) => {
    if (!address) {
      setError('Wallet not connected')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const subjectDID = `did:moca:${address.toLowerCase()}`
      const credential = await airKitSDK.createVerifiableCredential(
        issuerDID,
        subjectDID,
        credentialData
      )
      
      // Store credential locally
      const newCredentials = [...credentials, credential]
      setCredentials(newCredentials)
      localStorage.setItem(`credentials_${address}`, JSON.stringify(newCredentials))
      
      return credential
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [address, credentials])

  const verifyCredential = useCallback(async (credential) => {
    setIsLoading(true)
    setError(null)

    try {
      const isValid = await airKitSDK.verifyCredential(credential)
      return isValid
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeCredential = useCallback((credentialId) => {
    const newCredentials = credentials.filter(cred => cred.id !== credentialId)
    setCredentials(newCredentials)
    if (address) {
      localStorage.setItem(`credentials_${address}`, JSON.stringify(newCredentials))
    }
  }, [credentials, address])

  // Load credentials from localStorage on mount
  useEffect(() => {
    if (address) {
      const stored = localStorage.getItem(`credentials_${address}`)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setCredentials(parsed)
        } catch (err) {
          console.error('Failed to parse stored credentials:', err)
        }
      }
    }
  }, [address])

  return {
    credentials,
    createCredential,
    verifyCredential,
    removeCredential,
    isLoading,
    error,
  }
}

// Custom hook for Verifiable Presentations
export const useVerifiablePresentations = () => {
  const { address } = useAccount()
  const [presentations, setPresentations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const createPresentation = useCallback(async (credentials, challenge) => {
    if (!address) {
      setError('Wallet not connected')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const holderDID = `did:moca:${address.toLowerCase()}`
      const presentation = await airKitSDK.createPresentation(credentials, holderDID)
      
      // Add challenge if provided
      if (challenge && presentation.proof) {
        presentation.proof.challenge = challenge
      }
      
      // Store presentation locally
      const newPresentations = [...presentations, presentation]
      setPresentations(newPresentations)
      localStorage.setItem(`presentations_${address}`, JSON.stringify(newPresentations))
      
      return presentation
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [address, presentations])

  const removePresentation = useCallback((presentationId) => {
    const newPresentations = presentations.filter(pres => pres.id !== presentationId)
    setPresentations(newPresentations)
    if (address) {
      localStorage.setItem(`presentations_${address}`, JSON.stringify(newPresentations))
    }
  }, [presentations, address])

  // Load presentations from localStorage on mount
  useEffect(() => {
    if (address) {
      const stored = localStorage.getItem(`presentations_${address}`)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setPresentations(parsed)
        } catch (err) {
          console.error('Failed to parse stored presentations:', err)
        }
      }
    }
  }, [address])

  return {
    presentations,
    createPresentation,
    removePresentation,
    isLoading,
    error,
  }
}

// Export the SDK instance for direct use if needed
export { airKitSDK }