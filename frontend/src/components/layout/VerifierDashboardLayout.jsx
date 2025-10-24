import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ShieldCheckIcon,
  DocumentCheckIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  TrophyIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

const VerifierDashboardLayout = ({ 
  stats = [], 
  pendingRequests = [], 
  recentVerifications = [], 
  earnings = {},
  children 
}) => {
  const defaultStats = [
    {
      name: 'Total Verifications',
      value: '156',
      icon: ShieldCheckIcon,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+12 this week',
      changeType: 'positive'
    },
    {
      name: 'Pending Requests',
      value: '8',
      icon: ClockIcon,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      change: '3 urgent',
      changeType: 'neutral'
    },
    {
      name: 'Rating',
      value: '4.8',
      icon: StarIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      change: '98% approval',
      changeType: 'positive'
    },
    {
      name: 'Earnings',
      value: '$2,340',
      icon: CurrencyDollarIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+$180 this week',
      changeType: 'positive'
    }
  ]

  const displayStats = stats.length > 0 ? stats : defaultStats

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Verifier Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage verification requests and track your performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Active Verifier</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {displayStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  {stat.change && (
                    <p className={`text-sm mt-1 ${
                      stat.changeType === 'positive' ? 'text-emerald-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Pending Requests */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Pending Verification Requests</h3>
                <Link 
                  to="/verifier/dashboard" 
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
              
              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.slice(0, 5).map((request, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <DocumentCheckIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{request.type || 'Identity Verification'}</p>
                          <p className="text-sm text-gray-500">{request.requester || 'Anonymous User'}</p>
                          <p className="text-xs text-gray-400">{request.timestamp || '2 hours ago'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-emerald-600">${request.fee || '25'}</span>
                        <button className="bg-emerald-600 text-white px-3 py-1 rounded-md text-sm hover:bg-emerald-700 transition-colors duration-150">
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ClockIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No pending requests</p>
                  <p className="text-sm text-gray-400 mt-1">New verification requests will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
              
              {/* Rating */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Rating</span>
                  <span className="text-sm font-bold text-gray-900">4.8/5.0</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">(127 reviews)</span>
                </div>
              </div>

              {/* Response Time */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Avg Response Time</span>
                  <span className="text-sm font-bold text-gray-900">2.4 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Faster than 85% of verifiers</p>
              </div>

              {/* Accuracy */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Accuracy Rate</span>
                  <span className="text-sm font-bold text-gray-900">98.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
            </div>

            {/* Earnings Summary */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-semibold text-gray-900">${earnings.thisWeek || '180'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-semibold text-gray-900">${earnings.thisMonth || '720'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Earned</span>
                  <span className="font-semibold text-gray-900">${earnings.total || '2,340'}</span>
                </div>
                <div className="pt-3 border-t border-emerald-200">
                  <div className="flex items-center text-emerald-600">
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">+15% from last month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/verifier/dashboard"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center space-x-3">
                    <EyeIcon className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Review Requests</span>
                  </div>
                  <span className="text-xs text-gray-500">8 pending</span>
                </Link>
                <Link
                  to="/rewards"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center space-x-3">
                    <TrophyIcon className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">View Rewards</span>
                  </div>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center space-x-3">
                    <ChartBarIcon className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Analytics</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Verifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Verifications</h3>
            
            {recentVerifications.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentVerifications.slice(0, 5).map((verification, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {verification.type || 'Identity Verification'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            verification.status === 'approved' 
                              ? 'bg-emerald-100 text-emerald-800'
                              : verification.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {verification.status || 'Approved'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${verification.fee || '25'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {verification.date || '2 hours ago'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <DocumentCheckIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent verifications</p>
                <p className="text-sm text-gray-400 mt-1">Completed verifications will appear here</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Custom Content */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default VerifierDashboardLayout