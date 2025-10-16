import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther, formatEther } from 'viem'

// Contract addresses from environment variables
const IDENTITY_REGISTRY_ADDRESS = import.meta.env.VITE_IDENTITY_REGISTRY_ADDRESS
const CREDENTIAL_ISSUER_ADDRESS = import.meta.env.VITE_CREDENTIAL_ISSUER_ADDRESS
const ACCESS_CONTROL_ADDRESS = import.meta.env.VITE_ACCESS_CONTROL_ADDRESS

// Chain configuration
const CHAIN_ID = parseInt(import.meta.env.VITE_MOCA_CHAIN_ID || '7001')
const RPC_URL = import.meta.env.VITE_MOCA_RPC_URL || 'https://devnet-rpc.mocachain.org'

// Contract ABIs - Updated to match actual smart contracts
const IDENTITY_REGISTRY_ABI = [
  {
    "inputs": [{"name": "user", "type": "address"}, {"name": "didURI", "type": "string"}],
    "name": "registerIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}, {"name": "newDIDURI", "type": "string"}],
    "name": "updateIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "revokeIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getIdentity",
    "outputs": [{"name": "didURI", "type": "string"}, {"name": "createdAt", "type": "uint256"}, {"name": "updatedAt", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "didURI", "type": "string"}],
    "name": "getAddressFromDID",
    "outputs": [{"name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "hasIdentity",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "offset", "type": "uint256"}, {"name": "limit", "type": "uint256"}],
    "name": "getRegisteredUsers",
    "outputs": [{"name": "users", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalIdentities",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
]

const CREDENTIAL_ISSUER_ABI = [
  {
    "inputs": [{"name": "to", "type": "address"}, {"name": "credentialHash", "type": "string"}, {"name": "credentialType", "type": "string"}, {"name": "expiresAt", "type": "uint256"}],
    "name": "issueCredential",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "credentialHash", "type": "string"}],
    "name": "verifyCredential",
    "outputs": [{"name": "isValid", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "credentialHash", "type": "string"}],
    "name": "revokeCredential",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "credentialHash", "type": "string"}],
    "name": "getCredential",
    "outputs": [
      {"name": "issuer", "type": "address"}, 
      {"name": "holder", "type": "address"}, 
      {"name": "credentialType", "type": "string"}, 
      {"name": "issuedAt", "type": "uint256"}, 
      {"name": "expiresAt", "type": "uint256"}, 
      {"name": "isRevoked", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "holder", "type": "address"}],
    "name": "getHolderCredentials",
    "outputs": [{"name": "credentialHashes", "type": "string[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "issuer", "type": "address"}],
    "name": "getIssuerCredentials",
    "outputs": [{"name": "credentialHashes", "type": "string[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "credentialHash", "type": "string"}],
    "name": "credentialExists",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "issuer", "type": "address"}],
    "name": "authorizeIssuer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "issuer", "type": "address"}],
    "name": "authorizedIssuers",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalCredentials",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
]

const ACCESS_CONTROL_ABI = [
  {
    // grantAccess(address grantee, string resourceId, string permissionType, uint256 expiresAt)
    "inputs": [
      { "name": "grantee", "type": "address" },
      { "name": "resourceId", "type": "string" },
      { "name": "permissionType", "type": "string" },
      { "name": "expiresAt", "type": "uint256" }
    ],
    "name": "grantAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    // revokeAccess(address grantee, string resourceId)
    "inputs": [
      { "name": "grantee", "type": "address" },
      { "name": "resourceId", "type": "string" }
    ],
    "name": "revokeAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    // checkAccess(address grantor, address grantee, string resourceId)
    "inputs": [
      { "name": "grantor", "type": "address" },
      { "name": "grantee", "type": "address" },
      { "name": "resourceId", "type": "string" }
    ],
    "name": "checkAccess",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    // requestAccess(address resourceOwner, string resourceId, string permissionType, string reason, uint256 expiresAt)
    "inputs": [
      { "name": "resourceOwner", "type": "address" },
      { "name": "resourceId", "type": "string" },
      { "name": "permissionType", "type": "string" },
      { "name": "reason", "type": "string" },
      { "name": "expiresAt", "type": "uint256" }
    ],
    "name": "requestAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

// Identity Registry Hooks
export const useIdentityRegistry = () => {
  // Read hooks
  const useGetIdentity = (userAddress) => {
    return useContractRead({
      address: IDENTITY_REGISTRY_ADDRESS,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'getIdentity',
      args: [userAddress],
      enabled: !!userAddress && !!IDENTITY_REGISTRY_ADDRESS,
    })
  }

  const useIsRegistered = (userAddress) => {
    return useContractRead({
      address: IDENTITY_REGISTRY_ADDRESS,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'hasIdentity',
      args: [userAddress],
      enabled: !!userAddress && !!IDENTITY_REGISTRY_ADDRESS,
    })
  }

  // Additional read hook: get address from DID
  const useGetAddressFromDID = (didURI) => {
    return useContractRead({
      address: IDENTITY_REGISTRY_ADDRESS,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'getAddressFromDID',
      args: [didURI],
      enabled: !!didURI && !!IDENTITY_REGISTRY_ADDRESS,
    })
  }

  // Write hooks
  const useRegisterIdentity = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: IDENTITY_REGISTRY_ADDRESS,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'registerIdentity',
      chainId: parseInt(import.meta.env.VITE_MOCA_CHAIN_ID || '5151'),
      mode: 'recklesslyUnprepared',
    })
    const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      registerIdentity: write,
      data,
      isLoading: isLoading || isWaiting,
      isSuccess,
      error,
    }
  }

  const useUpdateIdentity = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: IDENTITY_REGISTRY_ADDRESS,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'updateIdentity',
      chainId: parseInt(import.meta.env.VITE_MOCA_CHAIN_ID || '5151'),
      mode: 'recklesslyUnprepared',
    })
    const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      updateIdentity: write,
      data,
      isLoading: isLoading || isWaiting,
      isSuccess,
      error,
    }
  }

  const useRevokeIdentity = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: IDENTITY_REGISTRY_ADDRESS,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'revokeIdentity',
      chainId: parseInt(import.meta.env.VITE_MOCA_CHAIN_ID || '5151'),
      mode: 'recklesslyUnprepared',
    })
    const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      revokeIdentity: write,
      data,
      isLoading: isLoading || isWaiting,
      isSuccess,
      error,
    }
  }

  return {
    useGetIdentity,
    useIsRegistered,
    useGetAddressFromDID,
    useRegisterIdentity,
    useUpdateIdentity,
    useRevokeIdentity,
  }
}

// Credential Issuer Hooks
export const useCredentialIssuer = () => {
  // Read hooks
  const useGetCredential = (credentialId) => {
    return useContractRead({
      address: CREDENTIAL_ISSUER_ADDRESS,
      abi: CREDENTIAL_ISSUER_ABI,
      functionName: 'getCredential',
      args: [credentialId],
      enabled: !!credentialId && !!CREDENTIAL_ISSUER_ADDRESS,
    })
  }

  const useVerifyCredential = (credentialId) => {
    return useContractRead({
      address: CREDENTIAL_ISSUER_ADDRESS,
      abi: CREDENTIAL_ISSUER_ABI,
      functionName: 'verifyCredential',
      args: [credentialId],
      enabled: !!credentialId && !!CREDENTIAL_ISSUER_ADDRESS,
    })
  }

  // Holder credentials (keep exported name for existing usage)
  const useGetUserCredentials = (userAddress) => {
    return useContractRead({
      address: CREDENTIAL_ISSUER_ADDRESS,
      abi: CREDENTIAL_ISSUER_ABI,
      functionName: 'getHolderCredentials',
      args: [userAddress],
      enabled: !!userAddress && !!CREDENTIAL_ISSUER_ADDRESS,
    })
  }

  // Write hooks
  const useIssueCredential = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: CREDENTIAL_ISSUER_ADDRESS,
      abi: CREDENTIAL_ISSUER_ABI,
      functionName: 'issueCredential',
      mode: 'recklesslyUnprepared',
    })
    const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      issueCredential: write,
      data,
      isLoading: isLoading || isWaiting,
      isSuccess,
      error,
    }
  }

  const useRevokeCredential = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: CREDENTIAL_ISSUER_ADDRESS,
      abi: CREDENTIAL_ISSUER_ABI,
      functionName: 'revokeCredential',
      mode: 'recklesslyUnprepared',
    })
    const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      revokeCredential: write,
      data,
      isLoading: isLoading || isWaiting,
      isSuccess,
      error,
    }
  }

  return {
    useGetCredential,
    useVerifyCredential,
    useGetUserCredentials,
    useIssueCredential,
    useRevokeCredential,
  }
}

// Access Control Hooks
export const useAccessControl = () => {
  // Read hooks
  const useCheckAccess = (grantorAddress, granteeAddress, resource) => {
    return useContractRead({
      address: ACCESS_CONTROL_ADDRESS,
      abi: ACCESS_CONTROL_ABI,
      functionName: 'checkAccess',
      args: [grantorAddress, granteeAddress, resource],
      enabled: !!grantorAddress && !!granteeAddress && !!resource && !!ACCESS_CONTROL_ADDRESS,
    })
  }

  // Write hooks
  const useGrantAccess = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: ACCESS_CONTROL_ADDRESS,
      abi: ACCESS_CONTROL_ABI,
      functionName: 'grantAccess',
      mode: 'recklesslyUnprepared',
    })
    const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      grantAccess: write,
      data,
      isLoading: isLoading || isWaiting,
      isSuccess,
      error,
    }
  }

  const useRevokeAccess = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: ACCESS_CONTROL_ADDRESS,
      abi: ACCESS_CONTROL_ABI,
      functionName: 'revokeAccess',
      mode: 'recklesslyUnprepared',
    })
    const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      revokeAccess: write,
      data,
      isLoading: isLoading || isWaiting,
      isSuccess,
      error,
    }
  }

  const useRequestAccess = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: ACCESS_CONTROL_ADDRESS,
      abi: ACCESS_CONTROL_ABI,
      functionName: 'requestAccess',
      mode: 'recklesslyUnprepared',
    })
    const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      requestAccess: write,
      data,
      isLoading: isLoading || isWaiting,
      isSuccess,
      error,
    }
  }

  return {
    useCheckAccess,
    useGrantAccess,
    useRevokeAccess,
    useRequestAccess,
  }
}

// Combined hook that provides access to all contract hooks
export const useContracts = () => {
  return {
    identityRegistry: useIdentityRegistry(),
    credentialIssuer: useCredentialIssuer(),
    accessControl: useAccessControl(),
  }
}