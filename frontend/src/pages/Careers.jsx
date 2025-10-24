import { motion } from 'framer-motion'
import { 
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  HeartIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const Careers = () => {
  const jobOpenings = [
    {
      title: "Senior Blockchain Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      salary: "$120k - $180k",
      description: "Lead the development of our core blockchain infrastructure and smart contracts.",
      requirements: ["5+ years blockchain development", "Solidity expertise", "Web3 experience"]
    },
    {
      title: "Product Manager - Identity Solutions",
      department: "Product",
      location: "Remote / New York",
      type: "Full-time", 
      salary: "$100k - $150k",
      description: "Drive product strategy for our decentralized identity platform.",
      requirements: ["3+ years product management", "Identity/security background", "User research skills"]
    },
    {
      title: "Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $140k",
      description: "Build beautiful, responsive user interfaces for our web applications.",
      requirements: ["React/Vue expertise", "Web3 integration experience", "UI/UX sensibility"]
    },
    {
      title: "Security Researcher",
      department: "Security",
      location: "Remote / London",
      type: "Full-time",
      salary: "$110k - $160k",
      description: "Research and implement cutting-edge cryptographic protocols.",
      requirements: ["Cryptography background", "Security auditing", "Research publications preferred"]
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      salary: "$95k - $145k",
      description: "Scale our infrastructure to support millions of users globally.",
      requirements: ["Kubernetes/Docker", "Cloud platforms (AWS/GCP)", "Blockchain node management"]
    },
    {
      title: "Community Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      salary: "$60k - $90k",
      description: "Build and engage our developer and user communities.",
      requirements: ["Community building experience", "Web3 knowledge", "Content creation skills"]
    }
  ]

  const benefits = [
    {
      icon: CurrencyDollarIcon,
      title: "Competitive Salary",
      description: "Market-leading compensation with equity participation"
    },
    {
      icon: HeartIcon,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance"
    },
    {
      icon: GlobeAltIcon,
      title: "Remote First",
      description: "Work from anywhere with flexible hours"
    },
    {
      icon: AcademicCapIcon,
      title: "Learning Budget",
      description: "$2,000 annual budget for conferences and courses"
    },
    {
      icon: RocketLaunchIcon,
      title: "Equity Package",
      description: "Meaningful equity stake in the company's success"
    },
    {
      icon: UserGroupIcon,
      title: "Team Retreats",
      description: "Quarterly team gatherings in amazing locations"
    }
  ]

  const culture = [
    {
      title: "Innovation First",
      description: "We encourage experimentation and bold ideas that push the boundaries of what's possible."
    },
    {
      title: "Transparency",
      description: "Open communication, shared goals, and transparent decision-making processes."
    },
    {
      title: "Work-Life Balance",
      description: "We believe great work comes from well-rested, fulfilled individuals."
    },
    {
      title: "Diversity & Inclusion",
      description: "Building a team that reflects the global community we serve."
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
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <BriefcaseIcon className="h-16 w-16 text-primary-400 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Join Our Mission
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Help us build the future of digital identity. Join a team of passionate innovators 
            working to give people control over their digital lives.
          </p>
        </div>
      </motion.section>

      {/* Culture Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Culture</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We're building more than just technology - we're creating a culture of innovation, 
              collaboration, and meaningful impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culture.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4 text-primary-400">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Benefits & Perks</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We invest in our team's success with comprehensive benefits and meaningful perks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 text-center"
              >
                <benefit.icon className="h-12 w-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Job Openings Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Open Positions</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Ready to make an impact? Explore our current openings and find your perfect role.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                    <p className="text-primary-400 font-medium">{job.department}</p>
                  </div>
                  <span className="bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-sm">
                    {job.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300">
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                    {job.salary}
                  </div>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">{job.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-white">Requirements:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {job.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-center">
                        <ShieldCheckIcon className="h-4 w-4 text-primary-400 mr-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't See Your Role?</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              We're always looking for exceptional talent. If you're passionate about decentralized 
              identity and want to make a difference, we'd love to hear from you.
            </p>
            <button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
              Send Us Your Resume
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Careers