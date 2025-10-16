import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useContracts } from '../hooks/useContracts'
import { toast } from 'react-hot-toast'
import { 
  KeyIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  XMarkIcon,
  PlusIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

const AccessControl = () => {
  const { address, isConnected } = useAccount()
  const { accessControl } = useContracts()
  const { useCheckAccess, useGrantAccess, useRevokeAccess, useRequestAccess } = accessControl
  
  // State for managing access permissions
  const [permissions, setPermissions] = useState([])
  const [requests, setRequests] = useState([])
  const [showGrantForm, setShowGrantForm] = useState(false)
  const [grantForm, setGrantForm] = useState({
    userAddress: '',
    resource: '',
    permission: '',
    expirationTime: ''
  })

  // Contract hooks
  const { grantAccess, isLoading: isGranting } = useGrantAccess()
  const { revokeAccess, isLoading: isRevoking } = useRevokeAccess()
  const { requestAccess, isLoading: isRequesting } = useRequestAccess()

  // Load permissions and requests from smart contract events
  useEffect(() => {
    if (isConnected && address) {
      // In production, this would load from smart contract events
      // For now, initialize empty arrays - data will be populated through user actions
      setPermissions([])
      setRequests([])
    }
  }, [isConnected, address])

  const handleGrantAccess = async (e) => {
    e.preventDefault()
    
    if (!grantForm.userAddress || !grantForm.resource || !grantForm.permission) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const expirationTimestamp = grantForm.expirationTime 
        ? Math.floor(new Date(grantForm.expirationTime).getTime() / 1000)
        : Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // Default 1 year

      await grantAccess({
        args: [grantForm.userAddress, grantForm.resource, grantForm.permission, expirationTimestamp]
      })

      toast.success('Access granted successfully!')
      setShowGrantForm(false)
      setGrantForm({ userAddress: '', resource: '', permission: '', expirationTime: '' })
      
      // Add to local state (in production, this would be handled by contract events)
      const newPermission = {
        id: Date.now().toString(),
        userAddress: grantForm.userAddress,
        resource: grantForm.resource,
        permission: grantForm.permission,
        grantedAt: new Date().toISOString(),
        expiresAt: new Date(expirationTimestamp * 1000).toISOString(),
        status: 'active'
      }
      setPermissions(prev => [...prev, newPermission])
      
    } catch (error) {
      console.error('Failed to grant access:', error)
      toast.error('Failed to grant access: ' + error.message)
    }
  }

  const handleRevokeAccess = async (permission) => {
    if (!confirm(`Are you sure you want to revoke ${permission.permission} access to ${permission.resource} for ${permission.userAddress}?`)) {
      return
    }

    try {
      await revokeAccess({
        args: [permission.userAddress, permission.resource]
      })

      toast.success('Access revoked successfully!')
      
      // Update local state
      setPermissions(prev => 
        prev.map(p => 
          p.id === permission.id 
            ? { ...p, status: 'revoked' }
            : p
        )
      )
      
    } catch (error) {
      console.error('Failed to revoke access:', error)
      toast.error('Failed to revoke access: ' + error.message)
    }
  }

  const handleApproveRequest = async (request) => {
    try {
      const expirationTimestamp = Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year

      await grantAccess({
        args: [request.requesterAddress, request.resource, request.permission, expirationTimestamp]
      })

      toast.success('Access request approved!')
      
      // Update requests and add to permissions
      setRequests(prev => 
        prev.map(r => 
          r.id === request.id 
            ? { ...r, status: 'approved' }
            : r
        )
      )
      
      const newPermission = {
        id: Date.now().toString(),
        userAddress: request.requesterAddress,
        resource: request.resource,
        permission: request.permission,
        grantedAt: new Date().toISOString(),
        expiresAt: new Date(expirationTimestamp * 1000).toISOString(),
        status: 'active'
      }
      setPermissions(prev => [...prev, newPermission])
      
    } catch (error) {
      console.error('Failed to approve request:', error)
      toast.error('Failed to approve request: ' + error.message)
    }
  }

  const handleRejectRequest = (request) => {
    setRequests(prev => 
      prev.map(r => 
        r.id === request.id 
          ? { ...r, status: 'rejected' }
          : r
      )
    )
    toast.success('Access request rejected')
  }

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const isExpired = (expiresAt) => {
    return new Date(expiresAt) < new Date()
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Connect Wallet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Please connect your wallet to manage access control.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Access Control</h1>
              <p className="mt-2 text-gray-600">
                Manage permissions and control who can access your data
              </p>
            </div>
            <button
              onClick={() => setShowGrantForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Grant Access
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Permissions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <KeyIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Active Permissions
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {permissions.filter(p => p.status === 'active').length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No active permissions
                </div>
              ) : (
                permissions
                  .filter(p => p.status === 'active')
                  .map((permission) => (
                    <div key={permission.id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-sm font-medium text-gray-900">
                              {formatAddress(permission.userAddress)}
                            </h3>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              isExpired(permission.expiresAt)
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {isExpired(permission.expiresAt) ? 'Expired' : 'Active'}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            <span className="font-medium">{permission.permission}</span> access to{' '}
                            <span className="font-medium">{permission.resource}</span>
                          </p>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            Granted: {formatDate(permission.grantedAt)} | 
                            Expires: {formatDate(permission.expiresAt)}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRevokeAccess(permission)}
                          disabled={isRevoking}
                          className="ml-4 inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                          <XMarkIcon className="h-4 w-4 mr-1" />
                          {isRevoking ? 'Revoking...' : 'Revoke'}
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Access Requests */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-orange-500" />
                Access Requests
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {requests.filter(r => r.status === 'pending').length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No pending requests
                </div>
              ) : (
                requests
                  .filter(r => r.status === 'pending')
                  .map((request) => (
                    <div key={request.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {formatAddress(request.requesterAddress)}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Requesting <span className="font-medium">{request.permission}</span> access to{' '}
                            <span className="font-medium">{request.resource}</span>
                          </p>
                          {request.message && (
                            <p className="mt-2 text-sm text-gray-500 italic">
                              "{request.message}"
                            </p>
                          )}
                          <p className="mt-2 text-xs text-gray-500">
                            Requested: {formatDate(request.requestedAt)}
                          </p>
                        </div>
                        <div className="ml-4 flex space-x-2">
                          <button
                            onClick={() => handleApproveRequest(request)}
                            disabled={isGranting}
                            className="inline-flex items-center px-3 py-1 border border-green-300 rounded-md text-sm font-medium text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                          >
                            <CheckIcon className="h-4 w-4 mr-1" />
                            {isGranting ? 'Approving...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request)}
                            className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <XMarkIcon className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Grant Access Modal */}
        {showGrantForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Grant Access</h3>
                  <button
                    onClick={() => setShowGrantForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleGrantAccess} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      User Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={grantForm.userAddress}
                      onChange={(e) => setGrantForm(prev => ({ ...prev, userAddress: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="0x..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Resource *
                    </label>
                    <input
                      type="text"
                      required
                      value={grantForm.resource}
                      onChange={(e) => setGrantForm(prev => ({ ...prev, resource: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g., personal-data, credentials"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Permission *
                    </label>
                    <select
                      required
                      value={grantForm.permission}
                      onChange={(e) => setGrantForm(prev => ({ ...prev, permission: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select permission</option>
                      <option value="read">Read</option>
                      <option value="write">Write</option>
                      <option value="verify">Verify</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expiration Date
                    </label>
                    <input
                      type="datetime-local"
                      value={grantForm.expirationTime}
                      onChange={(e) => setGrantForm(prev => ({ ...prev, expirationTime: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Leave empty for 1 year default
                    </p>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowGrantForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isGranting}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      {isGranting ? 'Granting...' : 'Grant Access'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccessControl