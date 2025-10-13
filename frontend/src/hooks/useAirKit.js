import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
// import { AirKitSDK } from '@moca/airkit-sdk' // Uncomment when SDK is available

// Enhanced Mock AIR Kit SDK for comprehensive demonstration
const mockAirKitSDK = {
  // DID operations
  generateDID: async (options = {}) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substr(2, 9)
    
    return {
      did: `did:moca:${randomId}`,
      document: {
        '@context': ['https://www.w3.org/ns/did/v1', 'https://w3id.org/security/suites/secp256k1-2019/v1'],
        id: `did:moca:${randomId}`,
        verificationMethod: [{
          id: `did:moca:${randomId}#keys-1`,
          type: 'EcdsaSecp256k1VerificationKey2019',
          controller: `did:moca:${randomId}`,
          publicKeyHex: `0x${Math.random().toString(16).substr(2, 64)}`
        }],
        authentication: [`did:moca:${randomId}#keys-1`],
        assertionMethod: [`did:moca:${randomId}#keys-1`],
        keyAgreement: [`did:moca:${randomId}#keys-1`],
        service: [{
          id: `did:moca:${randomId}#identity-hub`,
          type: 'IdentityHub',
          serviceEndpoint: 'https://hub.moca.network'
        }]
      },
      keys: {
        publicKey: `0x${Math.random().toString(16).substr(2, 64)}`,
        privateKey: `0x${Math.random().toString(16).substr(2, 64)}`
      },
      metadata: {
        created: new Date(timestamp).toISOString(),
        updated: new Date(timestamp).toISOString(),
        deactivated: false,
        ...options
      }
    }
  },
  
  resolveDID: async (did) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const randomId = did.split(':')[2] || Math.random().toString(36).substr(2, 9)
    
    return {
      didDocument: {
        '@context': ['https://www.w3.org/ns/did/v1'],
        id: did,
        verificationMethod: [{
          id: `${did}#keys-1`,
          type: 'EcdsaSecp256k1VerificationKey2019',
          controller: did,
          publicKeyHex: `0x${Math.random().toString(16).substr(2, 64)}`
        }],
        authentication: [`${did}#keys-1`],
        assertionMethod: [`${did}#keys-1`]
      },
      didDocumentMetadata: {
        created: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        updated: new Date().toISOString(),
        deactivated: false
      },
      didResolutionMetadata: {
        contentType: 'application/did+ld+json'
      }
    }
  },

  updateDID: async (did, updates) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    return {
      did,
      updated: true,
      transaction: `0x${Math.random().toString(16).substr(2, 64)}`,
      timestamp: new Date().toISOString()
    }
  },

  deactivateDID: async (did) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      did,
      deactivated: true,
      transaction: `0x${Math.random().toString(16).substr(2, 64)}`,
      timestamp: new Date().toISOString()
    }
  },

  // Enhanced Credential operations
  createCredential: async (credentialData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const credentialId = `vc:${Math.random().toString(36).substr(2, 9)}`
    
    return {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/security/suites/secp256k1-2019/v1'
      ],
      id: credentialId,
      type: ['VerifiableCredential', ...(credentialData.types || [])],
      issuer: {
        id: credentialData.issuer,
        name: credentialData.issuerName || 'MocaID Issuer'
      },
      issuanceDate: new Date().toISOString(),
      expirationDate: credentialData.expirationDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      credentialSubject: {
        id: credentialData.subject.id,
        ...credentialData.subject
      },
      credentialStatus: {
        id: `https://api.moca.network/credentials/${credentialId}/status`,
        type: 'RevocationList2020Status',
        revocationListIndex: Math.floor(Math.random() * 1000),
        revocationListCredential: 'https://api.moca.network/revocation-list'
      },
      proof: {
        type: 'EcdsaSecp256k1Signature2019',
        created: new Date().toISOString(),
        proofPurpose: 'assertionMethod',
        verificationMethod: `${credentialData.issuer}#keys-1`,
        jws: `eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.${Math.random().toString(36).substr(2, 40)}.${Math.random().toString(36).substr(2, 40)}`
      }
    }
  },

  verifyCredential: async (credential) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const isValid = Math.random() > 0.1 // 90% success rate for demo
    
    return {
      verified: isValid,
      results: [{
        proof: credential.proof,
        verified: isValid,
        purposeResult: {
          valid: isValid,
          controller: credential.issuer
        }
      }],
      statusResult: {
        verified: isValid,
        revoked: false
      },
      credentialId: credential.id,
      checks: [
        'proof',
        'status',
        'expiration'
      ]
    }
  },

  revokeCredential: async (credentialId, reason) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      credentialId,
      revoked: true,
      reason: reason || 'No reason provided',
      revokedAt: new Date().toISOString(),
      transaction: `0x${Math.random().toString(16).substr(2, 64)}`
    }
  },

  // Enhanced Presentation operations
  createPresentation: async (credentials, options = {}) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const presentationId = `vp:${Math.random().toString(36).substr(2, 9)}`
    
    return {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/security/suites/secp256k1-2019/v1'
      ],
      id: presentationId,
      type: ['VerifiablePresentation'],
      verifiableCredential: Array.isArray(credentials) ? credentials : [credentials],
      holder: options.holder,
      proof: {
        type: 'EcdsaSecp256k1Signature2019',
        created: new Date().toISOString(),
        proofPurpose: 'authentication',
        verificationMethod: `${options.holder}#keys-1`,
        challenge: options.challenge || `challenge-${Math.random().toString(36).substr(2, 16)}`,
        domain: options.domain || 'mocaid.network',
        jws: `eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.${Math.random().toString(36).substr(2, 40)}.${Math.random().toString(36).substr(2, 40)}`
      }
    }
  },

  verifyPresentation: async (presentation, options = {}) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const isValid = Math.random() > 0.1 // 90% success rate for demo
    
    return {
      verified: isValid,
      results: [{
        proof: presentation.proof,
        verified: isValid,
        purposeResult: {
          valid: isValid,
          controller: presentation.holder
        }
      }],
      credentialResults: presentation.verifiableCredential.map(cred => ({
        credentialId: cred.id,
        verified: isValid,
        checks: ['proof', 'status', 'expiration']
      })),
      presentationId: presentation.id,
      challenge: options.challenge,
      domain: options.domain
    }
  },

  // Schema operations
  createSchema: async (schemaData) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    return {
      id: `schema:${Math.random().toString(36).substr(2, 9)}`,
      type: 'JsonSchema2020',
      name: schemaData.name,
      description: schemaData.description,
      schema: schemaData.schema,
      created: new Date().toISOString(),
      author: schemaData.author
    }
  },

  // Template operations
  createTemplate: async (templateData) => {
    await new Promise(resolve => setTimeout(resolve, 600))
    return {
      id: `template:${Math.random().toString(36).substr(2, 9)}`,
      name: templateData.name,
      description: templateData.description,
      credentialType: templateData.credentialType,
      schema: templateData.schema,
      created: new Date().toISOString(),
      author: templateData.author
    }
  }
}

// Initialize AIR Kit SDK (use mock for demo, replace with actual SDK when available)
const airKitSDK = mockAirKitSDK
// const airKitSDK = new AirKitSDK({
//   apiKey: import.meta.env.VITE_AIRKIT_API_KEY,
//   endpoint: import.meta.env.VITE_AIRKIT_ENDPOINT,
//   network: 'moca-testnet'
// })

// Custom hook for DID management
export const useDID = () => {
  const { address } = useAccount()
  const [did, setDid] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load DID from localStorage on mount
  useEffect(() => {
    if (address) {
      const storedDid = localStorage.getItem(`did-${address}`)
      if (storedDid) {
        try {
          setDid(JSON.parse(storedDid))
        } catch (err) {
          console.error('Failed to parse stored DID:', err)
        }
      }
    }
  }, [address])

  // Generate new DID
  const generateDID = useCallback(async (options = {}) => {
    if (!address) {
      throw new Error('Wallet not connected')
    }

    setIsLoading(true)
    setError(null)

    try {
      const didData = await airKitSDK.generateDID({
        address,
        ...options
      })
      
      setDid(didData)
      localStorage.setItem(`did-${address}`, JSON.stringify(didData))
      
      return didData
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [address])

  // Resolve DID
  const resolveDID = useCallback(async (didToResolve) => {
    setIsLoading(true)
    setError(null)

    try {
      const resolution = await airKitSDK.resolveDID(didToResolve)
      return resolution
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update DID
  const updateDID = useCallback(async (updates) => {
    if (!did) {
      throw new Error('No DID to update')
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await airKitSDK.updateDID(did.did, updates)
      
      // Update local DID data
      const updatedDid = { ...did, ...updates, updated: result.timestamp }
      setDid(updatedDid)
      localStorage.setItem(`did-${address}`, JSON.stringify(updatedDid))
      
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [did, address])

  // Deactivate DID
  const deactivateDID = useCallback(async () => {
    if (!did) {
      throw new Error('No DID to deactivate')
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await airKitSDK.deactivateDID(did.did)
      
      // Update local DID data
      const deactivatedDid = { ...did, deactivated: true }
      setDid(deactivatedDid)
      localStorage.setItem(`did-${address}`, JSON.stringify(deactivatedDid))
      
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [did, address])

  return {
    did,
    isLoading,
    error,
    generateDID,
    resolveDID,
    updateDID,
    deactivateDID,
    hasDID: !!did
  }
}

// Custom hook for Verifiable Credentials
export const useVerifiableCredentials = () => {
  const { address } = useAccount()
  const [credentials, setCredentials] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load credentials from localStorage on mount
  useEffect(() => {
    if (address) {
      const storedCredentials = localStorage.getItem(`credentials-${address}`)
      if (storedCredentials) {
        try {
          setCredentials(JSON.parse(storedCredentials))
        } catch (err) {
          console.error('Failed to parse stored credentials:', err)
        }
      }
    }
  }, [address])

  // Save credentials to localStorage
  const saveCredentials = useCallback((newCredentials) => {
    setCredentials(newCredentials)
    if (address) {
      localStorage.setItem(`credentials-${address}`, JSON.stringify(newCredentials))
    }
  }, [address])

  // Create credential
  const createCredential = useCallback(async (credentialData) => {
    setIsLoading(true)
    setError(null)

    try {
      const credential = await airKitSDK.createCredential(credentialData)
      
      const newCredentials = [...credentials, credential]
      saveCredentials(newCredentials)
      
      return credential
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [credentials, saveCredentials])

  // Verify credential
  const verifyCredential = useCallback(async (credential) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await airKitSDK.verifyCredential(credential)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Revoke credential
  const revokeCredential = useCallback(async (credentialId, reason) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await airKitSDK.revokeCredential(credentialId, reason)
      
      // Update local credentials
      const updatedCredentials = credentials.map(cred => 
        cred.id === credentialId 
          ? { ...cred, revoked: true, revokedAt: result.revokedAt, revocationReason: reason }
          : cred
      )
      saveCredentials(updatedCredentials)
      
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [credentials, saveCredentials])

  // Delete credential (local only)
  const deleteCredential = useCallback((credentialId) => {
    const updatedCredentials = credentials.filter(cred => cred.id !== credentialId)
    saveCredentials(updatedCredentials)
  }, [credentials, saveCredentials])

  // Get credential by ID
  const getCredential = useCallback((credentialId) => {
    return credentials.find(cred => cred.id === credentialId)
  }, [credentials])

  // Filter credentials
  const filterCredentials = useCallback((filterFn) => {
    return credentials.filter(filterFn)
  }, [credentials])

  return {
    credentials,
    isLoading,
    error,
    createCredential,
    verifyCredential,
    revokeCredential,
    deleteCredential,
    getCredential,
    filterCredentials,
    credentialCount: credentials.length
  }
}

// Custom hook for Verifiable Presentations
export const useVerifiablePresentations = () => {
  const { address } = useAccount()
  const [presentations, setPresentations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load presentations from localStorage on mount
  useEffect(() => {
    if (address) {
      const storedPresentations = localStorage.getItem(`presentations-${address}`)
      if (storedPresentations) {
        try {
          setPresentations(JSON.parse(storedPresentations))
        } catch (err) {
          console.error('Failed to parse stored presentations:', err)
        }
      }
    }
  }, [address])

  // Save presentations to localStorage
  const savePresentations = useCallback((newPresentations) => {
    setPresentations(newPresentations)
    if (address) {
      localStorage.setItem(`presentations-${address}`, JSON.stringify(newPresentations))
    }
  }, [address])

  // Create presentation
  const createPresentation = useCallback(async (credentials, options = {}) => {
    setIsLoading(true)
    setError(null)

    try {
      const presentation = await airKitSDK.createPresentation(credentials, options)
      
      const newPresentations = [...presentations, presentation]
      savePresentations(newPresentations)
      
      return presentation
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [presentations, savePresentations])

  // Verify presentation
  const verifyPresentation = useCallback(async (presentation, options = {}) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await airKitSDK.verifyPresentation(presentation, options)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Delete presentation (local only)
  const deletePresentation = useCallback((presentationId) => {
    const updatedPresentations = presentations.filter(pres => pres.id !== presentationId)
    savePresentations(updatedPresentations)
  }, [presentations, savePresentations])

  // Get presentation by ID
  const getPresentation = useCallback((presentationId) => {
    return presentations.find(pres => pres.id === presentationId)
  }, [presentations])

  return {
    presentations,
    isLoading,
    error,
    createPresentation,
    verifyPresentation,
    deletePresentation,
    getPresentation,
    presentationCount: presentations.length
  }
}

// Custom hook for Schema management
export const useSchemas = () => {
  const { address } = useAccount()
  const [schemas, setSchemas] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load schemas from localStorage on mount
  useEffect(() => {
    if (address) {
      const storedSchemas = localStorage.getItem(`schemas-${address}`)
      if (storedSchemas) {
        try {
          setSchemas(JSON.parse(storedSchemas))
        } catch (err) {
          console.error('Failed to parse stored schemas:', err)
        }
      }
    }
  }, [address])

  // Save schemas to localStorage
  const saveSchemas = useCallback((newSchemas) => {
    setSchemas(newSchemas)
    if (address) {
      localStorage.setItem(`schemas-${address}`, JSON.stringify(newSchemas))
    }
  }, [address])

  // Create schema
  const createSchema = useCallback(async (schemaData) => {
    setIsLoading(true)
    setError(null)

    try {
      const schema = await airKitSDK.createSchema(schemaData)
      
      const newSchemas = [...schemas, schema]
      saveSchemas(newSchemas)
      
      return schema
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [schemas, saveSchemas])

  return {
    schemas,
    isLoading,
    error,
    createSchema,
    schemaCount: schemas.length
  }
}

// Custom hook for Template management
export const useTemplates = () => {
  const { address } = useAccount()
  const [templates, setTemplates] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load templates from localStorage on mount
  useEffect(() => {
    if (address) {
      const storedTemplates = localStorage.getItem(`templates-${address}`)
      if (storedTemplates) {
        try {
          setTemplates(JSON.parse(storedTemplates))
        } catch (err) {
          console.error('Failed to parse stored templates:', err)
        }
      }
    }
  }, [address])

  // Save templates to localStorage
  const saveTemplates = useCallback((newTemplates) => {
    setTemplates(newTemplates)
    if (address) {
      localStorage.setItem(`templates-${address}`, JSON.stringify(newTemplates))
    }
  }, [address])

  // Create template
  const createTemplate = useCallback(async (templateData) => {
    setIsLoading(true)
    setError(null)

    try {
      const template = await airKitSDK.createTemplate(templateData)
      
      const newTemplates = [...templates, template]
      saveTemplates(newTemplates)
      
      return template
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [templates, saveTemplates])

  return {
    templates,
    isLoading,
    error,
    createTemplate,
    templateCount: templates.length
  }
}

// Export the SDK instance for direct use if needed
export { airKitSDK }