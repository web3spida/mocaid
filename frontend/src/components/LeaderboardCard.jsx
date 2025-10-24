import { motion } from 'framer-motion'
import {
  TrophyIcon,
  StarIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

const LeaderboardCard = ({ 
  rank, 
  user, 
  score, 
  rewards, 
  verifications, 
  badge,
  isCurrentUser = false 
}) => {
  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return <TrophyIcon className="w-5 h-5 text-yellow-500" />
      case 2:
        return <TrophyIcon className="w-5 h-5 text-gray-400" />
      case 3:
        return <TrophyIcon className="w-5 h-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-gray-600">#{rank}</span>
    }
  }

  const getBadgeColor = () => {
    switch (badge) {
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'silver':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'bronze':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'verified':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg border p-4 hover:shadow-md transition-shadow duration-200 ${
        isCurrentUser ? 'border-primary-300 bg-primary-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Rank */}
          <div className="flex items-center justify-center w-8 h-8">
            {getRankIcon()}
          </div>
          
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-moca-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {user}
                {isCurrentUser && (
                  <span className="ml-2 text-xs text-primary-600 font-medium">(You)</span>
                )}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ShieldCheckIcon className="w-4 h-4" />
                <span>{verifications} verifications</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Score and Rewards */}
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-1">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span className="font-bold text-gray-900">{score}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <CurrencyDollarIcon className="w-4 h-4" />
            <span>{rewards} earned</span>
          </div>
        </div>
      </div>
      
      {/* Badge */}
      {badge && (
        <div className="mt-3 flex justify-start">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor()}`}>
            {badge.charAt(0).toUpperCase() + badge.slice(1)} Verifier
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default LeaderboardCard