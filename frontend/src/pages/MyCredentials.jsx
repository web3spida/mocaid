import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import {
  DocumentCheckIcon,
  PlusIcon,
  EyeIcon,
  TrashIcon,
  ShareIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  IdentificationIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import { useCredentialIssuer } from '../hooks/useContracts'
import { useVerifiableCredentials } from '../hooks/useAirKit'

const MyCredentials = () => {
  const { address } = useAccount()
  const { useGetUserCredentials } = useCredentialIssuer()
  const { credentials, createCredential, verifyCredential, removeCredential, isLoading } = useVerifiableCredentials()

  // Contract data
  const { data: userCredentials, isLoading: isLoadingCredentials } = useGetUserCredentials(address)

  // State
  const [selectedCredential, setSelectedCredential] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Create credential form
  const [createForm, setCreateForm] = useState({
    type: 'education',
    title: '',
    issuer: '',
    description: '',
    data: {},
  })

  // Credential types with icons and colors
  const credentialTypes = {
    education: {
      icon: AcademicCapIcon,
      label: 'Education',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    employment: {
      icon: BriefcaseIcon,
      label: 'Employment',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    identity: {
      icon: IdentificationIcon,
      label: 'Identity',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    certification: {
      icon: ShieldCheckIcon,
      label: 'Certification',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
  }

  // Mock credentials for demo
  const mockCredentials = [
    {
      id: '1',
      type: 'education',
      title: 'Bachelor of Computer Science',
      issuer: 'University of Technology',
      issuanceDate: '2023-06-15',
      expirationDate: '2028-06-15',
      status: 'verified',
      data: {
        degree: 'Bachelor of Science',
        major: 'Computer Science',
        gpa: '3.8',
        graduationDate: '2023-06-15',
      },
    },
    {
      id: '2',
      type: 'certification',
      title: 'Blockchain Developer Certification',
      issuer: 'Moca Academy',
      issuanceDate: '2023-08-20',
      expirationDate: '2025-08-20',
      status: 'verified',
      data: {
        skills: ['Solidity', 'Web3', 'Smart Contracts'],
        level: 'Advanced',
        score: '95%',
      },
    },
    {
      id: '3',
      type: 'employment',
      title: 'Senior Software Engineer',
      issuer: 'Tech Corp Inc.',
      issuanceDate: '2023-01-15',
      expirationDate: null,
      status: 'active',
      data: {
        position: 'Senior Software Engineer',
        department: 'Engineering',
        startDate: '2023-01-15',
        skills: ['React', 'Node.js', 'TypeScript'],
      },
    },
  ]

  // Combine mock credentials with real ones for demo
  const allCredentials = [...mockCredentials, ...credentials]

  // Filter credentials
  const filteredCredentials = allCredentials.filter(credential => {
    const matchesFilter = filter === 'all' || credential.type === filter
    const matchesSearch = credential.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credential.issuer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Handle create credential
  const handleCreateCredential = async (e) => {
    e.preventDefault()
    
    try {
      const issuerDID = `did:moca:${createForm.issuer.toLowerCase()}`
      const credentialData = {
        type: createForm.type,
        title: createForm.title,
        description: createForm.description,
        ...createForm.data,
      }

      await createCredential(issuerDID, credentialData)
      toast.success('Credential created successfully!')
      setShowCreateModal(false)
      setCreateForm({
        type: 'education',
        title: '',
        issuer: '',
        description: '',
        data: {},
      })
    } catch (error) {
      toast.error('Failed to create credential: ' + error.message)
    }
  }

  // Handle verify credential
  const handleVerifyCredential = async (credential) => {
    try {
      const isValid = await verifyCredential(credential)
      if (isValid) {
        toast.success('Credential is valid!')
      } else {
        toast.error('Credential verification failed!')
      }
    } catch (error) {
      toast.error('Failed to verify credential: ' + error.message)
    }
  }

  // Handle share credential
  const handleShareCredential = (credential) => {
    const shareData = {
      title: credential.title,
      text: `Verifiable Credential: ${credential.title} issued by ${credential.issuer}`,
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData)
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(JSON.stringify(credential, null, 2))
      toast.success('Credential data copied to clipboard!')
    }
  }

  // Handle delete credential
  const handleDeleteCredential = (credentialId) => {
    if (confirm('Are you sure you want to delete this credential?')) {
      removeCredential(credentialId)
      toast.success('Credential deleted successfully!')
    }
  }

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <DocumentCheckIcon className="w-8 h-8 mr-3 text-blue-600" />
                My Credentials
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your verifiable credentials and certificates.
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add Credential</span>
            </button>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card mb-6"
        >
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search credentials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Filter */}
            <div className="sm:w-48">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Types</option>
                {Object.entries(credentialTypes).map(([key, type]) => (
                  <option key={key} value={key}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={itemVariants} className="card text-center">
            <div className="text-2xl font-bold text-blue-600">{allCredentials.length}</div>
            <div className="text-gray-600">Total Credentials</div>
          </motion.div>
          <motion.div variants={itemVariants} className="card text-center">
            <div className="text-2xl font-bold text-green-600">
              {allCredentials.filter(c => c.status === 'verified').length}
            </div>
            <div className="text-gray-600">Verified</div>
          </motion.div>
          <motion.div variants={itemVariants} className="card text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {allCredentials.filter(c => c.status === 'pending').length}
            </div>
            <div className="text-gray-600">Pending</div>
          </motion.div>
          <motion.div variants={itemVariants} className="card text-center">
            <div className="text-2xl font-bold text-red-600">
              {allCredentials.filter(c => c.expirationDate && new Date(c.expirationDate) < new Date()).length}
            </div>
            <div className="text-gray-600">Expired</div>
          </motion.div>
        </motion.div>

        {/* Credentials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCredentials.map((credential) => {
            const typeConfig = credentialTypes[credential.type] || credentialTypes.identity
            const Icon = typeConfig.icon
            const isExpired = credential.expirationDate && new Date(credential.expirationDate) < new Date()

            return (
              <motion.div
                key={credential.id}
                variants={itemVariants}
                className="card-hover group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${typeConfig.bgColor}`}>
                      <Icon className={`w-6 h-6 ${typeConfig.textColor}`} />
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeConfig.bgColor} ${typeConfig.textColor}`}>
                        {typeConfig.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {credential.status === 'verified' && (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    )}
                    {credential.status === 'pending' && (
                      <ClockIcon className="w-5 h-5 text-yellow-500" />
                    )}
                    {isExpired && (
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {credential.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Issued by {credential.issuer}
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Issued: {new Date(credential.issuanceDate).toLocaleDateString()}</div>
                    {credential.expirationDate && (
                      <div className={isExpired ? 'text-red-500' : ''}>
                        Expires: {new Date(credential.expirationDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => setSelectedCredential(credential)}
                    className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-1"
                  >
                    <EyeIcon className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleShareCredential(credential)}
                    className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-1"
                  >
                    <ShareIcon className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => handleDeleteCredential(credential.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Empty State */}
        {filteredCredentials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <DocumentCheckIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No credentials found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first verifiable credential.'}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              Add Your First Credential
            </button>
          </motion.div>
        )}

        {/* Create Credential Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Add New Credential
                </h3>
                
                <form onSubmit={handleCreateCredential} className="space-y-4">
                  <div>
                    <label className="label">Credential Type</label>
                    <select
                      value={createForm.type}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, type: e.target.value }))}
                      className="input-field"
                      required
                    >
                      {Object.entries(credentialTypes).map(([key, type]) => (
                        <option key={key} value={key}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label">Title</label>
                    <input
                      type="text"
                      value={createForm.title}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                      className="input-field"
                      placeholder="e.g., Bachelor of Computer Science"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Issuer</label>
                    <input
                      type="text"
                      value={createForm.issuer}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, issuer: e.target.value }))}
                      className="input-field"
                      placeholder="e.g., University of Technology"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Description</label>
                    <textarea
                      value={createForm.description}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                      className="input-field"
                      rows={3}
                      placeholder="Brief description of the credential..."
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary flex-1"
                    >
                      {isLoading ? (
                        <>
                          <div className="spinner mr-2"></div>
                          Creating...
                        </>
                      ) : (
                        'Create Credential'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Credential Detail Modal */}
        <AnimatePresence>
          {selectedCredential && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedCredential(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Credential Details
                  </h3>
                  <button
                    onClick={() => setSelectedCredential(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{selectedCredential.title}</h4>
                    <p className="text-gray-600">Issued by {selectedCredential.issuer}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h5 className="font-medium text-gray-900 mb-3">Credential Data</h5>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(selectedCredential.data, null, 2)}
                    </pre>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleVerifyCredential(selectedCredential)}
                      className="btn-primary flex-1"
                    >
                      Verify Credential
                    </button>
                    <button
                      onClick={() => handleShareCredential(selectedCredential)}
                      className="btn-secondary flex-1"
                    >
                      Share Credential
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MyCredentials