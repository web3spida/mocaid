import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useAuth } from '../contexts/AuthContext'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import toast from 'react-hot-toast'
import {
  UserIcon,
  ShieldCheckIcon,
  WalletIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const RoleSelection = () => {
  const navigate = useNavigate()
  const { address, isConnected } = useAccount()
  const { userLogin, verifierLogin, user, userRole } = useAuth()
  const [selectedRole, setSelectedRole] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user && userRole) {
      switch (userRole) {
        case 'admin':
          navigate('/admin/dashboard')
          break
        case 'verifier':
          navigate('/verifier/dashboard')
          break
        case 'user':
          navigate('/dashboard')
          break
        default:
          break
      }
    }
  }, [user, userRole, navigate])

  const roles = [
    {
      id: 'user',
      title: 'Regular User',
      description: 'Manage your digital identity, credentials, and access verification services.',
      icon: UserIcon,
      features: [
        'Create and manage digital identity',
        'Store and share credentials',
        'Request verifications',
        'Access control management',
        'Earn rewards for participation'
      ],
      primaryColor: 'blue-600',
      hoverColor: 'blue-700',
      bgColor: 'blue-50',
      borderColor: 'blue-200'
    },
    {
      id: 'verifier',
      title: 'Verifier',
      description: 'Verify credentials and earn rewards for providing verification services.',
      icon: ShieldCheckIcon,
      features: [
        'Verify user credentials',
        'Earn verification rewards',
        'Build reputation score',
        'Access verifier dashboard',
        'Participate in verification network'
      ],
      primaryColor: 'emerald-600',
      hoverColor: 'emerald-700',
      bgColor: 'emerald-50',
      borderColor: 'emerald-200'
    }
  ]

  const handleRoleSelection = async (roleId) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    setSelectedRole(roleId)

    try {
      let result
      if (roleId === 'user') {
        result = userLogin()
      } else if (roleId === 'verifier') {
        result = verifierLogin(address)
      }

      if (result.success) {
        toast.success(`Successfully logged in as ${roleId}`)
        
        // Navigate to appropriate dashboard
        setTimeout(() => {
          if (roleId === 'verifier') {
            navigate('/verifier/dashboard')
          } else {
            navigate('/dashboard')
          }
        }, 1000)
      } else {
        toast.error(result.error || 'Login failed')
      }
    } catch (error) {
      console.error('Role selection error:', error)
      toast.error('Failed to select role. Please try again.')
    } finally {
      setIsLoading(false)
      setSelectedRole(null)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Choose Your Role
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect your wallet and select your role to access the Veyra Protocol ecosystem
            </p>
          </motion.div>

          {/* Wallet Connection Status */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className={`p-4 rounded-xl ${isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <WalletIcon className={`h-8 w-8 ${isConnected ? 'text-green-600' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      Wallet Connection
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {isConnected 
                        ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`
                        : 'Connect your wallet to continue'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {isConnected && (
                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                  )}
                  <ConnectButton />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Role Selection */}
          <motion.div variants={itemVariants}>
            <div className="grid md:grid-cols-2 gap-8">
              {roles.map((role) => {
                const Icon = role.icon
                const isSelected = selectedRole === role.id
                const isDisabled = !isConnected || isLoading

                return (
                  <motion.div
                    key={role.id}
                    variants={itemVariants}
                    whileHover={!isDisabled ? { y: -4 } : {}}
                    className={`
                      relative bg-white rounded-xl shadow-sm border-2 transition-all duration-300 cursor-pointer
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
                      ${isSelected ? `border-${role.primaryColor} shadow-lg` : `border-${role.borderColor} hover:border-${role.primaryColor}`}
                    `}
                    onClick={() => !isDisabled && handleRoleSelection(role.id)}
                  >
                    {/* Loading Overlay */}
                    {isSelected && isLoading && (
                      <div className="absolute inset-0 bg-white bg-opacity-95 rounded-xl flex items-center justify-center z-10">
                        <div className="flex items-center space-x-4">
                          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-${role.primaryColor}`}></div>
                          <span className="text-gray-700 font-semibold text-lg">Setting up your dashboard...</span>
                        </div>
                      </div>
                    )}

                    <div className="p-10">
                      {/* Role Header */}
                      <div className="flex items-start space-x-6 mb-8">
                        <div className={`p-5 rounded-xl bg-${role.bgColor} border border-${role.borderColor}`}>
                          <Icon className={`h-10 w-10 text-${role.primaryColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{role.title}</h3>
                          <p className="text-gray-600 text-lg leading-relaxed">{role.description}</p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-4 mb-10">
                        {role.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <CheckCircleIcon className={`h-6 w-6 text-${role.primaryColor} flex-shrink-0 mt-0.5`} />
                            <span className="text-gray-700 text-lg leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Section */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center space-x-3">
                          {!isConnected && (
                            <>
                              <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
                              <span className="text-amber-600 font-medium">Connect wallet first</span>
                            </>
                          )}
                        </div>
                        <button
                          disabled={isDisabled}
                          className={`
                            flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200
                            ${isDisabled 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : `bg-${role.primaryColor} hover:bg-${role.hoverColor} text-white shadow-sm hover:shadow-md`
                            }
                          `}
                        >
                          <span>Select Role</span>
                          <ArrowRightIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Help Text */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-gray-500 text-lg">
              Need help choosing? You can always change your role later in your account settings.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default RoleSelection