import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  StarIcon,
  ChartBarIcon,
  PlusIcon,
  MinusIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

const VerifierStakeCard = ({ 
  stakedAmount, 
  reputation, 
  totalEarnings, 
  pendingRewards,
  verificationCount,
  slashingRisk = 'low',
  onStake,
  onUnstake,
  isStaking = false 
}) => {
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [showStakeModal, setShowStakeModal] = useState(false)
  const [showUnstakeModal, setShowUnstakeModal] = useState(false)

  const getReputationColor = () => {
    if (reputation >= 90) return 'text-green-500'
    if (reputation >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getSlashingRiskColor = () => {
    switch (slashingRisk) {
      case 'high':
        return 'text-red-500 bg-red-50 border-red-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default:
        return 'text-green-600 bg-green-50 border-green-200'
    }
  }

  const handleStake = () => {
    if (stakeAmount && onStake) {
      onStake(parseFloat(stakeAmount))
      setStakeAmount('')
      setShowStakeModal(false)
    }
  }

  const handleUnstake = () => {
    if (unstakeAmount && onUnstake) {
      onUnstake(parseFloat(unstakeAmount))
      setUnstakeAmount('')
      setShowUnstakeModal(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Verifier Stake</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getSlashingRiskColor()}`}>
          <div className="flex items-center space-x-1">
            <ExclamationTriangleIcon className="w-3 h-3" />
            <span>{slashingRisk.charAt(0).toUpperCase() + slashingRisk.slice(1)} Risk</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CurrencyDollarIcon className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600">Staked</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stakedAmount} MOCA</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <StarIcon className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">Reputation</span>
          </div>
          <p className={`text-2xl font-bold ${getReputationColor()}`}>{reputation}%</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ChartBarIcon className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Total Earnings</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalEarnings} MOCA</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ShieldCheckIcon className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-600">Verifications</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{verificationCount}</p>
        </div>
      </div>

      {/* Pending Rewards */}
      {pendingRewards > 0 && (
        <div className="bg-gradient-to-r from-primary-50 to-moca-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Rewards</p>
              <p className="text-xl font-bold text-primary-600">{pendingRewards} MOCA</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              Claim
            </motion.button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowStakeModal(true)}
          disabled={isStaking}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Stake More</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowUnstakeModal(true)}
          disabled={isStaking || stakedAmount === 0}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MinusIcon className="w-4 h-4" />
          <span>Unstake</span>
        </motion.button>
      </div>

      {/* Stake Modal */}
      {showStakeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Stake MOCA Tokens</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Stake
              </label>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowStakeModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleStake}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Stake
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Unstake Modal */}
      {showUnstakeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold mb-4">Unstake MOCA Tokens</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Unstake (Max: {stakedAmount} MOCA)
              </label>
              <input
                type="number"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                placeholder="Enter amount"
                max={stakedAmount}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowUnstakeModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUnstake}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Unstake
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default VerifierStakeCard