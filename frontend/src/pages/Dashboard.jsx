import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'
import {
  IdentificationIcon,
  DocumentCheckIcon,
  KeyIcon,
  ShieldCheckIcon,
  PlusIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import { useIdentityRegistry, useCredentialIssuer } from '../hooks/useContracts'
import { useDID, useVerifiableCredentials } from '../hooks/useAirKit'

const Dashboard = () => {
  const { address } = useAccount()
  const { useGetIdentity, useIsRegistered } = useIdentityRegistry()
  const { useGetUserCredentials } = useCredentialIssuer()
  const { did } = useDID()
  const { credentials } = useVerifiableCredentials()

  // Contract data
  const { data: isRegistered, isLoading: isCheckingRegistration } = useIsRegistered(address)
  const { data: identity, isLoading: isLoadingIdentity } = useGetIdentity(address)
  const { data: userCredentials, isLoading: isLoadingCredentials } = useGetUserCredentials(address)

  // Enhanced stats calculation
  const stats = [
    {
      name: 'Identity Status',
      value: isRegistered ? 'Active' : 'Inactive',
      icon: IdentificationIcon,
      color: isRegistered ? 'text-emerald-600' : 'text-amber-600',
      bgColor: isRegistered ? 'bg-emerald-50' : 'bg-amber-50',
      borderColor: isRegistered ? 'border-emerald-200' : 'border-amber-200',
      change: isRegistered ? 'Verified' : 'Pending',
      changeType: isRegistered ? 'positive' : 'neutral',
    },
    {
      name: 'Credentials',
      value: credentials?.length || 0,
      icon: DocumentCheckIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      change: '+2 this month',
      changeType: 'positive',
    },
    {
      name: 'VYR Tokens',
      value: '1,250',
      icon: CurrencyDollarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      change: '+15% this week',
      changeType: 'positive',
    },
    {
      name: 'Verifications',
      value: '47',
      icon: ShieldCheckIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      change: '+8 today',
      changeType: 'positive',
    },
  ]

  const quickActions = [
    {
      name: 'My Identity',
      description: 'Manage your decentralized identity',
      href: '/my-identity',
      icon: IdentificationIcon,
      color: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
      disabled: false,
    },
    {
      name: 'My Credentials',
      description: 'View and manage your credentials',
      href: '/my-credentials',
      icon: DocumentCheckIcon,
      color: 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800',
    },
    {
      name: 'Verify & Earn',
      description: 'Verify credentials and earn VYR',
      href: '/verify-earn',
      icon: ShieldCheckIcon,
      color: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
    },
    {
      name: 'Rewards',
      description: 'Track your VYR rewards',
      href: '/rewards',
      icon: TrophyIcon,
      color: 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800',
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'verification',
      action: 'Verified education credential',
      timestamp: '2 hours ago',
      status: 'completed',
      icon: ShieldCheckIcon,
      reward: '+50 VYR',
    },
    {
      id: 2,
      type: 'credential',
      action: 'New professional credential issued',
      timestamp: '1 day ago',
      status: 'completed',
      icon: DocumentCheckIcon,
      reward: null,
    },
    {
      id: 3,
      type: 'reward',
      action: 'Daily verification bonus earned',
      timestamp: '2 days ago',
      status: 'completed',
      icon: CurrencyDollarIcon,
      reward: '+25 VYR',
    },
    {
      id: 4,
      type: 'identity',
      action: 'Identity profile updated',
      timestamp: '3 days ago',
      status: 'completed',
      icon: IdentificationIcon,
      reward: null,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 lg:mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-lg text-gray-600 mt-3 max-w-2xl">
                Welcome to your Veyra Protocol dashboard. Manage your identity, credentials, and earn VYR tokens.
              </p>
            </div>
            
            {address && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:min-w-[400px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Wallet Address</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 font-medium">Connected</span>
                    </div>
                  </div>
                  <code className="block text-sm bg-gray-50 px-3 py-2 rounded-lg border font-mono">
                    {address.slice(0, 8)}...{address.slice(-6)}
                  </code>
                  {did && (
                    <>
                      <div className="border-t pt-3">
                        <span className="text-sm font-medium text-gray-500 block mb-2">Decentralized ID</span>
                        <code className="block text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-200 font-mono">
                          {did.slice(0, 24)}...
                        </code>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12"
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.name}
                variants={itemVariants}
                className={`bg-white rounded-2xl border-2 ${stat.borderColor} p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{stat.name}</h3>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-full ${
                        stat.changeType === 'positive'
                          ? 'text-green-700 bg-green-100'
                          : stat.changeType === 'negative'
                          ? 'text-red-700 bg-red-100'
                          : 'text-gray-700 bg-gray-100'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-10">
          {/* Enhanced Quick Actions */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="xl:col-span-2"
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
                <ChartBarIcon className="w-6 h-6 text-gray-400" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={action.name}
                      to={action.href}
                      className={`group relative p-6 rounded-xl text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                        action.disabled
                          ? 'bg-gray-400 cursor-not-allowed'
                          : action.color
                      }`}
                      onClick={(e) => action.disabled && e.preventDefault()}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <Icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg mb-1">{action.name}</h3>
                          <p className="text-sm opacity-90 leading-relaxed">{action.description}</p>
                        </div>
                      </div>
                      {action.disabled && (
                        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl flex items-center justify-center">
                          <CheckCircleIcon className="w-8 h-8 text-white" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Recent Activity */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                <ClockIcon className="w-6 h-6 text-gray-400" />
              </div>
              <div className="space-y-6">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {activity.action}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500 flex items-center">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            {activity.timestamp}
                          </p>
                          {activity.reward && (
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                              {activity.reward}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {activity.status === 'completed' && (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )}
                        {activity.status === 'pending' && (
                          <ClockIcon className="w-5 h-5 text-amber-500" />
                        )}
                        {activity.status === 'failed' && (
                          <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  to="/activity"
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center justify-center w-full py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  View All Activity
                  <EyeIcon className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Status Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-12"
        >
          {/* Enhanced Identity Status */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Identity Overview</h3>
              <IdentificationIcon className="w-7 h-7 text-blue-600" />
            </div>
            {isCheckingRegistration ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-gray-600 ml-3">Checking registration status...</span>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700">Registration Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      isRegistered
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {isRegistered ? 'Active' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700">DID Generated</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      did 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}
                  >
                    {did ? 'Generated' : 'Not Generated'}
                  </span>
                </div>
                {!isRegistered && (
                  <Link
                    to="/my-identity"
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Complete Registration
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {/* Enhanced Credentials Overview */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Credentials Summary</h3>
              <DocumentCheckIcon className="w-7 h-7 text-emerald-600" />
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{credentials?.length || 0}</div>
                  <div className="text-sm text-blue-700 font-medium">Total</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{credentials?.length || 0}</div>
                  <div className="text-sm text-green-700 font-medium">Verified</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="text-2xl font-bold text-red-600">0</div>
                  <div className="text-sm text-red-700 font-medium">Expired</div>
                </div>
              </div>
              <Link
                to="/my-credentials"
                className="block w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-center font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                Manage Credentials
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard