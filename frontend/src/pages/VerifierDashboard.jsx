import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  StarIcon,
  EyeIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { useAccount } from 'wagmi'

const VerifierDashboard = () => {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState('overview')
  const [verifierStats, setVerifierStats] = useState({
    totalEarnings: 245.67,
    pendingEarnings: 12.34,
    verificationsCompleted: 89,
    successRate: 96.5,
    reputationScore: 4.8,
    currentTier: 'Gold',
    activeRequests: 5,
    completedToday: 3
  })

  const [verificationRequests, setVerificationRequests] = useState([
    {
      id: 1,
      requesterName: 'John Smith',
      requesterAddress: '0x1234...5678',
      credentialType: 'University Degree',
      institution: 'MIT',
      submittedAt: '2024-01-15T10:30:00Z',
      deadline: '2024-01-17T10:30:00Z',
      reward: 0.5,
      status: 'pending',
      priority: 'high',
      documents: ['degree.pdf', 'transcript.pdf']
    },
    {
      id: 2,
      requesterName: 'Sarah Johnson',
      requesterAddress: '0x5678...9012',
      credentialType: 'Professional License',
      institution: 'Medical Board of California',
      submittedAt: '2024-01-15T14:20:00Z',
      deadline: '2024-01-18T14:20:00Z',
      reward: 0.3,
      status: 'pending',
      priority: 'medium',
      documents: ['license.pdf', 'certification.pdf']
    },
    {
      id: 3,
      requesterName: 'Mike Chen',
      requesterAddress: '0x9012...3456',
      credentialType: 'Work Experience',
      institution: 'Google Inc.',
      submittedAt: '2024-01-14T09:15:00Z',
      deadline: '2024-01-16T09:15:00Z',
      reward: 0.2,
      status: 'in_review',
      priority: 'low',
      documents: ['employment_letter.pdf']
    }
  ])

  const [recentEarnings, setRecentEarnings] = useState([
    { date: '2024-01-15', type: 'Degree Verification', amount: 0.5, status: 'completed' },
    { date: '2024-01-15', type: 'License Verification', amount: 0.3, status: 'completed' },
    { date: '2024-01-14', type: 'Certificate Verification', amount: 0.2, status: 'completed' },
    { date: '2024-01-14', type: 'Work Experience', amount: 0.4, status: 'pending' },
    { date: '2024-01-13', type: 'Academic Transcript', amount: 0.25, status: 'completed' }
  ])

  const handleVerificationAction = (requestId, action) => {
    setVerificationRequests(prev => prev.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'in_review'
        }
      }
      return request
    }))

    const actionText = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'started review for'
    toast.success(`Verification ${actionText} successfully`)

    if (action === 'approve') {
      const request = verificationRequests.find(r => r.id === requestId)
      setVerifierStats(prev => ({
        ...prev,
        totalEarnings: prev.totalEarnings + request.reward,
        verificationsCompleted: prev.verificationsCompleted + 1,
        activeRequests: prev.activeRequests - 1
      }))
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'in_review': return 'text-blue-600 bg-blue-100'
      case 'approved': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <TrophyIcon className="w-8 h-8 mr-3 text-primary-600" />
                Verifier Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage verification requests and track your earnings
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Current Tier</div>
                <div className="text-lg font-bold text-primary-600">{verifierStats.currentTier}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Reputation</div>
                <div className="text-lg font-bold text-yellow-500 flex items-center">
                  <StarIcon className="w-5 h-5 mr-1" />
                  {verifierStats.reputationScore}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">{verifierStats.totalEarnings} VYR</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verifications</p>
                <p className="text-2xl font-bold text-gray-900">{verifierStats.verificationsCompleted}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Requests</p>
                <p className="text-2xl font-bold text-gray-900">{verifierStats.activeRequests}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{verifierStats.successRate}%</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: ChartBarIcon },
              { id: 'requests', label: 'Verification Requests', icon: DocumentCheckIcon },
              { id: 'earnings', label: 'Earnings', icon: CurrencyDollarIcon }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Performance Chart Placeholder */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Performance chart would go here</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentEarnings.slice(0, 5).map((earning, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <CurrencyDollarIcon className="w-4 h-4 text-primary-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{earning.type}</div>
                          <div className="text-xs text-gray-500">{new Date(earning.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-600">+{earning.amount} VYR</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(earning.status)}`}>
                          {earning.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Active Verification Requests</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requester
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credential Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reward
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {verificationRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{request.requesterName}</div>
                            <div className="text-sm text-gray-500">{request.requesterAddress}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.credentialType}</div>
                          <div className="text-sm text-gray-500">{request.institution}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {request.reward} VYR
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                            {request.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 flex items-center">
                              <EyeIcon className="w-4 h-4 mr-1" />
                              Review
                            </button>
                            {request.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleVerificationAction(request.id, 'approve')}
                                  className="text-green-600 hover:text-green-900 flex items-center"
                                >
                                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleVerificationAction(request.id, 'reject')}
                                  className="text-red-600 hover:text-red-900 flex items-center"
                                >
                                  <XCircleIcon className="w-4 h-4 mr-1" />
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Earnings Summary */}
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings History</h3>
                <div className="space-y-4">
                  {recentEarnings.map((earning, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <CurrencyDollarIcon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{earning.type}</div>
                          <div className="text-xs text-gray-500">{new Date(earning.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">+{earning.amount} VYR</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(earning.status)}`}>
                          {earning.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earnings Stats */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Earnings Summary</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Earned</span>
                      <span className="font-bold text-green-600">{verifierStats.totalEarnings} VYR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-bold text-yellow-600">{verifierStats.pendingEarnings} VYR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-bold text-blue-600">45.2 VYR</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Bonus</h4>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600 mb-2">15%</div>
                    <div className="text-sm text-gray-600">Current bonus rate</div>
                    <div className="mt-4 text-xs text-gray-500">
                      Based on your {verifierStats.successRate}% success rate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default VerifierDashboard