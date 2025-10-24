import { motion } from 'framer-motion'
import { 
  TrophyIcon,
  StarIcon,
  ChartBarIcon,
  UserGroupIcon,
  FireIcon,
  CrownIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  ClockIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'
import { 
  TrophyIcon as TrophySolid,
  StarIcon as StarSolid
} from '@heroicons/react/24/solid'

const Leaderboard = () => {
  // Mock leaderboard data
  const topVerifiers = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "AC",
      verificationsCompleted: 1247,
      tokensEarned: 2847.5,
      accuracy: 98.7,
      rank: 1,
      badge: "Diamond Verifier",
      streak: 45
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "SJ",
      verificationsCompleted: 1156,
      tokensEarned: 2634.2,
      accuracy: 97.9,
      rank: 2,
      badge: "Platinum Verifier",
      streak: 32
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      avatar: "MR",
      verificationsCompleted: 1089,
      tokensEarned: 2456.8,
      accuracy: 98.1,
      rank: 3,
      badge: "Platinum Verifier",
      streak: 28
    },
    {
      id: 4,
      name: "Emily Davis",
      avatar: "ED",
      verificationsCompleted: 987,
      tokensEarned: 2234.5,
      accuracy: 96.8,
      rank: 4,
      badge: "Gold Verifier",
      streak: 21
    },
    {
      id: 5,
      name: "David Kim",
      avatar: "DK",
      verificationsCompleted: 923,
      tokensEarned: 2087.3,
      accuracy: 97.2,
      rank: 5,
      badge: "Gold Verifier",
      streak: 19
    }
  ]

  const leaderboardStats = [
    {
      title: "Total Verifiers",
      value: "12,847",
      change: "+234",
      icon: UserGroupIcon,
      color: "text-blue-600"
    },
    {
      title: "Total Verifications",
      value: "2.4M",
      change: "+15.2K",
      icon: ShieldCheckIcon,
      color: "text-green-600"
    },
    {
      title: "Tokens Distributed",
      value: "847K VYR",
      change: "+12.3K",
      icon: BanknotesIcon,
      color: "text-purple-600"
    },
    {
      title: "Average Accuracy",
      value: "97.3%",
      change: "+0.2%",
      icon: ChartBarIcon,
      color: "text-orange-600"
    }
  ]

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <TrophySolid className="w-6 h-6 text-yellow-500" />
      case 2:
        return <TrophySolid className="w-6 h-6 text-gray-400" />
      case 3:
        return <TrophySolid className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>
    }
  }

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Diamond Verifier":
        return "bg-gradient-to-r from-cyan-500 to-blue-500"
      case "Platinum Verifier":
        return "bg-gradient-to-r from-gray-400 to-gray-600"
      case "Gold Verifier":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600"
      default:
        return "bg-gradient-to-r from-green-400 to-green-600"
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
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <TrophyIcon className="w-12 h-12 text-primary-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Verifier Leaderboard
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compete with top verifiers worldwide and earn your place among the elite credential validators
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {leaderboardStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="px-6 py-4 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FireIcon className="w-6 h-6 text-orange-500 mr-2" />
              Top Verifiers This Month
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verifier
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verifications
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tokens Earned
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Accuracy
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Streak
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badge
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topVerifiers.map((verifier, index) => (
                  <motion.tr
                    key={verifier.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRankIcon(verifier.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                          {verifier.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{verifier.name}</div>
                          <div className="text-sm text-gray-500">Rank #{verifier.rank}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {verifier.verificationsCompleted.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {verifier.tokensEarned.toLocaleString()} VYR
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 mr-2">
                          {verifier.accuracy}%
                        </div>
                        {verifier.accuracy >= 98 && (
                          <StarSolid className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FireIcon className="w-4 h-4 text-orange-500 mr-1" />
                        <span className="text-sm font-medium text-gray-900">
                          {verifier.streak} days
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getBadgeColor(verifier.badge)}`}>
                        {verifier.badge}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Climb the Ranks?</h3>
            <p className="text-lg mb-6 opacity-90">
              Start verifying credentials today and earn your place on the leaderboard
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                Start Verifying
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-xl transition-all duration-300">
                View My Stats
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Leaderboard