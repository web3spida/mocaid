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
    "inputs": [{"name": "user", "type": "address"}, {"name": "resource", "type": "string"}, {"name": "permission", "type": "string"}, {"name": "expirationTime", "type": "uint256"}],
    "name": "grantAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}, {"name": "resource", "type": "string"}],
    "name": "revokeAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}, {"name": "resource", "type": "string"}],
    "name": "checkAccess",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "resource", "type": "string"}, {"name": "reason", "type": "string"}],
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
      functionName: 'isRegistered',
      args: [userAddress],
      enabled: !!userAddress && !!IDENTITY_REGISTRY_ADDRESS,
    })
  }

  // Write hooks
  const useRegisterIdentity = () => {
    const { config } = usePrepareContractWrite({
      address: IDENTITY_REGISTRY_ADDRESS,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'registerIdentity',
    })

    const { data, write, isLoading, error } = useContractWrite(config)
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
    const { config } = usePrepareContractWrite({
      address: IDENTITY_REGISTRY_ADDRESS,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'updateIdentity',
    })

    const { data, write, isLoading, error } = useContractWrite(config)
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
    const { config } = usePrepareContractWrite({
      address: IDENTITY_REGISTRY_ADDRESS,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'revokeIdentity',
    })

    const { data, write, isLoading, error } = useContractWrite(config)
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

  const useGetUserCredentials = (userAddress) => {
    return useContractRead({
      address: CREDENTIAL_ISSUER_ADDRESS,
      abi: CREDENTIAL_ISSUER_ABI,
      functionName: 'getUserCredentials',
      args: [userAddress],
      enabled: !!userAddress && !!CREDENTIAL_ISSUER_ADDRESS,
    })
  }

  // Write hooks
  const useIssueCredential = () => {
    const { config } = usePrepareContractWrite({
      address: CREDENTIAL_ISSUER_ADDRESS,
      abi: CREDENTIAL_ISSUER_ABI,
      functionName: 'issueCredential',
    })

    const { data, write, isLoading, error } = useContractWrite(config)
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
    const { config } = usePrepareContractWrite({
      address: CREDENTIAL_ISSUER_ADDRESS,
      abi: CREDENTIAL_ISSUER_ABI,
      functionName: 'revokeCredential',
    })

    const { data, write, isLoading, error } = useContractWrite(config)
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
  const useCheckAccess = (userAddress, resource) => {
    return useContractRead({
      address: ACCESS_CONTROL_ADDRESS,
      abi: ACCESS_CONTROL_ABI,
      functionName: 'checkAccess',
      args: [userAddress, resource],
      enabled: !!userAddress && !!resource && !!ACCESS_CONTROL_ADDRESS,
    })
  }

  // Write hooks
  const useGrantAccess = () => {
    const { config } = usePrepareContractWrite({
      address: ACCESS_CONTROL_ADDRESS,
      abi: ACCESS_CONTROL_ABI,
      functionName: 'grantAccess',
    })

    const { data, write, isLoading, error } = useContractWrite(config)
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
    const { config } = usePrepareContractWrite({
      address: ACCESS_CONTROL_ADDRESS,
      abi: ACCESS_CONTROL_ABI,
      functionName: 'revokeAccess',
    })

    const { data, write, isLoading, error } = useContractWrite(config)
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
    const { config } = usePrepareContractWrite({
      address: ACCESS_CONTROL_ADDRESS,
      abi: ACCESS_CONTROL_ABI,
      functionName: 'requestAccess',
    })

    const { data, write, isLoading, error } = useContractWrite(config)
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