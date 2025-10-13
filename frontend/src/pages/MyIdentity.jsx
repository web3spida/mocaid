import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import {
  IdentificationIcon,
  KeyIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { useIdentityRegistry } from '../hooks/useContracts'
import { useDID } from '../hooks/useAirKit'

const MyIdentity = () => {
  const { address } = useAccount()
  const { useGetIdentity, useIsRegistered, useRegisterIdentity, useUpdateIdentity, useRevokeIdentity } = useIdentityRegistry()
  const { did, publicKey, generateDID, isLoading: isDIDLoading } = useDID()

  // Contract hooks
  const { data: isRegistered, isLoading: isCheckingRegistration, refetch: refetchRegistration } = useIsRegistered(address)
  const { data: identity, isLoading: isLoadingIdentity, refetch: refetchIdentity } = useGetIdentity(address)
  const { registerIdentity, isLoading: isRegistering, isSuccess: isRegisterSuccess } = useRegisterIdentity()
  const { updateIdentity, isLoading: isUpdating, isSuccess: isUpdateSuccess } = useUpdateIdentity()
  const { revokeIdentity, isLoading: isRevoking, isSuccess: isRevokeSuccess } = useRevokeIdentity()

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    website: '',
    bio: '',
  })
  const [isEditing, setIsEditing] = useState(false)

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Generate DID if not exists
  const handleGenerateDID = async () => {
    try {
      await generateDID()
      toast.success('DID generated successfully!')
    } catch (error) {
      toast.error('Failed to generate DID: ' + error.message)
    }
  }

  // Register identity on blockchain
  const handleRegisterIdentity = async () => {
    if (!did || !publicKey) {
      toast.error('Please generate a DID first')
      return
    }

    try {
      const metadata = JSON.stringify(formData)
      await registerIdentity({
        args: [did, publicKey, metadata]
      })
    } catch (error) {
      toast.error('Failed to register identity: ' + error.message)
    }
  }

  // Update identity metadata
  const handleUpdateIdentity = async () => {
    try {
      const metadata = JSON.stringify(formData)
      await updateIdentity({
        args: [metadata]
      })
    } catch (error) {
      toast.error('Failed to update identity: ' + error.message)
    }
  }

  // Revoke identity
  const handleRevokeIdentity = async () => {
    if (!confirm('Are you sure you want to revoke your identity? This action cannot be undone.')) {
      return
    }

    try {
      await revokeIdentity()
    } catch (error) {
      toast.error('Failed to revoke identity: ' + error.message)
    }
  }

  // Copy to clipboard
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard!`)
  }

  // Load identity metadata
  useEffect(() => {
    if (identity && identity.metadata) {
      try {
        const metadata = JSON.parse(identity.metadata)
        setFormData(metadata)
      } catch (error) {
        console.error('Failed to parse identity metadata:', error)
      }
    }
  }, [identity])

  // Handle success states
  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success('Identity registered successfully!')
      refetchRegistration()
      refetchIdentity()
    }
  }, [isRegisterSuccess, refetchRegistration, refetchIdentity])

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success('Identity updated successfully!')
      refetchIdentity()
      setIsEditing(false)
    }
  }, [isUpdateSuccess, refetchIdentity])

  useEffect(() => {
    if (isRevokeSuccess) {
      toast.success('Identity revoked successfully!')
      refetchRegistration()
      refetchIdentity()
    }
  }, [isRevokeSuccess, refetchRegistration, refetchIdentity])

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <IdentificationIcon className="w-8 h-8 mr-3 text-primary-600" />
            My Identity
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your decentralized identity and personal information.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* DID Section */}
          <motion.div variants={itemVariants} className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Decentralized Identifier (DID)</h2>
              <KeyIcon className="w-6 h-6 text-primary-600" />
            </div>

            {!did ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeyIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No DID Generated</h3>
                <p className="text-gray-600 mb-6">
                  Generate your unique decentralized identifier to get started.
                </p>
                <button
                  onClick={handleGenerateDID}
                  disabled={isDIDLoading}
                  className="btn-primary"
                >
                  {isDIDLoading ? (
                    <>
                      <div className="spinner mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    'Generate DID'
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        DID
                      </label>
                      <code className="text-sm bg-white px-3 py-2 rounded border block">
                        {did}
                      </code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(did, 'DID')}
                      className="ml-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ClipboardDocumentIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Public Key
                      </label>
                      <code className="text-sm bg-white px-3 py-2 rounded border block break-all">
                        {publicKey}
                      </code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(publicKey, 'Public Key')}
                      className="ml-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ClipboardDocumentIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Registration Status */}
          <motion.div variants={itemVariants} className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Registration Status</h2>
              {isCheckingRegistration ? (
                <div className="spinner"></div>
              ) : isRegistered ? (
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              ) : (
                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
              )}
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <div
                className={`w-3 h-3 rounded-full ${
                  isRegistered ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              ></div>
              <span className="font-medium">
                {isRegistered ? 'Identity Registered' : 'Identity Not Registered'}
              </span>
            </div>

            <p className="text-gray-600 mb-6">
              {isRegistered
                ? 'Your identity is registered on the Moca Chain and ready to use.'
                : 'Register your identity on the blockchain to start using verifiable credentials.'}
            </p>

            {identity && (
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Registration Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={identity.isActive ? 'text-green-600' : 'text-red-600'}>
                      {identity.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registered:</span>
                    <span className="text-gray-900">
                      {new Date(Number(identity.timestamp) * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!isRegistered && did && (
              <button
                onClick={handleRegisterIdentity}
                disabled={isRegistering}
                className="btn-primary w-full"
              >
                {isRegistering ? (
                  <>
                    <div className="spinner mr-2"></div>
                    Registering...
                  </>
                ) : (
                  'Register Identity'
                )}
              </button>
            )}
          </motion.div>

          {/* Identity Information */}
          <motion.div variants={itemVariants} className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Identity Information</h2>
              <div className="flex space-x-2">
                {isRegistered && !isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
                {isRegistered && identity?.isActive && (
                  <button
                    onClick={handleRevokeIdentity}
                    disabled={isRevoking}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>{isRevoking ? 'Revoking...' : 'Revoke'}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing && isRegistered}
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing && isRegistered}
                  className="input-field"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="label">Organization</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  disabled={!isEditing && isRegistered}
                  className="input-field"
                  placeholder="Enter your organization"
                />
              </div>

              <div>
                <label className="label">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  disabled={!isEditing && isRegistered}
                  className="input-field"
                  placeholder="https://example.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing && isRegistered}
                  rows={4}
                  className="input-field"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleUpdateIdentity}
                  disabled={isUpdating}
                  className="btn-primary flex-1"
                >
                  {isUpdating ? (
                    <>
                      <div className="spinner mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default MyIdentity