import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ShieldCheckIcon,
  UserGroupIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  LockClosedIcon,
  ClockIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  BanknotesIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  HandRaisedIcon,
  XMarkIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const Verifiers = () => {
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [applicationForm, setApplicationForm] = useState({
    organizationName: '',
    organizationType: '',
    contactEmail: '',
    website: '',
    description: '',
    verificationTypes: []
  })
  
  const handleApplicationSubmit = (e) => {
    e.preventDefault()
    
    // Basic form validation
    if (!applicationForm.organizationName || !applicationForm.contactEmail || !applicationForm.organizationType) {
      alert('Please fill in all required fields')
      return
    }
    
    // Here you would typically send the application to your backend
    console.log('Verifier application submitted:', applicationForm)
    
    // Show success message
    alert('Application submitted successfully! We will review your application and contact you within 5-7 business days.')
    
    // Reset form and close modal
    setApplicationForm({
      organizationName: '',
      organizationType: '',
      contactEmail: '',
      website: '',
      description: '',
      verificationTypes: []
    })
    setShowApplicationModal(false)
  }

  const verifierTypes = [
    {
      icon: BuildingOfficeIcon,
      title: "Corporate Verifiers",
      description: "Large enterprises and corporations that verify employee credentials and professional qualifications.",
      examples: ["Fortune 500 Companies", "Multinational Corporations", "Government Agencies", "Healthcare Systems"],
      rewards: "Up to 0.5 MOCA per verification"
    },
    {
      icon: AcademicCapIcon,
      title: "Educational Institutions",
      description: "Universities, colleges, and educational organizations that verify academic credentials and degrees.",
      examples: ["Universities", "Community Colleges", "Certification Bodies", "Training Institutes"],
      rewards: "Up to 0.3 MOCA per verification"
    },
    {
      icon: ShieldCheckIcon,
      title: "Professional Bodies",
      description: "Industry associations and professional organizations that verify licenses and certifications.",
      examples: ["Medical Boards", "Legal Associations", "Engineering Bodies", "Financial Institutions"],
      rewards: "Up to 0.4 MOCA per verification"
    },
    {
      icon: GlobeAltIcon,
      title: "Government Entities",
      description: "Government departments and agencies that verify official documents and identity credentials.",
      examples: ["Immigration Services", "Tax Authorities", "Licensing Departments", "Registry Offices"],
      rewards: "Up to 0.6 MOCA per verification"
    }
  ]

  const benefits = [
    {
      icon: CurrencyDollarIcon,
      title: "Earn MOCA Tokens",
      description: "Receive MOCA tokens for each successful verification you perform on the network.",
      value: "0.1 - 0.6 MOCA per verification"
    },
    {
      icon: ChartBarIcon,
      title: "Performance Bonuses",
      description: "Additional rewards based on verification accuracy, speed, and volume.",
      value: "Up to 50% bonus rewards"
    },
    {
      icon: TrophyIcon,
      title: "Reputation System",
      description: "Build your reputation score and unlock higher-tier verification opportunities.",
      value: "Tier-based multipliers"
    },
    {
      icon: UserGroupIcon,
      title: "Network Access",
      description: "Join an exclusive network of trusted verifiers and access premium features.",
      value: "Exclusive verifier tools"
    }
  ]

  const requirements = [
    {
      title: "Institutional Credibility",
      description: "Must be a recognized institution, organization, or certified professional body.",
      icon: BuildingOfficeIcon
    },
    {
      title: "Verification Expertise",
      description: "Demonstrated experience in document verification and identity validation processes.",
      icon: CheckBadgeIcon
    },
    {
      title: "Security Standards",
      description: "Compliance with industry security standards and data protection regulations.",
      icon: LockClosedIcon
    },
    {
      title: "Technical Infrastructure",
      description: "Adequate technical infrastructure to handle verification requests efficiently.",
      icon: GlobeAltIcon
    }
  ]

  const stats = [
    { label: "Active Verifiers", value: "2,500+", icon: UserGroupIcon },
    { label: "Verifications Completed", value: "1.2M+", icon: CheckBadgeIcon },
    { label: "Countries Covered", value: "150+", icon: GlobeAltIcon },
    { label: "Average Response Time", value: "< 2 hours", icon: ClockIcon }
  ]

  const process = [
    {
      step: 1,
      title: "Application Submission",
      description: "Submit your verifier application with required documentation and credentials.",
      icon: HandRaisedIcon
    },
    {
      step: 2,
      title: "Due Diligence Review",
      description: "Our team conducts a thorough review of your organization and capabilities.",
      icon: ShieldCheckIcon
    },
    {
      step: 3,
      title: "Technical Integration",
      description: "Complete the technical integration and testing process with our platform.",
      icon: GlobeAltIcon
    },
    {
      step: 4,
      title: "Network Activation",
      description: "Begin receiving verification requests and earning rewards on the network.",
      icon: ArrowTrendingUpIcon
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
            <UserGroupIcon className="h-16 w-16 text-primary-400 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Professional Verifier Network
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join our global network of trusted verifiers and earn MOCA rewards while helping to build 
            the future of decentralized identity verification on Moca Chain.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={() => setShowApplicationModal(true)}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Become a Verifier
            </button>
            <button 
              onClick={() => document.getElementById('verifier-types').scrollIntoView({ behavior: 'smooth' })}
              className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
            >
              Learn More
            </button>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link 
              to="/verify-and-earn" 
              className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-lg transition-colors"
            >
              <BanknotesIcon className="w-4 h-4" />
              <span>Start Verifying</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link 
              to="/rewards" 
              className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-lg transition-colors"
            >
              <TrophyIcon className="w-4 h-4" />
              <span>View Rewards</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Network Statistics */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Network at a Glance</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our verifier network spans the globe, providing fast and reliable credential 
              verification services 24/7.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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

      {/* Verifier Types */}
      <motion.section 
        id="verifier-types"
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Types of Verifiers</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our network includes various types of trusted institutions and organizations, 
              each specializing in different types of credential verification.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {verifierTypes.map((type, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <type.icon className="h-12 w-12 text-primary-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{type.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary-400 mb-3">Examples:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {type.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="text-sm text-gray-400 flex items-center">
                        <CheckBadgeIcon className="h-3 w-3 text-primary-400 mr-2 flex-shrink-0" />
                        {example}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary-500/10 rounded-lg p-3 border border-primary-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Reward Range:</span>
                    <span className="text-sm font-semibold text-primary-400">{type.rewards}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Verifier Benefits</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Join our network and enjoy multiple benefits including token rewards, 
              reputation building, and access to exclusive features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center hover:border-primary-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <benefit.icon className="h-12 w-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{benefit.description}</p>
                <div className="bg-primary-500/10 rounded-lg p-2 border border-primary-500/30">
                  <span className="text-primary-400 font-semibold text-sm">{benefit.value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Requirements */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Verifier Requirements</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              To maintain the integrity of our network, we have specific requirements 
              that all verifiers must meet before joining.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requirements.map((requirement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 flex items-start"
              >
                <requirement.icon className="h-8 w-8 text-primary-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-3">{requirement.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{requirement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Application Process */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How to Become a Verifier</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our streamlined application process ensures qualified organizations can 
              quickly join our verifier network and start earning rewards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary-400 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Network?</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Become part of the world's most trusted decentralized verification network. 
              Start earning rewards while contributing to a more secure digital future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={() => setShowApplicationModal(true)}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Apply to Become a Verifier
              </button>
              <a 
                href="/verifier-guide.pdf" 
                download
                className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-center"
              >
                Download Verifier Guide
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <BanknotesIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Earn While You Verify</h3>
                <p className="text-gray-300 text-sm">Generate revenue through verification services</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <ShieldCheckIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Build Trust</h3>
                <p className="text-gray-300 text-sm">Enhance your organization's reputation and credibility</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <GlobeAltIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Global Reach</h3>
                <p className="text-gray-300 text-sm">Access verification requests from around the world</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Verifier Application</h3>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Organization Name</label>
                <input
                  type="text"
                  value={applicationForm.organizationName}
                  onChange={(e) => setApplicationForm({...applicationForm, organizationName: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                  placeholder="Enter your organization name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Organization Type</label>
                <select
                  value={applicationForm.organizationType}
                  onChange={(e) => setApplicationForm({...applicationForm, organizationType: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                >
                  <option value="">Select organization type</option>
                  <option value="corporate">Corporate</option>
                  <option value="educational">Educational Institution</option>
                  <option value="professional">Professional Body</option>
                  <option value="government">Government Entity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <input
                  type="email"
                  value={applicationForm.contactEmail}
                  onChange={(e) => setApplicationForm({...applicationForm, contactEmail: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                  placeholder="contact@organization.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <input
                  type="url"
                  value={applicationForm.website}
                  onChange={(e) => setApplicationForm({...applicationForm, website: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                  placeholder="https://www.organization.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={applicationForm.description}
                  onChange={(e) => setApplicationForm({...applicationForm, description: e.target.value})}
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none"
                  placeholder="Describe your organization and verification capabilities..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Verifiers