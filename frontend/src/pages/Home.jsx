import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
import {
  ShieldCheckIcon,
  IdentificationIcon,
  DocumentCheckIcon,
  KeyIcon,
  GlobeAltIcon,
  LockClosedIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

const Home = () => {
  const { isConnected } = useAccount()

  const features = [
    {
      icon: IdentificationIcon,
      title: 'Decentralized Identity',
      description: 'Create and manage your digital identity on the blockchain with full control and ownership.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: DocumentCheckIcon,
      title: 'Verifiable Credentials',
      description: 'Issue, receive, and verify credentials that are cryptographically secure and tamper-proof.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: KeyIcon,
      title: 'Access Control',
      description: 'Manage permissions and control who can access your data with granular access controls.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Privacy First',
      description: 'Your data remains private and secure, with zero-knowledge proofs and encryption.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: GlobeAltIcon,
      title: 'Interoperable',
      description: 'Works across different platforms and services with standard protocols.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: LockClosedIcon,
      title: 'Secure by Design',
      description: 'Built on Moca Chain with enterprise-grade security and reliability.',
      color: 'from-indigo-500 to-indigo-600',
    },
  ]

  const benefits = [
    'Own your digital identity',
    'Secure credential verification',
    'Privacy-preserving authentication',
    'Interoperable across platforms',
    'Decentralized and trustless',
    'Built on Moca Chain',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-moca-50 py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Your Digital Identity,{' '}
              <span className="text-gradient">Decentralized</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Take control of your digital identity and credentials with  Veyra Vault. 
              Secure, private, and interoperable identity management on Moca Chain.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              {isConnected ? (
                <Link
                  to="/dashboard"
                  className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              ) : (
                <div className="scale-110">
                  <ConnectButton />
                </div>
              )}
              <a
                href="#features"
                className="btn-secondary text-lg px-8 py-4"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">100%</div>
                <div className="text-gray-600">Decentralized</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-moca-600">Secure</div>
                <div className="text-gray-600">By Design</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">Private</div>
                <div className="text-gray-600">Always</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Digital Identity
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your digital identity and credentials 
              in a decentralized, secure, and privacy-preserving way.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="card-hover group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Choose  Veyra Vault?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Built on the cutting-edge Moca Chain,  Veyra Vault provides 
                enterprise-grade security with user-friendly design.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500 to-moca-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                <p className="text-primary-100 mb-6">
                  Connect your wallet and start managing your digital identity today.
                </p>
                {!isConnected && (
                  <div className="scale-110">
                    <ConnectButton />
                  </div>
                )}
                {isConnected && (
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center space-x-2 bg-white text-primary-600 font-medium px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                )}
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-moca-200 rounded-full opacity-20 animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home