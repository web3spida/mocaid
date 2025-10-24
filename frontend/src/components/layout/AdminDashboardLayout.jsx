import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CogIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  ServerIcon,
  BellIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

const AdminDashboardLayout = ({ 
  systemStats = [], 
  recentActivity = [], 
  alerts = [],
  systemHealth = {},
  children 
}) => {
  const defaultSystemStats = [
    {
      name: 'Total Users',
      value: '12,847',
      icon: UserGroupIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+234 this week',
      changeType: 'positive'
    },
    {
      name: 'Active Verifiers',
      value: '89',
      icon: ShieldCheckIcon,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+5 this week',
      changeType: 'positive'
    },
    {
      name: 'Pending Applications',
      value: '23',
      icon: ClockIcon,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      change: '7 urgent',
      changeType: 'neutral'
    },
    {
      name: 'System Health',
      value: '99.8%',
      icon: ServerIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: 'All systems operational',
      changeType: 'positive'
    }
  ]

  const defaultAlerts = [
    {
      type: 'warning',
      title: 'High verification queue',
      message: '15+ pending verifications need attention',
      timestamp: '5 minutes ago'
    },
    {
      type: 'info',
      title: 'New verifier application',
      message: 'John Smith applied to become a verifier',
      timestamp: '1 hour ago'
    }
  ]

  const displayStats = systemStats.length > 0 ? systemStats : defaultSystemStats
  const displayAlerts = alerts.length > 0 ? alerts : defaultAlerts

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor and manage the MocaID system</p>
            </div>
            <div className="flex items-center space-x-4">
              {displayAlerts.length > 0 && (
                <div className="relative">
                  <BellIcon className="h-6 w-6 text-gray-500" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </div>
              )}
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System Online</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Stats Grid */}
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
                    <div className="flex items-center mt-1">
                      {stat.changeType === 'positive' && (
                        <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-600 mr-1" />
                      )}
                      {stat.changeType === 'negative' && (
                        <ArrowTrendingDownIcon className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <p className={`text-sm ${
                        stat.changeType === 'positive' ? 'text-emerald-600' : 
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        {stat.change}
                      </p>
                    </div>
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
          {/* Recent Activity & Alerts */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                  {displayAlerts.length} active
                </span>
              </div>
              
              <div className="space-y-4">
                {displayAlerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'warning' ? 'bg-amber-50 border-amber-400' :
                    alert.type === 'error' ? 'bg-red-50 border-red-400' :
                    'bg-blue-50 border-blue-400'
                  }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {alert.type === 'warning' && (
                          <ExclamationTriangleIcon className="h-5 w-5 text-amber-600" />
                        )}
                        {alert.type === 'error' && (
                          <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                        )}
                        {alert.type === 'info' && (
                          <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent System Activity</h3>
                <Link 
                  to="/admin/dashboard" 
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
                  <p className="text-sm text-gray-400 mt-1">System activity will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                >
                  <div className="flex items-center space-x-3">
                    <UserGroupIcon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">Manage Verifiers</span>
                  </div>
                  <span className="text-xs text-gray-500">23 pending</span>
                </Link>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                >
                  <div className="flex items-center space-x-3">
                    <EyeIcon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">Review Applications</span>
                  </div>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                >
                  <div className="flex items-center space-x-3">
                    <CogIcon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">System Settings</span>
                  </div>
                </Link>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
                >
                  <div className="flex items-center space-x-3">
                    <ChartBarIcon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">Analytics</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">API Response Time</span>
                    <span className="text-sm font-bold text-gray-900">{systemHealth.apiResponseTime || '120ms'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Database Health</span>
                    <span className="text-sm font-bold text-gray-900">{systemHealth.databaseHealth || '98.5%'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Server Load</span>
                    <span className="text-sm font-bold text-gray-900">{systemHealth.serverLoad || '45%'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Statistics */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Verifications</span>
                  <span className="font-semibold text-gray-900">45,231</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-semibold text-gray-900">94.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Processing Time</span>
                  <span className="font-semibold text-gray-900">2.4 hours</span>
                </div>
                <div className="pt-3 border-t border-blue-200">
                  <div className="flex items-center text-blue-600">
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Platform growing steadily</span>
                  </div>
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
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboardLayout