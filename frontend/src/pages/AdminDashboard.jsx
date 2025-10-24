import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChartBarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  EyeIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('applications')
  const [applications, setApplications] = useState([
    {
      id: 1,
      organizationName: 'TechCorp University',
      organizationType: 'Educational Institution',
      contactEmail: 'admin@techcorp.edu',
      website: 'https://techcorp.edu',
      description: 'Leading technology university with 50,000+ students. We want to verify academic credentials and degrees.',
      verificationTypes: ['Academic Credentials', 'Degree Verification'],
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00Z',
      reviewedAt: null,
      reviewedBy: null
    },
    {
      id: 2,
      organizationName: 'Global Health Systems',
      organizationType: 'Healthcare Organization',
      contactEmail: 'verification@globalhealth.com',
      website: 'https://globalhealth.com',
      description: 'International healthcare network requiring medical license and certification verification.',
      verificationTypes: ['Medical Licenses', 'Professional Certifications'],
      status: 'approved',
      submittedAt: '2024-01-10T14:20:00Z',
      reviewedAt: '2024-01-12T09:15:00Z',
      reviewedBy: 'admin'
    },
    {
      id: 3,
      organizationName: 'Crypto Finance Ltd',
      organizationType: 'Financial Institution',
      contactEmail: 'compliance@cryptofinance.com',
      website: 'https://cryptofinance.com',
      description: 'Cryptocurrency exchange requiring KYC and financial certification verification.',
      verificationTypes: ['Financial Certifications', 'KYC Documents'],
      status: 'rejected',
      submittedAt: '2024-01-08T16:45:00Z',
      reviewedAt: '2024-01-09T11:30:00Z',
      reviewedBy: 'admin'
    }
  ])

  const [stats, setStats] = useState({
    totalApplications: 15,
    pendingApplications: 5,
    approvedVerifiers: 8,
    rejectedApplications: 2,
    activeVerifiers: 6,
    totalVerifications: 1247
  })

  // Check admin authentication
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession')
    if (!adminSession) {
      toast.error('Please login to access admin dashboard')
      navigate('/admin/login')
      return
    }

    try {
      const session = JSON.parse(adminSession)
      if (!session.username || session.role !== 'admin') {
        throw new Error('Invalid session')
      }
    } catch (error) {
      localStorage.removeItem('adminSession')
      toast.error('Invalid session. Please login again.')
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminSession')
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }

  const handleApplicationAction = (applicationId, action) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: action,
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'admin'
        }
      }
      return app
    }))

    const actionText = action === 'approved' ? 'approved' : 'rejected'
    toast.success(`Application ${actionText} successfully`)

    // Update stats
    setStats(prev => ({
      ...prev,
      pendingApplications: prev.pendingApplications - 1,
      approvedVerifiers: action === 'approved' ? prev.approvedVerifiers + 1 : prev.approvedVerifiers,
      rejectedApplications: action === 'rejected' ? prev.rejectedApplications + 1 : prev.rejectedApplications
    }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      case 'approved': return 'text-green-400 bg-green-400/10'
      case 'rejected': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return ClockIcon
      case 'approved': return CheckCircleIcon
      case 'rejected': return XCircleIcon
      default: return ClockIcon
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved Verifiers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approvedVerifiers}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Verifiers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeVerifiers}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Verifications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalVerifications}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejectedApplications}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <BuildingOfficeIcon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Applications Table */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Verifier Applications</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => {
                  const StatusIcon = getStatusIcon(application.status)
                  return (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {application.organizationName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.contactEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.organizationType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          <StatusIcon className="w-4 h-4 mr-1" />
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 flex items-center">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            View
                          </button>
                          {application.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApplicationAction(application.id, 'approved')}
                                className="text-green-600 hover:text-green-900 flex items-center"
                              >
                                <CheckCircleIcon className="w-4 h-4 mr-1" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleApplicationAction(application.id, 'rejected')}
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
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard