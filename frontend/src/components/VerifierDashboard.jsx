import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  StarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import VerifierStakeCard from './VerifierStakeCard'
import RewardCard from './RewardCard'
import BadgeDisplay from './BadgeDisplay'

const VerifierDashboard = () => {
  const [verifierData, setVerifierData] = useState({
    stakedAmount: 1500,
    reputation: 92,
    totalEarnings: 245.8,
    pendingRewards: 12.5,
    verificationCount: 156,
    slashingRisk: 'low',
    isActive: true,
  })

  const [recentVerifications, setRecentVerifications] = useState([
    {
      id: 1,
      credentialType: 'Education Certificate',
      timestamp: '2024-01-15T10:30:00Z',
      reward: 2.5,
      status: 'completed',
      difficulty: 'medium',
    },
    {
      id: 2,
      credentialType: 'Professional License',
      timestamp: '2024-01-15T09:15:00Z',
      reward: 5.0,
      status: 'completed',
      difficulty: 'high',
    },
    {
      id: 3,
      credentialType: 'Identity Document',
      timestamp: '2024-01-15T08:45:00Z',
      reward: 1.5,
      status: 'disputed',
      difficulty: 'low',
    },
  ])

  const [badges] = useState([
    {
      type: 'first-verification',
      earned: true,
      earnedAt: '2024-01-01T00:00:00Z',
    },
    {
      type: 'top-verifier',
      earned: true,
      earnedAt: '2024-01-10T00:00:00Z',
      isNew: true,
    },
    {
      type: 'streak-master',
      earned: true,
      earnedAt: '2024-01-12T00:00:00Z',
    },
    {
      type: 'reputation-star',
      earned: false,
      progress: 75,
    },
  ])

  const [analytics, setAnalytics] = useState({
    weeklyEarnings: [
      { day: 'Mon', amount: 15.2 },
      { day: 'Tue', amount: 22.8 },
      { day: 'Wed', amount: 18.5 },
      { day: 'Thu', amount: 31.2 },
      { day: 'Fri', amount: 25.6 },
      { day: 'Sat', amount: 19.8 },
      { day: 'Sun', amount: 12.3 },
    ],
    verificationAccuracy: 94.2,
    averageVerificationTime: 8.5, // minutes
    monthlyGrowth: 12.5,
  })

  const handleStake = (amount) => {
    setVerifierData(prev => ({
      ...prev,
      stakedAmount: prev.stakedAmount + amount,
    }))
  }

  const handleUnstake = (amount) => {
    setVerifierData(prev => ({
      ...prev,
      stakedAmount: Math.max(0, prev.stakedAmount - amount),
    }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'disputed':
        return 'text-red-600 bg-red-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Verifier Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage your verification activities and track your earnings
            </p>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            verifierData.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {verifierData.isActive ? 'Active Verifier' : 'Inactive'}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <RewardCard
          title="Total Earnings"
          amount={`${verifierData.totalEarnings} MOCA`}
          type="currency"
          description="Lifetime verification rewards"
          trend="up"
          trendValue="+12.5%"
        />
        <RewardCard
          title="Reputation Score"
          amount={`${verifierData.reputation}%`}
          type="star"
          description="Based on verification accuracy"
          trend={verifierData.reputation >= 90 ? 'up' : 'down'}
          trendValue={verifierData.reputation >= 90 ? '+2.1%' : '-1.2%'}
        />
        <RewardCard
          title="Verifications"
          amount={verifierData.verificationCount}
          type="chart"
          description="Total completed verifications"
          trend="up"
          trendValue="+8"
        />
        <RewardCard
          title="Avg. Time"
          amount={`${analytics.averageVerificationTime}m`}
          type="chart"
          description="Average verification time"
          trend="down"
          trendValue="-1.2m"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Staking Card */}
          <VerifierStakeCard
            stakedAmount={verifierData.stakedAmount}
            reputation={verifierData.reputation}
            totalEarnings={verifierData.totalEarnings}
            pendingRewards={verifierData.pendingRewards}
            verificationCount={verifierData.verificationCount}
            slashingRisk={verifierData.slashingRisk}
            onStake={handleStake}
            onUnstake={handleUnstake}
          />

          {/* Recent Verifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Verifications</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentVerifications.map((verification) => (
                <motion.div
                  key={verification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <ShieldCheckIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {verification.credentialType}
                      </h4>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>
                            {new Date(verification.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <span className={`font-medium ${getDifficultyColor(verification.difficulty)}`}>
                          {verification.difficulty} difficulty
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-900">
                      +{verification.reward} MOCA
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(verification.status)}`}>
                      {verification.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Weekly Earnings Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Earnings</h3>
            <div className="flex items-end justify-between h-40 space-x-2">
              {analytics.weeklyEarnings.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.amount / 35) * 100}%` }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-sm min-h-[4px]"
                  />
                  <span className="text-xs text-gray-500 mt-2">{day.day}</span>
                  <span className="text-xs font-medium text-gray-700">
                    {day.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Badges */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Achievements</h3>
            <BadgeDisplay badges={badges} size="medium" />
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Accuracy Rate</span>
                <span className="font-semibold text-gray-900">
                  {analytics.verificationAccuracy}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analytics.verificationAccuracy}%` }}
                  className="bg-green-500 h-2 rounded-full"
                />
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">Monthly Growth</span>
                <span className="font-semibold text-green-600">
                  +{analytics.monthlyGrowth}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(analytics.monthlyGrowth * 2, 100)}%` }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                <ShieldCheckIcon className="w-4 h-4" />
                <span>Start Verifying</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <CurrencyDollarIcon className="w-4 h-4" />
                <span>Claim Rewards</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <ChartBarIcon className="w-4 h-4" />
                <span>View Analytics</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifierDashboard