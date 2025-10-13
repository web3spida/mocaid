import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

const Verification = () => {
  const [verificationData, setVerificationData] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerification = async () => {
    if (!verificationData.trim()) return

    setIsVerifying(true)
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock verification result
      const isValid = Math.random() > 0.3 // 70% chance of valid credential
      setVerificationResult({
        isValid,
        credential: {
          type: 'Identity Credential',
          issuer: 'MocaID Authority',
          holder: '0x1234...5678',
          issuedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        }
      })
    } catch (error) {
      console.error('Verification failed:', error)
      setVerificationResult({ isValid: false, error: 'Verification failed' })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <ShieldCheckIcon className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Credential Verification
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Verify the authenticity and validity of digital credentials and identity documents
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="mb-6">
            <label htmlFor="verification-data" className="block text-sm font-medium text-gray-700 mb-2">
              Credential Data or QR Code Content
            </label>
            <textarea
              id="verification-data"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="Paste credential data, JWT token, or QR code content here..."
              value={verificationData}
              onChange={(e) => setVerificationData(e.target.value)}
            />
          </div>

          <button
            onClick={handleVerification}
            disabled={!verificationData.trim() || isVerifying}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            {isVerifying ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verifying...
              </>
            ) : (
              <>
                <DocumentCheckIcon className="h-5 w-5 mr-2" />
                Verify Credential
              </>
            )}
          </button>
        </motion.div>

        {verificationResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`bg-white rounded-2xl shadow-xl p-8 border-l-4 ${
              verificationResult.isValid ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <div className="flex items-center mb-6">
              {verificationResult.isValid ? (
                <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
              ) : (
                <XCircleIcon className="h-8 w-8 text-red-500 mr-3" />
              )}
              <h2 className="text-2xl font-bold text-gray-900">
                {verificationResult.isValid ? 'Credential Valid' : 'Credential Invalid'}
              </h2>
            </div>

            {verificationResult.isValid && verificationResult.credential && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Credential Type</h3>
                  <p className="text-lg text-gray-900">{verificationResult.credential.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Issuer</h3>
                  <p className="text-lg text-gray-900">{verificationResult.credential.issuer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Holder</h3>
                  <p className="text-lg text-gray-900 font-mono">{verificationResult.credential.holder}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Issued At</h3>
                  <p className="text-lg text-gray-900">
                    {new Date(verificationResult.credential.issuedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Expires At</h3>
                  <p className="text-lg text-gray-900">
                    {new Date(verificationResult.credential.expiresAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {!verificationResult.isValid && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mr-2" />
                  <p className="text-red-800">
                    {verificationResult.error || 'The provided credential could not be verified or has been revoked.'}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Verification