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
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:border-blue-400'
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
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      hoverColor: 'hover:border-emerald-400'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect your wallet and select your role to access the Veyra Protocol ecosystem
            </p>
          </motion.div>

          {/* Wallet Connection Status */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <WalletIcon className={`h-6 w-6 ${isConnected ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Wallet Connection
                    </h3>
                    <p className="text-gray-600">
                      {isConnected 
                        ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`
                        : 'Connect your wallet to continue'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {isConnected && (
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
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
                    whileHover={!isDisabled ? { scale: 1.02 } : {}}
                    whileTap={!isDisabled ? { scale: 0.98 } : {}}
                    className={`
                      relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer
                      ${role.borderColor} ${role.hoverColor}
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                      ${isSelected ? 'ring-4 ring-blue-200' : ''}
                    `}
                    onClick={() => !isDisabled && handleRoleSelection(role.id)}
                  >
                    {/* Loading Overlay */}
                    {isSelected && isLoading && (
                      <div className="absolute inset-0 bg-white bg-opacity-90 rounded-2xl flex items-center justify-center z-10">
                        <div className="flex items-center space-x-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          <span className="text-gray-700 font-medium">Setting up your dashboard...</span>
                        </div>
                      </div>
                    )}

                    <div className="p-8">
                      {/* Role Header */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-r ${role.color}`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{role.title}</h3>
                          <p className="text-gray-600 mt-1">{role.description}</p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {role.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {!isConnected && (
                            <>
                              <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" />
                              <span className="text-sm text-amber-600">Connect wallet first</span>
                            </>
                          )}
                        </div>
                        <div className={`
                          flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors
                          ${isDisabled 
                            ? 'bg-gray-100 text-gray-400' 
                            : `bg-gradient-to-r ${role.color} text-white hover:shadow-lg`
                          }
                        `}>
                          <span>Select Role</span>
                          <ArrowRightIcon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Help Text */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-gray-500">
              Need help choosing? You can always change your role later in your account settings.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default RoleSelection