import { motion } from 'framer-motion'
import {
  TrophyIcon,
  StarIcon,
  ShieldCheckIcon,
  FireIcon,
  BoltIcon,
} from '@heroicons/react/24/outline'
import {
  TrophyIcon as TrophyIconSolid,
  StarIcon as StarIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  FireIcon as FireIconSolid,
  BoltIcon as BoltIconSolid,
} from '@heroicons/react/24/solid'

const BadgeDisplay = ({ badges = [], size = 'medium', showTooltip = true }) => {
  const getBadgeConfig = (badge) => {
    const configs = {
      'first-verification': {
        name: 'First Verification',
        description: 'Completed your first credential verification',
        icon: ShieldCheckIcon,
        solidIcon: ShieldCheckIconSolid,
        color: 'text-blue-500',
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-200',
      },
      'top-verifier': {
        name: 'Top Verifier',
        description: 'Ranked in top 10 verifiers this month',
        icon: TrophyIcon,
        solidIcon: TrophyIconSolid,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-100',
        borderColor: 'border-yellow-200',
      },
      'streak-master': {
        name: 'Streak Master',
        description: 'Verified credentials for 7 consecutive days',
        icon: FireIcon,
        solidIcon: FireIconSolid,
        color: 'text-red-500',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-200',
      },
      'speed-verifier': {
        name: 'Speed Verifier',
        description: 'Completed 10 verifications in under 1 hour',
        icon: BoltIcon,
        solidIcon: BoltIconSolid,
        color: 'text-purple-500',
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-200',
      },
      'reputation-star': {
        name: 'Reputation Star',
        description: 'Maintained 95%+ reputation score for 30 days',
        icon: StarIcon,
        solidIcon: StarIconSolid,
        color: 'text-pink-500',
        bgColor: 'bg-pink-100',
        borderColor: 'border-pink-200',
      },
      'verification-king': {
        name: 'Verification King',
        description: 'Completed over 1000 verifications',
        icon: TrophyIcon,
        solidIcon: TrophyIconSolid,
        color: 'text-amber-500',
        bgColor: 'bg-amber-100',
        borderColor: 'border-amber-200',
      },
    }
    
    return configs[badge.type] || {
      name: badge.name || 'Unknown Badge',
      description: badge.description || 'Achievement unlocked',
      icon: StarIcon,
      solidIcon: StarIconSolid,
      color: 'text-gray-500',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-200',
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'w-8 h-8',
          icon: 'w-4 h-4',
          text: 'text-xs',
        }
      case 'large':
        return {
          container: 'w-16 h-16',
          icon: 'w-8 h-8',
          text: 'text-sm',
        }
      default:
        return {
          container: 'w-12 h-12',
          icon: 'w-6 h-6',
          text: 'text-sm',
        }
    }
  }

  const sizeClasses = getSizeClasses()

  if (!badges.length) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <TrophyIcon className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-sm">No badges earned yet</p>
        <p className="text-gray-400 text-xs mt-1">Start verifying to earn your first badge!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-3">
      {badges.map((badge, index) => {
        const config = getBadgeConfig(badge)
        const Icon = badge.earned ? config.solidIcon : config.icon
        
        return (
          <motion.div
            key={`${badge.type}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="relative group"
          >
            <div
              className={`
                ${sizeClasses.container} 
                ${config.bgColor} 
                ${config.borderColor} 
                border-2 rounded-full flex items-center justify-center
                ${badge.earned ? 'opacity-100' : 'opacity-50 grayscale'}
                transition-all duration-200
              `}
            >
              <Icon className={`${sizeClasses.icon} ${config.color}`} />
            </div>
            
            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
                  <div className="font-medium">{config.name}</div>
                  <div className="text-gray-300 mt-1">{config.description}</div>
                  {badge.earnedAt && (
                    <div className="text-gray-400 text-xs mt-1">
                      Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                    </div>
                  )}
                  {!badge.earned && (
                    <div className="text-yellow-400 text-xs mt-1">
                      Progress: {badge.progress || 0}%
                    </div>
                  )}
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            )}
            
            {/* Progress indicator for unearned badges */}
            {!badge.earned && badge.progress && (
              <div className="absolute inset-0 rounded-full">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${badge.progress * 2.83} 283`}
                    className={config.color}
                    opacity="0.3"
                  />
                </svg>
              </div>
            )}
            
            {/* New badge indicator */}
            {badge.isNew && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default BadgeDisplay