import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccount, useDisconnect, useBalance } from 'wagmi'
import toast from 'react-hot-toast'
import {
  CogIcon,
  UserIcon,
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
  KeyIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowRightOnRectangleIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'

const Settings = () => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const expectedChainId = parseInt(import.meta.env.VITE_MOCA_CHAIN_ID || '5151')
  const { data: balanceData } = useBalance({ address, chainId: expectedChainId, watch: true })

  // State for settings
  const [settings, setSettings] = useState({
    // Profile settings
    displayName: '',
    email: '',
    bio: '',
    
    // Privacy settings
    profileVisibility: 'public',
    credentialVisibility: 'private',
    allowDataSharing: false,
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    credentialUpdates: true,
    accessRequests: true,
    
    // Security settings
    twoFactorAuth: false,
    sessionTimeout: '30',
    autoLock: true,
    
    // Appearance settings
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
  })

  const [activeTab, setActiveTab] = useState('profile')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(' Veyra-settings')
    if (savedSettings) {
      setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }))
    }
  }, [])

  // Save settings to localStorage
  const saveSettings = (newSettings) => {
    setSettings(newSettings)
    localStorage.setItem(' Veyra-settings', JSON.stringify(newSettings))
    toast.success('Settings saved successfully!')
  }

  // Handle setting change
  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    saveSettings(newSettings)
  }

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile updated successfully!')
      setIsLoading(false)
    }, 1000)
  }

  // Handle export data
  const handleExportData = () => {
    const data = {
      address,
      settings,
      exportedAt: new Date().toISOString(),
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = ` Veyra-data-${address?.slice(0, 8)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Data exported successfully!')
  }

  // Handle delete account
  const handleDeleteAccount = () => {
    // In a real implementation, this would call the smart contract
    toast.success('Account deletion initiated. This may take a few minutes.')
    setShowDeleteModal(false)
  }

  // Copy address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    toast.success('Address copied to clipboard!')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'privacy', label: 'Privacy', icon: ShieldCheckIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Security', icon: KeyIcon },
    { id: 'appearance', label: 'Appearance', icon: GlobeAltIcon },
  ]

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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <CogIcon className="w-8 h-8 mr-3 text-gray-600" />
                Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your account preferences and application settings.
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-3">
              {address && (
                <>
                  <div className="text-sm text-gray-600">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </div>
                  <div className="text-sm px-2 py-1 rounded-lg bg-gray-100 text-gray-800">
                    {balanceData?.formatted ? `${balanceData.formatted} ${balanceData.symbol}` : '—'}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="card">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>

              {/* Account Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">Connected Account</div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {address?.slice(2, 4).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </div>
                  </div>
                  <button
                    onClick={copyAddress}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <DocumentDuplicateIcon className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="w-full btn-secondary text-sm flex items-center justify-center space-x-2"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="card">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div>
                      <label className="label">Display Name</label>
                      <input
                        type="text"
                        value={settings.displayName}
                        onChange={(e) => handleSettingChange('displayName', e.target.value)}
                        className="input-field"
                        placeholder="Enter your display name"
                      />
                    </div>

                    <div>
                      <label className="label">Email Address</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange('email', e.target.value)}
                        className="input-field"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label className="label">Bio</label>
                      <textarea
                        value={settings.bio}
                        onChange={(e) => handleSettingChange('bio', e.target.value)}
                        className="input-field"
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary"
                    >
                      {isLoading ? (
                        <>
                          <div className="spinner mr-2"></div>
                          Updating...
                        </>
                      ) : (
                        'Update Profile'
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="label">Profile Visibility</label>
                      <select
                        value={settings.profileVisibility}
                        onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                        className="input-field"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="contacts">Contacts Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="label">Credential Visibility</label>
                      <select
                        value={settings.credentialVisibility}
                        onChange={(e) => handleSettingChange('credentialVisibility', e.target.value)}
                        className="input-field"
                      >
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                        <option value="selective">Selective Sharing</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Allow Data Sharing</div>
                        <div className="text-sm text-gray-600">
                          Allow anonymous usage data to improve the platform
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.allowDataSharing}
                          onChange={(e) => handleSettingChange('allowDataSharing', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                  <div className="space-y-6">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                      { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser push notifications' },
                      { key: 'credentialUpdates', label: 'Credential Updates', desc: 'Notify when credentials are issued or updated' },
                      { key: 'accessRequests', label: 'Access Requests', desc: 'Notify when someone requests access to your data' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{item.label}</div>
                          <div className="text-sm text-gray-600">{item.desc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[item.key]}
                            onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-600">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="label">Session Timeout (minutes)</label>
                      <select
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                        className="input-field"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="never">Never</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Auto-lock</div>
                        <div className="text-sm text-gray-600">
                          Automatically lock the application when inactive
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.autoLock}
                          onChange={(e) => handleSettingChange('autoLock', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Appearance Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="label">Theme</label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { value: 'light', label: 'Light', icon: SunIcon },
                          { value: 'dark', label: 'Dark', icon: MoonIcon },
                        ].map((theme) => {
                          const Icon = theme.icon
                          return (
                            <button
                              key={theme.value}
                              onClick={() => handleSettingChange('theme', theme.value)}
                              className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                                settings.theme === theme.value
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              <span>{theme.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="label">Language</label>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange('language', e.target.value)}
                        className="input-field"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="zh">中文</option>
                      </select>
                    </div>

                    <div>
                      <label className="label">Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleSettingChange('timezone', e.target.value)}
                        className="input-field"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Management */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Management</h3>
                <div className="space-y-4">
                  <button
                    onClick={handleExportData}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <DocumentDuplicateIcon className="w-5 h-5" />
                    <span>Export My Data</span>
                  </button>
                  
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="btn-danger flex items-center space-x-2"
                  >
                    <TrashIcon className="w-5 h-5" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Delete Account Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowDeleteModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Delete Account
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, credentials, and access permissions.
                </p>

                <div className="flex space-x-4">
                  <button
                    onClick={handleDeleteAccount}
                    className="btn-danger flex-1"
                  >
                    Yes, Delete Account
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Settings