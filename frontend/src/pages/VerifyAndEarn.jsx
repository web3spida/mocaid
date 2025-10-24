import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ShieldCheckIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  StarIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  GiftIcon
} from '@heroicons/react/24/outline'

const VerifyAndEarn = () => {
  const verificationOpportunities = [
    {
      title: "Identity Verification",
      description: "Verify government IDs and official documents",
      reward: "50 VYR",
      difficulty: "Easy",
      timeEstimate: "2-5 minutes",
      icon: ShieldCheckIcon,
      available: 12
    },
    {
      title: "Educational Credentials",
      description: "Verify academic degrees and certificates",
      reward: "75 VYR",
      difficulty: "Medium",
      timeEstimate: "5-10 minutes",
      icon: CheckBadgeIcon,
      available: 8
    },
    {
      title: "Professional Licenses",
      description: "Verify professional certifications and licenses",
      reward: "100 VYR",
      difficulty: "Hard",
      timeEstimate: "10-15 minutes",
      icon: TrophyIcon,
      available: 5
    }
  ]

  const recentEarnings = [
    { type: "Identity Verification", amount: "50 VYR", time: "2 hours ago" },
    { type: "Educational Credential", amount: "75 VYR", time: "5 hours ago" },
    { type: "Professional License", amount: "100 VYR", time: "1 day ago" }
  ]

  const stats = [
    { label: "Total Earned", value: "2,450 VYR", icon: CurrencyDollarIcon },
    { label: "Verifications Completed", value: "127", icon: CheckBadgeIcon },
    { label: "Success Rate", value: "98.5%", icon: StarIcon },
    { label: "Current Rank", value: "#23", icon: TrophyIcon }
  ]

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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <ShieldCheckIcon className="h-16 w-16 text-primary-400 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-400">
            Verify & Earn VYR
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join the Veyra Protocol verification network and earn VYR tokens by validating credentials. 
            Help build trust in the decentralized identity ecosystem while earning rewards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/verification/request" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-center">
              Request Verification
            </Link>
            <Link to="/verifiers" className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-center">
              Become a Verifier
            </Link>
            <Link to="/rewards" className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-center">
              View Rewards
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center"
              >
                <stat.icon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Verification Opportunities */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Available Verification Tasks</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Choose from various verification tasks based on your expertise and earn VYR tokens for each successful verification.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {verificationOpportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <opportunity.icon className="h-12 w-12 text-primary-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{opportunity.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{opportunity.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Reward:</span>
                    <span className="text-primary-400 font-semibold">{opportunity.reward}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Difficulty:</span>
                    <span className={`font-semibold ${
                      opportunity.difficulty === 'Easy' ? 'text-green-400' :
                      opportunity.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                    }`}>{opportunity.difficulty}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white">{opportunity.timeEstimate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Available:</span>
                    <span className="text-white">{opportunity.available} tasks</span>
                  </div>
                </div>

                <Link 
                  to="/verifiers"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group"
                >
                  Start Verifying
                  <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Recent Earnings */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Recent Earnings</h2>
            <p className="text-lg text-gray-300">
              Track your recent verification earnings and see your progress.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="space-y-4">
              {recentEarnings.map((earning, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-gray-700/50 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <CurrencyDollarIcon className="h-5 w-5 text-primary-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{earning.type}</div>
                      <div className="text-sm text-gray-400">{earning.time}</div>
                    </div>
                  </div>
                  <div className="text-primary-400 font-bold">+{earning.amount}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <Link 
                to="/rewards"
                className="w-full bg-gray-700/50 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group"
              >
                View All Earnings
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Verification Works</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Simple steps to start earning VYR tokens through credential verification.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="h-8 w-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">1. Become a Verifier</h3>
              <p className="text-gray-300">
                Stake VYR tokens to join the verification network and gain access to verification tasks.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="h-8 w-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">2. Verify Credentials</h3>
              <p className="text-gray-300">
                Review and validate submitted credentials using our secure verification tools.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GiftIcon className="h-8 w-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">3. Earn Rewards</h3>
              <p className="text-gray-300">
                Receive VYR tokens for each successful verification and build your reputation.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Earning?</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Join thousands of verifiers earning VYR tokens while helping build the future of decentralized identity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/verifiers"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-center"
              >
                Start Verifying Now
              </Link>
              <Link 
                to="/rewards"
                className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-center"
              >
                Learn About Rewards
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default VerifyAndEarn