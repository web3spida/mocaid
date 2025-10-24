import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
  SparklesIcon
} from '@heroicons/react/24/outline'

const Rewards = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
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
            <button className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300">
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
              <button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                Get Started Now
              </button>
              <button className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300">
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
    </div>
  )
}

export default Rewards