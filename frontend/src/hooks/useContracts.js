import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther, formatEther } from 'viem'

// Contract addresses from environment variables
const IDENTITY_REGISTRY_ADDRESS = import.meta.env.VITE_IDENTITY_REGISTRY_ADDRESS
const CREDENTIAL_ISSUER_ADDRESS = import.meta.env.VITE_CREDENTIAL_ISSUER_ADDRESS
const ACCESS_CONTROL_ADDRESS = import.meta.env.VITE_ACCESS_CONTROL_ADDRESS

// Contract ABIs (simplified for demo - in production, import from artifacts)
const IDENTITY_REGISTRY_ABI = [
  {
    "inputs": [{"name": "did", "type": "string"}, {"name": "publicKey", "type": "string"}, {"name": "metadata", "type": "string"}],
    "name": "registerIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getIdentity",
    "outputs": [{"name": "", "type": "tuple", "components": [{"name": "did", "type": "string"}, {"name": "publicKey", "type": "string"}, {"name": "metadata", "type": "string"}, {"name": "isActive", "type": "bool"}, {"name": "timestamp", "type": "uint256"}]}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "metadata", "type": "string"}],
    "name": "updateIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "revokeIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "isRegistered",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
]

const CREDENTIAL_ISSUER_ABI = [
  {
    "inputs": [{"name": "recipient", "type": "address"}, {"name": "credentialType", "type": "string"}, {"name": "data", "type": "string"}, {"name": "expirationTime", "type": "uint256"}],
    "name": "issueCredential",
    "outputs": [{"name": "", "type": "bytes32"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "credentialId", "type": "bytes32"}],
    "name": "verifyCredential",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "credentialId", "type": "bytes32"}],
    "name": "revokeCredential",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserCredentials",
    "outputs": [{"name": "", "type": "bytes32[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "credentialId", "type": "bytes32"}],
    "name": "getCredential",
    "outputs": [{"name": "", "type": "tuple", "components": [{"name": "issuer", "type": "address"}, {"name": "recipient", "type": "address"}, {"name": "credentialType", "type": "string"}, {"name": "data", "type": "string"}, {"name": "issuanceTime", "type": "uint256"}, {"name": "expirationTime", "type": "uint256"}, {"name": "isRevoked", "type": "bool"}]}],
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