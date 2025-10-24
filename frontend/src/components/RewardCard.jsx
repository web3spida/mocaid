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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{amount}</p>
          </div>
        </div>
        
        {trend && trendValue && (
          <div className={`flex items-center space-x-1 text-sm ${getTrendColor()}`}>
            <span>{getTrendSymbol()}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-sm text-gray-500 mt-4">{description}</p>
      )}
    </motion.div>
  )
}

export default RewardCard