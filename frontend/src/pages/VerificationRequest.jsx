import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  UserIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

const VerificationRequest = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVerifier, setSelectedVerifier] = useState(null)
  const [requestForm, setRequestForm] = useState({
    verificationType: '',
    documentType: '',
    urgency: 'normal',
    description: '',
    documents: []
  })
  const [showRequestModal, setShowRequestModal] = useState(false)

  // Mock data for available verifiers
  const [verifiers] = useState([
    {
      id: 1,
      name: "TechCorp Verification Services",
      type: "Corporate",
      rating: 4.8,
      completedVerifications: 1250,
      averageTime: "2-4 hours",
      location: "New York, USA",
      specialties: ["Employment", "Education", "Professional Licenses"],
      fee: "0.3 MOCA",
      status: "online",
      description: "Leading corporate verification service with expertise in employment and educational credentials."
    },
    {
      id: 2,
      name: "Global Education Validators",
      type: "Educational",
      rating: 4.9,
      completedVerifications: 890,
      averageTime: "1-2 hours",
      location: "London, UK",
      specialties: ["Academic Degrees", "Certifications", "Transcripts"],
      fee: "0.25 MOCA",
      status: "online",
      description: "Specialized in academic credential verification with partnerships across major universities."
    },
    {
      id: 3,
      name: "Professional License Bureau",
      type: "Professional",
      rating: 4.7,
      completedVerifications: 2100,
      averageTime: "3-6 hours",
      location: "Toronto, Canada",
      specialties: ["Medical Licenses", "Legal Certifications", "Engineering Licenses"],
      fee: "0.4 MOCA",
      status: "busy",
      description: "Authorized verification service for professional licenses and regulatory compliance."
    },
    {
      id: 4,
      name: "Identity Verification Plus",
      type: "Identity",
      rating: 4.6,
      completedVerifications: 3200,
      averageTime: "30 minutes - 1 hour",
      location: "Sydney, Australia",
      specialties: ["Identity Documents", "Address Verification", "Background Checks"],
      fee: "0.2 MOCA",
      status: "online",
      description: "Fast and reliable identity verification service with global coverage."
    }
  ])

  const filteredVerifiers = verifiers.filter(verifier =>
    verifier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verifier.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleRequestSubmit = (e) => {
    e.preventDefault()
    
    if (!requestForm.verificationType || !requestForm.documentType) {
      alert('Please fill in all required fields')
      return
    }

    // Mock submission
    console.log('Verification request submitted:', {
      verifier: selectedVerifier,
      request: requestForm
    })

    alert(`Verification request sent to ${selectedVerifier.name}! You will receive updates on the progress.`)
    
    // Reset form
    setRequestForm({
      verificationType: '',
      documentType: '',
      urgency: 'normal',
      description: '',
      documents: []
    })
    setShowRequestModal(false)
    setSelectedVerifier(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-500'
      case 'busy': return 'text-yellow-500'
      case 'offline': return 'text-gray-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusDot = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Request Verification
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find and connect with verified professionals to validate your credentials quickly and securely.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by verifier name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </motion.div>

        {/* Verifiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredVerifiers.map((verifier, index) => (
            <motion.div
              key={verifier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <ShieldCheckIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">{verifier.name}</h3>
                    <p className="text-sm text-gray-500">{verifier.type} Verifier</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${getStatusDot(verifier.status)} mr-2`}></div>
                  <span className={`text-sm font-medium ${getStatusColor(verifier.status)} capitalize`}>
                    {verifier.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{verifier.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <StarIcon className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>{verifier.rating} ({verifier.completedVerifications} verifications)</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  <span>Avg. time: {verifier.averageTime}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  <span>{verifier.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                  <span>Fee: {verifier.fee}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {verifier.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedVerifier(verifier)
                  setShowRequestModal(true)
                }}
                disabled={verifier.status === 'offline'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                Request Verification
              </button>
            </motion.div>
          ))}
        </div>

        {/* Request Modal */}
        {showRequestModal && selectedVerifier && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Request Verification from {selectedVerifier.name}
                  </h2>
                  <button
                    onClick={() => setShowRequestModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleRequestSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Type *
                    </label>
                    <select
                      value={requestForm.verificationType}
                      onChange={(e) => setRequestForm({...requestForm, verificationType: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select verification type</option>
                      <option value="employment">Employment Verification</option>
                      <option value="education">Education Verification</option>
                      <option value="identity">Identity Verification</option>
                      <option value="professional">Professional License</option>
                      <option value="address">Address Verification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Type *
                    </label>
                    <select
                      value={requestForm.documentType}
                      onChange={(e) => setRequestForm({...requestForm, documentType: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select document type</option>
                      <option value="diploma">Diploma/Degree</option>
                      <option value="certificate">Certificate</option>
                      <option value="license">Professional License</option>
                      <option value="transcript">Academic Transcript</option>
                      <option value="employment-letter">Employment Letter</option>
                      <option value="id-document">ID Document</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      value={requestForm.urgency}
                      onChange={(e) => setRequestForm({...requestForm, urgency: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="normal">Normal (Standard processing)</option>
                      <option value="urgent">Urgent (Priority processing)</option>
                      <option value="emergency">Emergency (Immediate processing)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Details
                    </label>
                    <textarea
                      value={requestForm.description}
                      onChange={(e) => setRequestForm({...requestForm, description: e.target.value})}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Provide any additional information that might help with the verification process..."
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Verification Summary</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Verifier:</span> {selectedVerifier.name}</p>
                      <p><span className="font-medium">Estimated Time:</span> {selectedVerifier.averageTime}</p>
                      <p><span className="font-medium">Fee:</span> {selectedVerifier.fee}</p>
                      <p><span className="font-medium">Urgency:</span> {requestForm.urgency}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowRequestModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
                    >
                      <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                      Send Request
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerificationRequest