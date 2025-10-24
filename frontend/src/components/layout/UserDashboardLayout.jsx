import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  IdentificationIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowRightIcon,
  BellIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const UserDashboardLayout = ({ 
  stats = [], 
  recentActivity = [], 
  quickActions = [], 
  notifications = [],
  children 
}) => {
  const defaultQuickActions = [
    {
      title: 'Request Verification',
      description: 'Get your credentials verified by trusted verifiers',
      icon: ShieldCheckIcon,
      href: '/verification/request',
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    {
      title: 'Add Credential',
      description: 'Upload and manage your digital credentials',
      icon: PlusIcon,
      href: '/my-credentials',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      textColor: 'text-white'
    },
    {
      title: 'Verify & Earn',
      description: 'Become a verifier and earn rewards',
      icon: CurrencyDollarIcon,
      href: '/verify-and-earn',
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-white'
    },
    {
      title: 'View Rewards',
      description: 'Check your earned rewards and achievements',
      icon: TrophyIcon,
      href: '/rewards',
      color: 'bg-amber-500 hover:bg-amber-600',
      textColor: 'text-white'
    }
  ]

  const actions = quickActions.length > 0 ? quickActions : defaultQuickActions

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
              <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
              <p className="text-gray-600 mt-1">Manage your digital identity and credentials</p>
            </div>
            {notifications.length > 0 && (
              <div className="relative">
                <BellIcon className="h-6 w-6 text-gray-500" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        {stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
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
                  <div className={`p-3 rounded-lg ${stat.bgColor || 'bg-blue-50'}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color || 'text-blue-600'}`} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="group block"
              >
                <div className={`${action.color} rounded-xl p-6 transition-all duration-200 transform group-hover:scale-105 shadow-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    <action.icon className={`h-8 w-8 ${action.textColor}`} />
                    <ArrowRightIcon className={`h-5 w-5 ${action.textColor} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
                  </div>
                  <h3 className={`text-lg font-semibold ${action.textColor} mb-2`}>
                    {action.title}
                  </h3>
                  <p className={`text-sm ${action.textColor} opacity-90`}>
                    {action.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <Link 
                  to="/my-identity" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
              
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                      <div className={`p-2 rounded-lg ${activity.bgColor || 'bg-blue-50'}`}>
                        <activity.icon className={`h-4 w-4 ${activity.color || 'text-blue-600'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ChartBarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No recent activity</p>
                  <p className="text-sm text-gray-400 mt-1">Your activity will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Identity Score */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Identity Score</h3>
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.75)}`}
                      className="text-emerald-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold text-gray-900">75</span>
                </div>
                <p className="text-sm text-gray-600">Good identity score</p>
                <div className="flex items-center justify-center mt-2">
                  {[...Array(4)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <StarIcon className="h-4 w-4 text-gray-300" />
                </div>
              </div>
            </div>

            {/* Tips & Recommendations */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for You</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">Complete your profile to increase your identity score</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">Add more credentials to build trust</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">Get your credentials verified by trusted verifiers</p>
                </div>
              </div>
            </div>
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

export default UserDashboardLayout