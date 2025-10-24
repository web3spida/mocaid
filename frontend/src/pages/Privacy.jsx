import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
  DocumentTextIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const Privacy = () => {
  const lastUpdated = "January 15, 2025"

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This may include your name, email address, and wallet addresses."
        },
        {
          subtitle: "Usage Information", 
          text: "We automatically collect certain information about your use of our services, including your IP address, browser type, device information, and usage patterns."
        },
        {
          subtitle: "Blockchain Data",
          text: "As a blockchain-based service, certain information is recorded on public blockchains and may be publicly accessible, including transaction hashes and wallet addresses."
        }
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide, maintain, and improve our services, including identity verification, credential management, and user authentication."
        },
        {
          subtitle: "Communication",
          text: "We may use your contact information to send you service-related communications, updates, and security alerts."
        },
        {
          subtitle: "Security and Compliance",
          text: "We use your information to detect, prevent, and address fraud, security issues, and violations of our terms of service."
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      content: [
        {
          subtitle: "Third-Party Services",
          text: "We may share information with trusted third-party service providers who assist us in operating our services, subject to confidentiality agreements."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information if required by law, regulation, or legal process, or to protect the rights, property, or safety of our users or others."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      content: [
        {
          subtitle: "Encryption",
          text: "We use industry-standard encryption to protect your data both in transit and at rest, including end-to-end encryption for sensitive information."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls and authentication mechanisms to ensure only authorized personnel can access user data."
        },
        {
          subtitle: "Regular Audits",
          text: "We conduct regular security audits and assessments to identify and address potential vulnerabilities in our systems."
        }
      ]
    },
    {
      id: "user-rights",
      title: "Your Rights and Choices",
      content: [
        {
          subtitle: "Access and Correction",
          text: "You have the right to access, update, or correct your personal information. You can do this through your account settings or by contacting us."
        },
        {
          subtitle: "Data Portability",
          text: "You have the right to export your data in a machine-readable format and transfer it to another service provider."
        },
        {
          subtitle: "Deletion",
          text: "You may request deletion of your personal information, subject to certain legal and operational requirements."
        },
        {
          subtitle: "Opt-Out",
          text: "You can opt out of certain communications and data processing activities, though this may limit your ability to use some features."
        }
      ]
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      content: [
        {
          subtitle: "Essential Cookies",
          text: "We use essential cookies that are necessary for the operation of our services, including authentication and security features."
        },
        {
          subtitle: "Analytics Cookies",
          text: "We may use analytics cookies to understand how users interact with our services and improve user experience."
        },
        {
          subtitle: "Cookie Control",
          text: "You can control cookie settings through your browser preferences, though disabling certain cookies may affect service functionality."
        }
      ]
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      content: [
        {
          subtitle: "Global Operations",
          text: "As a global service, your information may be transferred to and processed in countries other than your country of residence."
        },
        {
          subtitle: "Safeguards",
          text: "We implement appropriate safeguards to ensure your information receives adequate protection regardless of where it is processed."
        }
      ]
    },
    {
      id: "children",
      title: "Children's Privacy",
      content: [
        {
          subtitle: "Age Restrictions",
          text: "Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13."
        },
        {
          subtitle: "Parental Rights",
          text: "If we become aware that we have collected information from a child under 13, we will take steps to delete such information promptly."
        }
      ]
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      content: [
        {
          subtitle: "Updates",
          text: "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website."
        },
        {
          subtitle: "Continued Use",
          text: "Your continued use of our services after any changes to this policy constitutes acceptance of the updated terms."
        }
      ]
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
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <ShieldCheckIcon className="h-16 w-16 text-primary-400 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <p className="text-xl text-gray-300 mb-4 leading-relaxed">
            Your privacy is fundamental to our mission. This policy explains how we collect, 
            use, and protect your information.
          </p>

          <div className="flex items-center justify-center text-gray-400">
            <ClockIcon className="h-5 w-5 mr-2" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </motion.section>

      {/* Table of Contents */}
      <motion.section 
        className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, index) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                className="block p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-primary-400 font-medium">
                  {index + 1}. {section.title}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Privacy Policy Content */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              variants={itemVariants}
              className="mb-16"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-3xl font-bold mb-8 text-primary-400 flex items-center">
                  <DocumentTextIcon className="h-8 w-8 mr-3" />
                  {section.title}
                </h2>
                
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Questions About Privacy?</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <UserIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Data Protection Officer</h3>
                <p className="text-gray-300 text-sm">privacy@veyra.network</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <LockClosedIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Security Team</h3>
                <p className="text-gray-300 text-sm">security@veyra.network</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <EyeSlashIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">General Inquiries</h3>
                <p className="text-gray-300 text-sm">support@veyra.network</p>
              </div>
            </div>

            <button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
              Contact Privacy Team
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Privacy