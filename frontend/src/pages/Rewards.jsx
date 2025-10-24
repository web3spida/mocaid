import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { 
  CurrencyDollarIcon,
  TrophyIcon,
  ChartBarIcon,
  GiftIcon,
  StarIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ClockIcon,
  FireIcon,
  LockClosedIcon,
  CheckBadgeIcon,
  CubeIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const Rewards = () => {
  const [showTokenDetails, setShowTokenDetails] = useState(false)
  const [showTokenomics, setShowTokenomics] = useState(false)
  const rewardCategories = [
    {
      icon: CheckBadgeIcon,
      title: "Verification Rewards",
      description: "Earn VYR tokens for each successful credential verification you complete on the platform.",
      baseReward: "0.1 - 0.6 VYR",
      multiplier: "Up to 2x with reputation",
      activities: ["Identity Verification", "Document Authentication", "Credential Validation", "Background Checks"]
    },
    {
      icon: UserGroupIcon,
      title: "Referral Rewards",
      description: "Get rewarded for bringing new users and verifiers to the Veyra Protocol ecosystem.",
      baseReward: "5 - 50 VYR",
      multiplier: "Lifetime 10% commission",
      activities: ["User Referrals", "Verifier Onboarding", "Institution Partnerships", "Community Growth"]
    },
    {
      icon: LockClosedIcon,
      title: "Staking Rewards",
      description: "Stake your VYR tokens to earn passive income and participate in network governance.",
      baseReward: "8-15% APY",
      multiplier: "Bonus for long-term staking",
      activities: ["Token Staking", "Governance Voting", "Network Security", "Liquidity Provision"]
    },
    {
      icon: TrophyIcon,
      title: "Achievement Rewards",
      description: "Unlock special rewards by completing milestones and achieving platform goals.",
      baseReward: "10 - 500 VYR",
      multiplier: "Rare NFT rewards",
      activities: ["Milestone Completion", "Streak Bonuses", "Special Events", "Community Challenges"]
    }
  ]

  const tokenUtility = [
    {
      icon: CurrencyDollarIcon,
      title: "Payment for Services",
      description: "Use VYR tokens to pay for premium verification services and advanced features."
    },
    {
      icon: ShieldCheckIcon,
      title: "Governance Rights",
      description: "Participate in protocol governance and vote on important network decisions."
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "Staking Benefits",
      description: "Stake tokens to earn passive income and access exclusive platform features."
    },
    {
      icon: GiftIcon,
      title: "Premium Access",
      description: "Unlock premium features, priority support, and exclusive platform benefits."
    }
  ]

  const stakingTiers = [
    {
      name: "Bronze",
      minStake: "100 VYR",
      apy: "8%",
      benefits: ["Basic staking rewards", "Community access", "Monthly reports"],
      color: "from-amber-600 to-amber-800"
    },
    {
      name: "Silver",
      minStake: "1,000 VYR",
      apy: "10%",
      benefits: ["Enhanced rewards", "Priority support", "Governance voting", "Quarterly bonuses"],
      color: "from-gray-400 to-gray-600"
    },
    {
      name: "Gold",
      minStake: "5,000 VYR",
      apy: "12%",
      benefits: ["Premium rewards", "VIP support", "Advanced analytics", "Exclusive events"],
      color: "from-yellow-400 to-yellow-600"
    },
    {
      name: "Platinum",
      minStake: "25,000 VYR",
      apy: "15%",
      benefits: ["Maximum rewards", "Personal account manager", "Beta access", "Custom solutions"],
      color: "from-purple-400 to-purple-600"
    }
  ]

  const rewardStats = [
    { label: "Total Rewards Distributed", value: "2.5M VYR", icon: BanknotesIcon },
    { label: "Active Reward Earners", value: "15,000+", icon: UserGroupIcon },
    { label: "Average Monthly Earnings", value: "125 VYR", icon: ChartBarIcon },
    { label: "Highest Single Reward", value: "10,000 VYR", icon: TrophyIcon }
  ]

  const earningTips = [
    {
      title: "Complete Your Profile",
      description: "Fully verified profiles earn 25% more rewards on average.",
      bonus: "+25% rewards",
      icon: CheckBadgeIcon
    },
    {
      title: "Maintain High Accuracy",
      description: "Keep your verification accuracy above 95% for bonus multipliers.",
      bonus: "Up to 2x multiplier",
      icon: StarIcon
    },
    {
      title: "Refer New Users",
      description: "Earn ongoing commissions from users you refer to the platform.",
      bonus: "10% lifetime commission",
      icon: UserGroupIcon
    },
    {
      title: "Participate in Events",
      description: "Join special events and challenges for bonus reward opportunities.",
      bonus: "Up to 500 VYR",
      icon: SparklesIcon
    }
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
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <TrophyIcon className="h-16 w-16 text-primary-400 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            VYR Rewards
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Earn VYR tokens through verification activities, referrals, staking, and achievements. 
            Join the most rewarding decentralized identity ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/verify-and-earn" className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-center">
              Start Earning VYR
            </Link>
            <button 
              onClick={() => setShowTokenDetails(true)}
              className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
            >
              View Token Details
            </button>
          </div>
        </div>
      </motion.section>

      {/* Reward Statistics */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Reward Ecosystem</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our thriving reward ecosystem has distributed millions of VYR tokens to 
              thousands of active participants worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {rewardStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
              >
                <stat.icon className="h-12 w-12 text-primary-400 mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Reward Categories */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ways to Earn VYR</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Multiple earning opportunities await you in the Veyra Protocol ecosystem. 
              Choose the methods that best fit your skills and interests.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rewardCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <category.icon className="h-12 w-12 text-primary-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{category.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary-500/10 rounded-lg p-3 border border-primary-500/30">
                    <div className="text-xs text-gray-400 mb-1">Base Reward</div>
                    <div className="text-primary-400 font-semibold">{category.baseReward}</div>
                  </div>
                  <div className="bg-secondary-500/10 rounded-lg p-3 border border-secondary-500/30">
                    <div className="text-xs text-gray-400 mb-1">Multiplier</div>
                    <div className="text-secondary-400 font-semibold">{category.multiplier}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {category.activities.map((activity, activityIndex) => (
                    <div key={activityIndex} className="flex items-center text-sm text-gray-400">
                      <CheckBadgeIcon className="h-4 w-4 text-primary-400 mr-2" />
                      {activity}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Staking Tiers */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Staking Tiers</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Stake your VYR tokens to earn passive income and unlock exclusive benefits. 
              Higher stakes unlock better rewards and premium features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stakingTiers.map((tier, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`bg-gradient-to-r ${tier.color} rounded-lg p-4 mb-6 text-center`}>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold text-white">{tier.apy}</div>
                  <div className="text-sm text-white/80">APY</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-1">Minimum Stake</div>
                  <div className="text-lg font-semibold text-primary-400">{tier.minStake}</div>
                </div>

                <div className="space-y-2">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center text-sm text-gray-300">
                      <CheckBadgeIcon className="h-4 w-4 text-primary-400 mr-2 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Token Utility */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">VYR Token Utility</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              VYR tokens power the entire Veyra Protocol ecosystem, providing multiple 
              use cases and benefits for token holders.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tokenUtility.map((utility, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center hover:border-primary-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <utility.icon className="h-12 w-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">{utility.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{utility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Earning Tips */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Maximize Your Earnings</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Follow these tips to maximize your VYR token earnings and unlock 
              the full potential of the reward system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {earningTips.map((tip, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 flex items-start"
              >
                <tip.icon className="h-8 w-8 text-primary-400 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
                  <p className="text-gray-300 mb-3 leading-relaxed">{tip.description}</p>
                  <div className="bg-primary-500/10 rounded-lg p-2 border border-primary-500/30 inline-block">
                    <span className="text-primary-400 font-semibold text-sm">{tip.bonus}</span>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Earning VYR Today</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Join thousands of users who are already earning VYR tokens through 
              verification activities, referrals, and staking rewards.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/verify-and-earn"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started Now
              </Link>
              <button 
                onClick={() => setShowTokenomics(true)}
                className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
              >
                View Tokenomics
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <FireIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Instant Rewards</h3>
                <p className="text-gray-300 text-sm">Start earning VYR tokens immediately upon verification</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <CubeIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Blockchain Secured</h3>
                <p className="text-gray-300 text-sm">All rewards are secured on the blockchain</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <ArrowTrendingUpIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Growing Value</h3>
                <p className="text-gray-300 text-sm">Benefit from the growing Veyra Protocol ecosystem</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Token Details Modal */}
      {showTokenDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">VYR Token Details</h3>
              <button
                onClick={() => setShowTokenDetails(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6 text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-white mb-3">Token Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="text-white">Veyra Token</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Symbol:</span>
                      <span className="text-white">VYR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Decimals:</span>
                      <span className="text-white">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network:</span>
                      <span className="text-white">Moca Chain</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-white mb-3">Current Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Supply:</span>
                      <span className="text-white">1,000,000,000 VYR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Circulating:</span>
                      <span className="text-white">250,000,000 VYR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Cap:</span>
                      <span className="text-white">$12.5M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="text-white">$0.05</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Utility & Use Cases</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Earn rewards for credential verification activities</li>
                  <li>Stake tokens to become a network verifier</li>
                  <li>Pay for premium verification services</li>
                  <li>Governance voting on protocol upgrades</li>
                  <li>Access exclusive features and benefits</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">How to Earn VYR</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Complete identity verification processes</li>
                  <li>Refer new users to the platform</li>
                  <li>Participate in verification activities</li>
                  <li>Stake tokens as a verifier</li>
                  <li>Contribute to protocol governance</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <Link
                to="/verify-and-earn"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex-1 text-center"
                onClick={() => setShowTokenDetails(false)}
              >
                Start Earning
              </Link>
              <button
                onClick={() => setShowTokenDetails(false)}
                className="border border-gray-600 text-gray-300 hover:bg-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tokenomics Modal */}
      {showTokenomics && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">VYR Tokenomics</h3>
              <button
                onClick={() => setShowTokenomics(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6 text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-white mb-4">Token Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Community Rewards</span>
                      <span className="text-white font-semibold">40%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{width: '40%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Team & Advisors</span>
                      <span className="text-white font-semibold">20%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-secondary-500 h-2 rounded-full" style={{width: '20%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Development Fund</span>
                      <span className="text-white font-semibold">15%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '15%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Public Sale</span>
                      <span className="text-white font-semibold">15%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '15%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Ecosystem Fund</span>
                      <span className="text-white font-semibold">10%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '10%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-white mb-4">Reward Mechanisms</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-white mb-2">Verification Rewards</h5>
                      <p className="text-sm">Earn 10-50 VYR per successful credential verification</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Staking Rewards</h5>
                      <p className="text-sm">12% APY for verifier staking, 8% APY for general staking</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Referral Bonuses</h5>
                      <p className="text-sm">100 VYR for each successful referral</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-2">Governance Participation</h5>
                      <p className="text-sm">Bonus rewards for active governance participation</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <h4 className="text-lg font-semibold text-white mb-4">Vesting Schedule</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-400 mb-2">25%</div>
                    <div className="text-sm">At TGE</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-400 mb-2">50%</div>
                    <div className="text-sm">6 Months</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-2">25%</div>
                    <div className="text-sm">12 Months</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <Link
                to="/verify-and-earn"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex-1 text-center"
                onClick={() => setShowTokenomics(false)}
              >
                Start Earning VYR
              </Link>
              <button
                onClick={() => setShowTokenomics(false)}
                className="border border-gray-600 text-gray-300 hover:bg-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Rewards