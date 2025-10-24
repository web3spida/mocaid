import { motion } from 'framer-motion'
import { 
  IdentificationIcon,
  ShieldCheckIcon,
  DocumentCheckIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ClockIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
  LockClosedIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline'

const Credentials = () => {
  const credentialTypes = [
    {
      icon: IdentificationIcon,
      title: "Identity Credentials",
      description: "Government-issued IDs, passports, and official identity documents verified through our secure blockchain network.",
      features: ["Government ID Verification", "Passport Authentication", "Biometric Matching", "Real-time Validation"]
    },
    {
      icon: AcademicCapIcon,
      title: "Educational Credentials",
      description: "Academic degrees, certificates, and professional qualifications from accredited institutions worldwide.",
      features: ["Degree Verification", "Certificate Validation", "Institution Authentication", "Skill Certification"]
    },
    {
      icon: BriefcaseIcon,
      title: "Professional Credentials",
      description: "Work experience, professional licenses, and industry certifications verified by employers and organizations.",
      features: ["Employment History", "Professional Licenses", "Industry Certifications", "Skill Endorsements"]
    },
    {
      icon: ShieldCheckIcon,
      title: "Security Credentials",
      description: "Security clearances, background checks, and compliance certifications for sensitive roles and industries.",
      features: ["Background Verification", "Security Clearances", "Compliance Certificates", "Risk Assessment"]
    }
  ]

  const issuanceProcess = [
    {
      step: 1,
      title: "Document Submission",
      description: "Upload your documents through our secure portal with end-to-end encryption.",
      icon: CloudArrowUpIcon
    },
    {
      step: 2,
      title: "Verification Process",
      description: "Our AI-powered system and human experts verify the authenticity of your documents.",
      icon: DocumentCheckIcon
    },
    {
      step: 3,
      title: "Blockchain Recording",
      description: "Verified credentials are securely recorded on the blockchain with cryptographic proof.",
      icon: LockClosedIcon
    },
    {
      step: 4,
      title: "Credential Issuance",
      description: "Receive your digital credential that can be instantly verified by any authorized party.",
      icon: CheckBadgeIcon
    }
  ]

  const benefits = [
    {
      title: "Instant Verification",
      description: "Credentials can be verified in seconds, eliminating lengthy background check processes.",
      icon: ClockIcon
    },
    {
      title: "Global Acceptance",
      description: "Our credentials are recognized worldwide by participating institutions and employers.",
      icon: GlobeAltIcon
    },
    {
      title: "Privacy Protection",
      description: "You control who can access your credentials and what information is shared.",
      icon: ShieldCheckIcon
    },
    {
      title: "Fraud Prevention",
      description: "Blockchain technology makes credential forgery virtually impossible.",
      icon: LockClosedIcon
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
            <IdentificationIcon className="h-16 w-16 text-primary-400 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Digital Credentials
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Secure, verifiable, and instantly accessible digital credentials powered by blockchain technology. 
            Transform how you prove your identity, education, and professional qualifications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
              Get Your Credentials
            </button>
            <button className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </motion.section>

      {/* Credential Types */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Credential Types</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We support a wide range of credential types, each verified through our rigorous 
              authentication process and secured on the blockchain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {credentialTypes.map((type, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <type.icon className="h-12 w-12 text-primary-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{type.description}</p>
                
                <div className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-400">
                      <CheckBadgeIcon className="h-4 w-4 text-primary-400 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Issuance Process */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our streamlined process ensures your credentials are verified quickly and securely, 
              giving you instant access to trusted digital certificates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {issuanceProcess.map((step, index) => (
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
                  {index < issuanceProcess.length - 1 && (
                    <ArrowRightIcon className="hidden lg:block absolute top-8 -right-12 h-6 w-6 text-gray-500" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Digital Credentials?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Experience the future of credential verification with benefits that traditional 
              paper-based systems simply cannot match.
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
                <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Statistics */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted Globally</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Join thousands of individuals and organizations who trust Veyra Protocol 
              for their credential management needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">50K+</div>
              <div className="text-gray-300">Credentials Issued</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">500+</div>
              <div className="text-gray-300">Partner Institutions</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">99.9%</div>
              <div className="text-gray-300">Verification Accuracy</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">24/7</div>
              <div className="text-gray-300">Global Availability</div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Transform your credentials into secure, verifiable digital assets. 
              Join the future of identity verification today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                Start Verification Process
              </button>
              <button className="border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300">
                Contact Sales Team
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <UserGroupIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">For Individuals</h3>
                <p className="text-gray-300 text-sm">Get your personal credentials verified and digitized</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <BriefcaseIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">For Employers</h3>
                <p className="text-gray-300 text-sm">Streamline your hiring process with instant verification</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <AcademicCapIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">For Institutions</h3>
                <p className="text-gray-300 text-sm">Issue tamper-proof digital credentials to your students</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Credentials