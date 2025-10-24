import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  GlobeAltIcon, 
  LightBulbIcon,
  HeartIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

const About = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      bio: "Former blockchain architect with 8+ years in decentralized identity solutions.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Sarah Rodriguez",
      role: "CTO & Co-Founder", 
      bio: "Security expert and former lead engineer at major identity verification companies.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Michael Kim",
      role: "Head of Product",
      bio: "Product strategist focused on user experience and privacy-first design.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Emily Watson",
      role: "Head of Engineering",
      bio: "Full-stack developer specializing in blockchain and cryptographic protocols.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ]

  const values = [
    {
      icon: ShieldCheckIcon,
      title: "Privacy First",
      description: "We believe privacy is a fundamental right. Our solutions are built with privacy-by-design principles."
    },
    {
      icon: UserGroupIcon,
      title: "User Empowerment",
      description: "Putting control back in users' hands with self-sovereign identity management."
    },
    {
      icon: GlobeAltIcon,
      title: "Global Accessibility",
      description: "Building inclusive solutions that work for everyone, everywhere."
    },
    {
      icon: LightBulbIcon,
      title: "Innovation",
      description: "Continuously pushing the boundaries of what's possible in digital identity."
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
            <RocketLaunchIcon className="h-16 w-16 text-primary-400 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            About Veyra Protocol
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We're building the future of digital identity - a world where individuals have complete control 
            over their personal data and credentials, powered by blockchain technology.
          </p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              To democratize digital identity by creating a decentralized, secure, and user-controlled 
              ecosystem that empowers individuals and organizations to manage their credentials with 
              complete privacy and sovereignty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
              >
                <value.icon className="h-12 w-12 text-primary-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our diverse team of experts brings together decades of experience in blockchain, 
              security, and user experience design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 text-center"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-primary-400 to-secondary-400 p-1">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
          </motion.div>

          <motion.div variants={itemVariants} className="prose prose-lg prose-invert max-w-none">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Veyra Protocol was born from a simple yet powerful realization: in our increasingly 
                digital world, individuals have lost control over their most valuable asset - their identity.
              </p>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Founded in 2024 by a team of blockchain pioneers and privacy advocates, we set out to 
                solve the fundamental problems of centralized identity systems. We envisioned a world 
                where people could prove who they are without sacrificing their privacy, where credentials 
                could be verified instantly without intermediaries, and where users truly own their digital identity.
              </p>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Today, Veyra Protocol stands at the forefront of the self-sovereign identity movement, 
                providing cutting-edge solutions that empower individuals and organizations to take 
                control of their digital presence while maintaining the highest standards of security and privacy.
              </p>

              <div className="flex items-center justify-center mt-8">
                <HeartIcon className="h-6 w-6 text-red-400 mr-2" />
                <span className="text-gray-300">Built with passion for a more private, secure digital future</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default About