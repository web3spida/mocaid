import { motion } from 'framer-motion'
import {
  CurrencyDollarIcon,
  TrophyIcon,
  StarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

const RewardCard = ({ 
  title, 
  amount, 
  type = 'currency', 
  description, 
  trend, 
  trendValue,
  className = '' 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'trophy':
        return <TrophyIcon className="w-6 h-6 text-yellow-500" />
      case 'star':
        return <StarIcon className="w-6 h-6 text-purple-500" />
      case 'chart':
        return <ChartBarIcon className="w-6 h-6 text-blue-500" />
      default:
        return <CurrencyDollarIcon className="w-6 h-6 text-green-500" />
    }
  }

  const getTrendColor = () => {
    if (!trend) return 'text-gray-500'
    return trend === 'up' ? 'text-green-500' : 'text-red-500'
  }

  const getTrendSymbol = () => {
    if (!trend) return ''
    return trend === 'up' ? '↗' : '↘'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between space-y-3 xs:space-y-0 mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 xs:w-12 xs:h-12 rounded-full flex items-center justify-center ${
            reward.type === 'verification' ? 'bg-green-100' :
            reward.type === 'staking' ? 'bg-blue-100' :
            'bg-purple-100'
          }`}>
            <Icon className={`w-5 h-5 xs:w-6 xs:h-6 ${
              reward.type === 'verification' ? 'text-green-600' :
              reward.type === 'staking' ? 'text-blue-600' :
              'text-purple-600'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm xs:text-base">{reward.title}</h3>
            <p className="text-xs xs:text-sm text-gray-500">{reward.description}</p>
          </div>
        </div>
        <div className="text-right xs:text-left">
          <div className="text-lg xs:text-xl font-bold text-gray-900">{reward.amount}</div>
          <div className="text-xs xs:text-sm text-gray-500">{reward.token}</div>
        </div>
      </div>
      
      {description && (
        <p className="text-sm text-gray-500 mt-4">{description}</p>
      )}
    </motion.div>
  )
}

export default RewardCard