import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther, formatEther } from 'viem'

// Contract addresses from environment variables - Updated for Credora Protocol
const IDENTITY_REGISTRY_ADDRESS = import.meta.env.VITE_IDENTITY_REGISTRY_ADDRESS
const CREDENTIAL_REGISTRY_ADDRESS = import.meta.env.VITE_CREDENTIAL_REGISTRY_ADDRESS
const REWARD_MANAGER_ADDRESS = import.meta.env.VITE_REWARD_MANAGER_ADDRESS
const VERIFIER_REGISTRY_ADDRESS = import.meta.env.VITE_VERIFIER_REGISTRY_ADDRESS
const ANALYTICS_MODULE_ADDRESS = import.meta.env.VITE_ANALYTICS_MODULE_ADDRESS
const CREDENTIAL_ISSUER_ADDRESS = import.meta.env.VITE_CREDENTIAL_ISSUER_ADDRESS
const ACCESS_CONTROL_ADDRESS = import.meta.env.VITE_ACCESS_CONTROL_ADDRESS

// Chain configuration
const CHAIN_ID = parseInt(import.meta.env.VITE_MOCA_CHAIN_ID || '5151')
const RPC_URL = import.meta.env.VITE_MOCA_RPC_URL || 'https://devnet-rpc.mocachain.org'

// Contract ABIs - Updated for Credora Protocol
const IDENTITY_REGISTRY_ABI = [
  {
    "inputs": [
      {"name": "user", "type": "address"},
      {"name": "didURI", "type": "string"}
    ],
    "name": "registerIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "user", "type": "address"},
      {"name": "newDIDURI", "type": "string"}
    ],
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
    "outputs": [
      {"name": "didURI", "type": "string"},
      {"name": "createdAt", "type": "uint256"},
      {"name": "updatedAt", "type": "uint256"}
    ],
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
    "inputs": [{"name": "didURI", "type": "string"}],
    "name": "getAddressFromDID",
    "outputs": [{"name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalIdentities",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "offset", "type": "uint256"},
      {"name": "limit", "type": "uint256"}
    ],
    "name": "getRegisteredUsers",
    "outputs": [{"name": "users", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  }
]

const CREDENTIAL_REGISTRY_ABI = [
  {
    "inputs": [
      {"name": "holder", "type": "address"},
      {"name": "credentialHash", "type": "string"},
      {"name": "credentialType", "type": "string"},
      {"name": "expiresAt", "type": "uint256"}
    ],
    "name": "registerCredential",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "credentialHash", "type": "string"}],
    "name": "verifyCredential",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
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
      {"name": "credentialHash", "type": "string"},
      {"name": "credentialType", "type": "string"},
      {"name": "issuedAt", "type": "uint256"},
      {"name": "expiresAt", "type": "uint256"},
      {"name": "isRevoked", "type": "bool"},
      {"name": "isVerified", "type": "bool"},
      {"name": "verifier", "type": "address"},
      {"name": "verifiedAt", "type": "uint256"},
      {"name": "rewardAmount", "type": "uint256"},
      {"name": "exists", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserCredentials",
    "outputs": [{"name": "", "type": "string[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserProfile",
    "outputs": [
      {"name": "totalCredentials", "type": "uint256"},
      {"name": "totalRewards", "type": "uint256"},
      {"name": "reputationPoints", "type": "uint256"},
      {"name": "lastActivity", "type": "uint256"},
      {"name": "isActive", "type": "bool"}
    ],
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
    "inputs": [],
    "name": "totalCredentials",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
]

const REWARD_MANAGER_ABI = [
  {
    "inputs": [
      {"name": "user", "type": "address"},
      {"name": "credentialType", "type": "string"}
    ],
    "name": "distributeCredentialReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "verifier", "type": "address"},
      {"name": "credentialHash", "type": "string"}
    ],
    "name": "payVerifierFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserRewards",
    "outputs": [
      {"name": "totalRewards", "type": "uint256"},
      {"name": "reputationPoints", "type": "uint256"},
      {"name": "credentialCount", "type": "uint256"},
      {"name": "lastRewardTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "verifier", "type": "address"}],
    "name": "getVerifierFees",
    "outputs": [
      {"name": "totalFees", "type": "uint256"},
      {"name": "verificationCount", "type": "uint256"},
      {"name": "lastFeeTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "credentialType", "type": "string"},
      {"name": "rewardAmount", "type": "uint256"}
    ],
    "name": "setCredentialReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const VERIFIER_REGISTRY_ABI = [
  {
    "inputs": [{"name": "stakeAmount", "type": "uint256"}],
    "name": "registerVerifier",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unregisterVerifier",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "verifier", "type": "address"}],
    "name": "isActiveVerifier",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "verifier", "type": "address"}],
    "name": "getVerifier",
    "outputs": [
      {"name": "stakedAmount", "type": "uint256"},
      {"name": "reputationScore", "type": "uint256"},
      {"name": "verificationCount", "type": "uint256"},
      {"name": "successfulVerifications", "type": "uint256"},
      {"name": "slashedAmount", "type": "uint256"},
      {"name": "registeredAt", "type": "uint256"},
      {"name": "isActive", "type": "bool"},
      {"name": "exists", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "verifier", "type": "address"}],
    "name": "getVerifierReputation",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveVerifiers",
    "outputs": [{"name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  }
]

const ANALYTICS_MODULE_ABI = [
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserStats",
    "outputs": [
      {"name": "totalCredentials", "type": "uint256"},
      {"name": "totalRewards", "type": "uint256"},
      {"name": "reputationPoints", "type": "uint256"},
      {"name": "rank", "type": "uint256"},
      {"name": "lastActivity", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "verifier", "type": "address"}],
    "name": "getVerifierStats",
    "outputs": [
      {"name": "totalVerifications", "type": "uint256"},
      {"name": "totalFees", "type": "uint256"},
      {"name": "reputationScore", "type": "uint256"},
      {"name": "rank", "type": "uint256"},
      {"name": "lastActivity", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGlobalStats",
    "outputs": [
      {"name": "totalUsers", "type": "uint256"},
      {"name": "totalVerifiers", "type": "uint256"},
      {"name": "totalCredentials", "type": "uint256"},
      {"name": "totalRewardsDistributed", "type": "uint256"},
      {"name": "totalFeesCollected", "type": "uint256"},
      {"name": "lastUpdated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUserLeaderboard",
    "outputs": [{"name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getVerifierLeaderboard",
    "outputs": [{"name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  }
]

const CREDENTIAL_ISSUER_ABI = [
  {
    "inputs": [
      {"name": "to", "type": "address"},
      {"name": "credentialHash", "type": "string"},
      {"name": "credentialType", "type": "string"},
      {"name": "expiresAt", "type": "uint256"}
    ],
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
    "name": "authorizeIssuer",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "inputs": [
      {"name": "grantee", "type": "address"},
      {"name": "resourceId", "type": "string"},
      {"name": "permissionType", "type": "string"},
      {"name": "expiresAt", "type": "uint256"}
    ],
    "name": "grantAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "grantee", "type": "address"},
      {"name": "resourceId", "type": "string"}
    ],
    "name": "revokeAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "grantor", "type": "address"},
      {"name": "grantee", "type": "address"},
      {"name": "resourceId", "type": "string"}
    ],
    "name": "checkAccess",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "resourceOwner", "type": "address"},
      {"name": "resourceId", "type": "string"},
      {"name": "permissionType", "type": "string"},
      {"name": "reason", "type": "string"},
      {"name": "expiresAt", "type": "uint256"}
    ],
    "name": "requestAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

// Credential Registry Hooks
export const useCredentialRegistry = () => {
  // Read hooks
  const useGetCredential = (credentialHash) => {
    return useContractRead({
      address: CREDENTIAL_REGISTRY_ADDRESS,
      abi: CREDENTIAL_REGISTRY_ABI,
      functionName: 'getCredential',
      args: [credentialHash],
      enabled: !!credentialHash && !!CREDENTIAL_REGISTRY_ADDRESS,
    })
  }

  const useGetUserCredentials = (userAddress) => {
    return useContractRead({
      address: CREDENTIAL_REGISTRY_ADDRESS,
      abi: CREDENTIAL_REGISTRY_ABI,
      functionName: 'getUserCredentials',
      args: [userAddress],
      enabled: !!userAddress && !!CREDENTIAL_REGISTRY_ADDRESS,
    })
  }

  const useGetUserProfile = (userAddress) => {
    return useContractRead({
      address: CREDENTIAL_REGISTRY_ADDRESS,
      abi: CREDENTIAL_REGISTRY_ABI,
      functionName: 'getUserProfile',
      args: [userAddress],
      enabled: !!userAddress && !!CREDENTIAL_REGISTRY_ADDRESS,
    })
  }

  const useTotalCredentials = () => {
    return useContractRead({
      address: CREDENTIAL_REGISTRY_ADDRESS,
      abi: CREDENTIAL_REGISTRY_ABI,
      functionName: 'totalCredentials',
      enabled: !!CREDENTIAL_REGISTRY_ADDRESS,
    })
  }

  // Write hooks
  const useRegisterCredential = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: CREDENTIAL_REGISTRY_ADDRESS,
      abi: CREDENTIAL_REGISTRY_ABI,
      functionName: 'registerCredential',
      chainId: CHAIN_ID,
      mode: 'recklesslyUnprepared',
    })
    const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      registerCredential: write,
      data,
      isLoading: isLoading || isWaiting,
      isSuccess,
      error,
    }
  }

  const useVerifyCredential = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: CREDENTIAL_REGISTRY_ADDRESS,
      abi: CREDENTIAL_REGISTRY_ABI,
      functionName: 'verifyCredential',
      chainId: CHAIN_ID,
      mode: 'recklesslyUnprepared',
    })
    const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      verifyCredential: write,
      data,
      isLoading: isLoading || isWaiting,
      isSuccess,
      error,
    }
  }

  const useRevokeCredential = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: CREDENTIAL_REGISTRY_ADDRESS,
      abi: CREDENTIAL_REGISTRY_ABI,
      functionName: 'revokeCredential',
      chainId: CHAIN_ID,
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
    useGetUserCredentials,
    useGetUserProfile,
    useTotalCredentials,
    useRegisterCredential,
    useVerifyCredential,
    useRevokeCredential,
  }
}

// Reward Manager Hooks
export const useRewardManager = () => {
  // Read hooks
  const useGetUserRewards = (userAddress) => {
    return useContractRead({
      address: REWARD_MANAGER_ADDRESS,
      abi: REWARD_MANAGER_ABI,
      functionName: 'getUserRewards',
      args: [userAddress],
      enabled: !!userAddress && !!REWARD_MANAGER_ADDRESS,
    })
  }

  const useGetVerifierFees = (verifierAddress) => {
    return useContractRead({
      address: REWARD_MANAGER_ADDRESS,
      abi: REWARD_MANAGER_ABI,
      functionName: 'getVerifierFees',
      args: [verifierAddress],
      enabled: !!verifierAddress && !!REWARD_MANAGER_ADDRESS,
    })
  }

  // Write hooks
  const useDistributeReward = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: REWARD_MANAGER_ADDRESS,
      abi: REWARD_MANAGER_ABI,
      functionName: 'distributeCredentialReward',
      chainId: CHAIN_ID,
      mode: 'recklesslyUnprepared',
    })
    const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      distributeReward: write,
      data,
      isLoading: isLoading || isWaiting,
      isSuccess,
      error,
    }
  }

  return {
    useGetUserRewards,
    useGetVerifierFees,
    useDistributeReward,
  }
}

// Verifier Registry Hooks
export const useVerifierRegistry = () => {
  // Read hooks
  const useIsActiveVerifier = (verifierAddress) => {
    return useContractRead({
      address: VERIFIER_REGISTRY_ADDRESS,
      abi: VERIFIER_REGISTRY_ABI,
      functionName: 'isActiveVerifier',
      args: [verifierAddress],
      enabled: !!verifierAddress && !!VERIFIER_REGISTRY_ADDRESS,
    })
  }

  const useGetVerifier = (verifierAddress) => {
    return useContractRead({
      address: VERIFIER_REGISTRY_ADDRESS,
      abi: VERIFIER_REGISTRY_ABI,
      functionName: 'getVerifier',
      args: [verifierAddress],
      enabled: !!verifierAddress && !!VERIFIER_REGISTRY_ADDRESS,
    })
  }

  const useGetActiveVerifiers = () => {
    return useContractRead({
      address: VERIFIER_REGISTRY_ADDRESS,
      abi: VERIFIER_REGISTRY_ABI,
      functionName: 'getActiveVerifiers',
      enabled: !!VERIFIER_REGISTRY_ADDRESS,
    })
  }

  // Write hooks
  const useRegisterVerifier = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: VERIFIER_REGISTRY_ADDRESS,
      abi: VERIFIER_REGISTRY_ABI,
      functionName: 'registerVerifier',
      chainId: CHAIN_ID,
      mode: 'recklesslyUnprepared',
    })
    const { isLoading: isWaiting, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    return {
      registerVerifier: write,
      data,
      isLoading: isLoading || isWaiting,
      isSuccess,
      error,
    }
  }

  return {
    useIsActiveVerifier,
    useGetVerifier,
    useGetActiveVerifiers,
    useRegisterVerifier,
  }
}

// Analytics Module Hooks
export const useAnalyticsModule = () => {
  // Read hooks
  const useGetUserStats = (userAddress) => {
    return useContractRead({
      address: ANALYTICS_MODULE_ADDRESS,
      abi: ANALYTICS_MODULE_ABI,
      functionName: 'getUserStats',
      args: [userAddress],
      enabled: !!userAddress && !!ANALYTICS_MODULE_ADDRESS,
    })
  }

  const useGetVerifierStats = (verifierAddress) => {
    return useContractRead({
      address: ANALYTICS_MODULE_ADDRESS,
      abi: ANALYTICS_MODULE_ABI,
      functionName: 'getVerifierStats',
      args: [verifierAddress],
      enabled: !!verifierAddress && !!ANALYTICS_MODULE_ADDRESS,
    })
  }

  const useGetGlobalStats = () => {
    return useContractRead({
      address: ANALYTICS_MODULE_ADDRESS,
      abi: ANALYTICS_MODULE_ABI,
      functionName: 'getGlobalStats',
      enabled: !!ANALYTICS_MODULE_ADDRESS,
    })
  }

  const useGetUserLeaderboard = () => {
    return useContractRead({
      address: ANALYTICS_MODULE_ADDRESS,
      abi: ANALYTICS_MODULE_ABI,
      functionName: 'getUserLeaderboard',
      enabled: !!ANALYTICS_MODULE_ADDRESS,
    })
  }

  const useGetVerifierLeaderboard = () => {
    return useContractRead({
      address: ANALYTICS_MODULE_ADDRESS,
      abi: ANALYTICS_MODULE_ABI,
      functionName: 'getVerifierLeaderboard',
      enabled: !!ANALYTICS_MODULE_ADDRESS,
    })
  }

  return {
    useGetUserStats,
    useGetVerifierStats,
    useGetGlobalStats,
    useGetUserLeaderboard,
    useGetVerifierLeaderboard,
  }
}

// Credential Issuer Hooks (Legacy support)
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
      chainId: CHAIN_ID,
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
      chainId: CHAIN_ID,
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
      chainId: CHAIN_ID,
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
      chainId: CHAIN_ID,
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
      chainId: CHAIN_ID,
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

  const useTotalIdentities = () => {
    return useContractRead({
      address: IDENTITY_REGISTRY_ADDRESS,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'totalIdentities',
      enabled: !!IDENTITY_REGISTRY_ADDRESS,
    })
  }

  const useGetRegisteredUsers = (offset = 0, limit = 10) => {
    return useContractRead({
      address: IDENTITY_REGISTRY_ADDRESS,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'getRegisteredUsers',
      args: [offset, limit],
      enabled: !!IDENTITY_REGISTRY_ADDRESS,
    })
  }

  // Write hooks
  const useRegisterIdentity = () => {
    const { data, write, isLoading, error } = useContractWrite({
      address: IDENTITY_REGISTRY_ADDRESS,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'registerIdentity',
      chainId: CHAIN_ID,
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
      chainId: CHAIN_ID,
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
      chainId: CHAIN_ID,
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
    useTotalIdentities,
    useGetRegisteredUsers,
    useRegisterIdentity,
    useUpdateIdentity,
    useRevokeIdentity,
  }
}

// Legacy Identity Registry Hook (for backward compatibility)
export const useIdentityRegistryLegacy = () => {
  // Redirect to CredentialRegistry for now
  const credentialRegistry = useCredentialRegistry()
  
  return {
    useGetIdentity: credentialRegistry.useGetUserProfile,
    useIsRegistered: (userAddress) => {
      const profile = credentialRegistry.useGetUserProfile(userAddress)
      return {
        ...profile,
        data: profile.data?.[4] // isActive field
      }
    },
    useRegisterIdentity: credentialRegistry.useRegisterCredential,
    useUpdateIdentity: credentialRegistry.useRegisterCredential,
    useRevokeIdentity: credentialRegistry.useRevokeCredential,
  }
}

// Combined hook that provides access to all contract hooks
export const useContracts = () => {
  return {
    credentialRegistry: useCredentialRegistry(),
    rewardManager: useRewardManager(),
    verifierRegistry: useVerifierRegistry(),
    analyticsModule: useAnalyticsModule(),
    credentialIssuer: useCredentialIssuer(),
    accessControl: useAccessControl(),
    // Legacy support
    identityRegistry: useIdentityRegistry(),
  }
}