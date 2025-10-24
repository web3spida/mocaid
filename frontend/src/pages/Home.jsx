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
  CubeTransparentIcon,
  BoltIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const Home = () => {
  const { isConnected } = useAccount()

  const features = [
    {
      icon: IdentificationIcon,
      title: 'Self-Sovereign Identity',
      description: 'Complete control over your digital identity with cryptographic ownership and zero-knowledge proofs.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: DocumentCheckIcon,
      title: 'Verifiable Credentials',
      description: 'Issue, manage, and verify tamper-proof credentials with instant verification and global interoperability.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: KeyIcon,
      title: 'Advanced Access Control',
      description: 'Granular permission management with role-based access and dynamic authorization protocols.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Privacy-First Architecture',
      description: 'Zero-knowledge proofs, selective disclosure, and end-to-end encryption protect your sensitive data.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: CubeTransparentIcon,
      title: 'Cross-Chain Compatibility',
      description: 'Seamless integration across multiple blockchain networks with universal identity portability.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: BoltIcon,
      title: 'Lightning Fast',
      description: 'Optimized for speed with instant verification, low-latency responses, and efficient gas usage.',
      color: 'from-indigo-500 to-indigo-600',
    },
  ]

  const benefits = [
    'True digital sovereignty',
    'Enterprise-grade security',
    'Privacy-preserving verification',
    'Universal interoperability',
    'Decentralized trust network',
    'Built on Moca Chain infrastructure',
  ]

  const stats = [
    {
      value: '10K+',
      label: 'Active Users',
      description: 'Growing community'
    },
    {
      value: '99.9%',
      label: 'Uptime',
      description: 'Reliable service'
    },
    {
      value: '50+',
      label: 'Integrations',
      description: 'Platform partners'
    },
    {
      value: '24/7',
      label: 'Support',
      description: 'Always available'
    }
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-moca-100 text-primary-700 text-sm font-medium mb-6"
            >
              <BoltIcon className="w-4 h-4 mr-2" />
              Introducing Veyra Protocol - The Future of Digital Identity
            </motion.div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Sovereign Identity for the{' '}
              <span className="text-gradient">Digital Age</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Veyra Protocol empowers individuals and organizations with self-sovereign identity solutions. 
              Secure, private, and interoperable identity management built on next-generation blockchain technology.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              {isConnected ? (
                <Link
                  to="/role-selection"
                  className="btn-primary text-lg px-10 py-4 flex items-center space-x-2 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  <span>Choose Your Role</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              ) : (
                <div className="scale-110 shadow-xl rounded-xl">
                  <ConnectButton />
                </div>
              )}
              <a
                href="#features"
                className="btn-secondary text-lg px-10 py-4 hover:bg-gray-100 transition-all duration-200"
              >
                Explore Features
              </a>
            </div>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:bg-white/70 transition-all duration-200"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-1">{stat.value}</div>
                  <div className="text-gray-900 font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Revolutionary Identity Infrastructure
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Veyra Protocol delivers cutting-edge identity solutions with enterprise-grade security, 
              privacy-first design, and seamless user experience across all platforms.
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
                  className="card-hover group p-8 rounded-2xl bg-white border border-gray-200 hover:border-primary-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
                Why Choose Veyra Protocol?
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Built on the robust Moca Chain infrastructure, Veyra Protocol combines 
                enterprise-grade security with intuitive user experience, setting new standards 
                for digital identity management.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 transition-colors duration-200"
                  >
                    <CheckCircleIcon className="w-7 h-7 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700 font-medium">{benefit}</span>
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
              <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-moca-500 rounded-3xl p-10 text-white shadow-2xl">
                <UserGroupIcon className="w-12 h-12 text-primary-100 mb-6" />
                <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Digital Identity?</h3>
                <p className="text-primary-100 mb-8 text-lg leading-relaxed">
                  Join thousands of users who trust Veyra Protocol for secure, 
                  private, and sovereign identity management.
                </p>
                {!isConnected && (
                  <div className="scale-110">
                    <ConnectButton />
                  </div>
                )}
                {isConnected && (
                  <Link
                    to="/role-selection"
                    className="inline-flex items-center space-x-3 bg-white text-primary-600 font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span>Choose Your Role</span>
                    <ArrowRightIcon className="w-6 h-6" />
                  </Link>
                )}
              </div>
              
              {/* Enhanced floating elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-moca-200 rounded-full opacity-20 animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 -right-4 w-16 h-16 bg-yellow-200 rounded-full opacity-15 animate-float" style={{ animationDelay: '4s' }}></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home