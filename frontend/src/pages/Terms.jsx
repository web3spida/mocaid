import { motion } from 'framer-motion'
import { 
  DocumentTextIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  ShieldCheckIcon,
  ClockIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const Terms = () => {
  const lastUpdated = "January 15, 2025"

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing or using Veyra Protocol's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services."
        },
        {
          subtitle: "Legal Capacity",
          text: "You represent that you are at least 18 years old and have the legal capacity to enter into this agreement. If you are using our services on behalf of an organization, you represent that you have the authority to bind that organization to these terms."
        }
      ]
    },
    {
      id: "service-description",
      title: "Service Description",
      content: [
        {
          subtitle: "Veyra Protocol Services",
          text: "Veyra Protocol provides decentralized identity management services, including but not limited to identity verification, credential issuance and verification, and access control management through blockchain technology."
        },
        {
          subtitle: "Service Availability",
          text: "We strive to maintain high service availability but do not guarantee uninterrupted access. Services may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control."
        },
        {
          subtitle: "Service Modifications",
          text: "We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, with or without notice, though we will make reasonable efforts to provide advance notice of significant changes."
        }
      ]
    },
    {
      id: "user-obligations",
      title: "User Obligations and Conduct",
      content: [
        {
          subtitle: "Acceptable Use",
          text: "You agree to use our services only for lawful purposes and in accordance with these terms. You must not use our services to engage in any illegal, harmful, or abusive activities."
        },
        {
          subtitle: "Account Security",
          text: "You are responsible for maintaining the security of your account credentials, including private keys and passwords. You must notify us immediately of any unauthorized access to your account."
        },
        {
          subtitle: "Prohibited Activities",
          text: "You must not attempt to hack, reverse engineer, or compromise our systems; impersonate others; distribute malware; or engage in any activity that could harm our services or other users."
        },
        {
          subtitle: "Compliance",
          text: "You agree to comply with all applicable laws and regulations in your use of our services, including but not limited to data protection, privacy, and financial regulations."
        }
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      content: [
        {
          subtitle: "Our Rights",
          text: "Veyra Protocol and its licensors own all rights, title, and interest in and to the services, including all intellectual property rights. These terms do not grant you any ownership rights in our services."
        },
        {
          subtitle: "User Content",
          text: "You retain ownership of any content you submit to our services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute such content as necessary to provide our services."
        },
        {
          subtitle: "Trademark Policy",
          text: "Veyra Protocol, our logos, and other trademarks are the property of Veyra Protocol. You may not use our trademarks without our prior written consent."
        }
      ]
    },
    {
      id: "privacy-data",
      title: "Privacy and Data Protection",
      content: [
        {
          subtitle: "Privacy Policy",
          text: "Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these terms by reference."
        },
        {
          subtitle: "Data Processing",
          text: "By using our services, you consent to the processing of your data as described in our Privacy Policy and as necessary to provide our services."
        },
        {
          subtitle: "Blockchain Data",
          text: "You understand that certain information may be recorded on public blockchains and may be permanently accessible to third parties."
        }
      ]
    },
    {
      id: "fees-payments",
      title: "Fees and Payments",
      content: [
        {
          subtitle: "Service Fees",
          text: "Some of our services may require payment of fees. All fees are non-refundable unless otherwise specified. We reserve the right to change our fee structure with reasonable notice."
        },
        {
          subtitle: "Blockchain Costs",
          text: "You are responsible for any blockchain transaction fees (gas fees) associated with your use of our services. These fees are paid directly to the blockchain network and are not controlled by us."
        },
        {
          subtitle: "Payment Methods",
          text: "We may accept various payment methods, including cryptocurrency and traditional payment methods. All payments must be made in accordance with the terms specified at the time of transaction."
        }
      ]
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations",
      content: [
        {
          subtitle: "Service Warranty",
          text: "Our services are provided 'as is' and 'as available' without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement."
        },
        {
          subtitle: "Blockchain Risks",
          text: "You acknowledge that blockchain technology involves inherent risks, including but not limited to the risk of loss of private keys, smart contract vulnerabilities, and network congestion."
        },
        {
          subtitle: "Third-Party Services",
          text: "Our services may integrate with third-party services. We are not responsible for the availability, accuracy, or reliability of third-party services."
        }
      ]
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content: [
        {
          subtitle: "Damages Limitation",
          text: "To the maximum extent permitted by law, Veyra Protocol shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use."
        },
        {
          subtitle: "Maximum Liability",
          text: "Our total liability to you for all claims arising from or relating to these terms or our services shall not exceed the amount you have paid us in the twelve months preceding the claim."
        },
        {
          subtitle: "Force Majeure",
          text: "We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, or government actions."
        }
      ]
    },
    {
      id: "termination",
      title: "Termination",
      content: [
        {
          subtitle: "Termination by You",
          text: "You may terminate your account at any time by following the account closure procedures in our services or by contacting us directly."
        },
        {
          subtitle: "Termination by Us",
          text: "We may terminate or suspend your access to our services at any time, with or without cause, with or without notice, though we will make reasonable efforts to provide notice when practicable."
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination, your right to use our services will cease immediately. Provisions that by their nature should survive termination will remain in effect after termination."
        }
      ]
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      content: [
        {
          subtitle: "Governing Law",
          text: "These terms are governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law principles."
        },
        {
          subtitle: "Dispute Resolution",
          text: "Any disputes arising from these terms or our services shall be resolved through binding arbitration in accordance with the rules of [Arbitration Organization]."
        },
        {
          subtitle: "Class Action Waiver",
          text: "You agree that any arbitration or legal proceeding shall be limited to the dispute between you and us individually. You waive any right to participate in class action lawsuits or class-wide arbitrations."
        }
      ]
    },
    {
      id: "general",
      title: "General Provisions",
      content: [
        {
          subtitle: "Entire Agreement",
          text: "These terms, together with our Privacy Policy and any other legal notices published by us, constitute the entire agreement between you and us regarding our services."
        },
        {
          subtitle: "Severability",
          text: "If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full force and effect."
        },
        {
          subtitle: "Assignment",
          text: "You may not assign or transfer your rights under these terms without our prior written consent. We may assign our rights and obligations under these terms without restriction."
        },
        {
          subtitle: "Updates to Terms",
          text: "We may update these terms from time to time. We will notify you of material changes by posting the updated terms on our website or through other appropriate means."
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
            <ScaleIcon className="h-16 w-16 text-primary-400 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <p className="text-xl text-gray-300 mb-4 leading-relaxed">
            These terms govern your use of Veyra Protocol's services. Please read them carefully 
            before using our platform.
          </p>

          <div className="flex items-center justify-center text-gray-400">
            <ClockIcon className="h-5 w-5 mr-2" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </motion.section>

      {/* Important Notice */}
      <motion.section 
        className="py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Important Legal Notice</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  By using Veyra Protocol's services, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms of Service. If you do not agree to these terms, 
                  please do not use our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Table of Contents */}
      <motion.section 
        className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
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

      {/* Terms Content */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Questions About These Terms?</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              If you have any questions about these Terms of Service or need clarification 
              on any provisions, please contact our legal team.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <ScaleIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Legal Team</h3>
                <p className="text-gray-300 text-sm">legal@veyra.network</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <UserIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">General Support</h3>
                <p className="text-gray-300 text-sm">support@veyra.network</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <GlobeAltIcon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Business Inquiries</h3>
                <p className="text-gray-300 text-sm">business@veyra.network</p>
              </div>
            </div>

            <button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
              Contact Legal Team
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Terms