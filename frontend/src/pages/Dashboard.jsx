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

  // Stats calculation
  const stats = [
    {
      name: 'Identity Status',
      value: isRegistered ? 'Registered' : 'Not Registered',
      icon: IdentificationIcon,
      color: isRegistered ? 'text-green-600' : 'text-yellow-600',
      bgColor: isRegistered ? 'bg-green-100' : 'bg-yellow-100',
      change: isRegistered ? '+100%' : '0%',
      changeType: isRegistered ? 'positive' : 'neutral',
    },
    {
      name: 'Credentials',
      value: credentials?.length || 0,
      icon: DocumentCheckIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Active Permissions',
      value: '3',
      icon: KeyIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+5%',
      changeType: 'positive',
    },
    {
      name: 'Security Score',
      value: '95%',
      icon: ShieldCheckIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+2%',
      changeType: 'positive',
    },
  ]

  const quickActions = [
    {
      name: 'Register Identity',
      description: 'Create your decentralized identity',
      href: '/identity',
      icon: IdentificationIcon,
      color: 'bg-primary-600 hover:bg-primary-700',
      disabled: isRegistered,
    },
    {
      name: 'View Credentials',
      description: 'Manage your verifiable credentials',
      href: '/credentials',
      icon: DocumentCheckIcon,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Verify Document',
      description: 'Verify a credential or presentation',
      href: '/verification',
      icon: ShieldCheckIcon,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      name: 'Access Control',
      description: 'Manage data access permissions',
      href: '/access-control',
      icon: KeyIcon,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'identity',
      action: 'Identity registered',
      timestamp: '2 hours ago',
      status: 'completed',
      icon: IdentificationIcon,
    },
    {
      id: 2,
      type: 'credential',
      action: 'Education credential issued',
      timestamp: '1 day ago',
      status: 'completed',
      icon: DocumentCheckIcon,
    },
    {
      id: 3,
      type: 'access',
      action: 'Access granted to platform X',
      timestamp: '2 days ago',
      status: 'completed',
      icon: KeyIcon,
    },
    {
      id: 4,
      type: 'verification',
      action: 'Credential verified',
      timestamp: '3 days ago',
      status: 'completed',
      icon: ShieldCheckIcon,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's an overview of your decentralized identity.
          </p>
          {address && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">Connected Wallet:</span>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </code>
                {did && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm font-medium text-gray-500">DID:</span>
                    <code className="text-sm bg-primary-50 text-primary-700 px-2 py-1 rounded">
                      {did.slice(0, 20)}...
                    </code>
                  </>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.name}
                variants={itemVariants}
                className="card hover:shadow-medium transition-shadow duration-200"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : stat.changeType === 'negative'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">from last month</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={action.name}
                      to={action.href}
                      className={`group relative p-4 sm:p-6 rounded-xl text-white transition-all duration-200 ${
                        action.disabled
                          ? 'bg-gray-400 cursor-not-allowed'
                          : `${action.color} hover:scale-105 hover:shadow-lg`
                      }`}
                      onClick={(e) => action.disabled && e.preventDefault()}
                    >
                      <div className="flex flex-col xs:flex-row items-start xs:items-center space-y-2 xs:space-y-0 xs:space-x-4">
                        <Icon className="w-6 h-6 xs:w-8 xs:h-8" />
                        <div>
                          <h3 className="font-semibold text-sm xs:text-base">{action.name}</h3>
                          <p className="text-xs xs:text-sm opacity-90">{action.description}</p>
                        </div>
                      </div>
                      {action.disabled && (
                        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl flex items-center justify-center">
                          <CheckCircleIcon className="w-6 h-6 xs:w-8 xs:h-8 text-white" />
                        </div>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {activity.timestamp}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        {activity.status === 'completed' && (
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        )}
                        {activity.status === 'pending' && (
                          <ClockIcon className="w-5 h-5 text-yellow-500" />
                        )}
                        {activity.status === 'failed' && (
                          <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6">
                <Link
                  to="/activity"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                >
                  View all activity
                  <EyeIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Status Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 lg:mt-8"
        >
          {/* Identity Status */}
          <motion.div variants={itemVariants} className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Identity Status</h3>
              <IdentificationIcon className="w-6 h-6 text-primary-600" />
            </div>
            {isCheckingRegistration ? (
              <div className="flex items-center space-x-2">
                <div className="spinner"></div>
                <span className="text-gray-600">Checking registration...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Registration</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isRegistered
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {isRegistered ? 'Registered' : 'Not Registered'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">DID Generated</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      did ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {did ? 'Yes' : 'No'}
                  </span>
                </div>
                {!isRegistered && (
                  <Link
                    to="/identity"
                    className="btn-primary w-full text-center mt-4"
                  >
                    Register Identity
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {/* Credentials Overview */}
          <motion.div variants={itemVariants} className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Credentials</h3>
              <DocumentCheckIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Credentials</span>
                <span className="font-semibold text-gray-900">
                  {credentials?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Verified</span>
                <span className="font-semibold text-green-600">
                  {credentials?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Expired</span>
                <span className="font-semibold text-red-600">0</span>
              </div>
              <Link
                to="/credentials"
                className="btn-secondary w-full text-center mt-4"
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