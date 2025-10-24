import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  StarIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { isConnected } = useAccount()
  const location = useLocation()

  // Simplified navigation with fewer menu items
  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon, public: true },
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon, public: false },
    {
      name: 'Identity',
      icon: ShieldCheckIcon,
      public: false,
      dropdown: [
        { name: 'My Identity', href: '/my-identity', icon: ShieldCheckIcon },
        { name: 'My Credentials', href: '/my-credentials', icon: StarIcon },
        { name: 'Browse Credentials', href: '/credentials', icon: DocumentCheckIcon },
      ]
    },
    {
      name: 'Verification',
      icon: UserGroupIcon,
      public: false,
      dropdown: [
        { name: 'Verify & Earn', href: '/verify-and-earn', icon: CurrencyDollarIcon },
        { name: 'Verifiers Network', href: '/verifiers', icon: UserGroupIcon },
        { name: 'Credential Verification', href: '/verification', icon: ShieldCheckIcon },
      ]
    },
    {
      name: 'Rewards',
      icon: TrophyIcon,
      public: false,
      dropdown: [
        { name: 'Earn Rewards', href: '/rewards', icon: CurrencyDollarIcon },
        { name: 'Leaderboard', href: '/leaderboard', icon: TrophyIcon },
      ]
    },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, public: false },
  ]

  const filteredNavigation = navigation.filter(item => 
    item.public || isConnected
  )

  const isActive = (href) => location.pathname === href

  const isDropdownActive = (dropdown) => {
    return dropdown?.some(item => location.pathname === item.href)
  }

  const handleDropdownToggle = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Logo and brand (far left) */}
          <div className="flex items-center justify-self-start">
            <Link to="/" className="inline-flex items-center space-x-2 whitespace-nowrap">
              <Logo />
              <span className="text-lg leading-none font-bold bg-gradient-to-r from-primary-600 to-moca-600 bg-clip-text text-transparent align-middle hidden xs:block">Veyra Protocol</span>
            </Link>
          </div>

          {/* Desktop navigation (centered) */}
          <div className="hidden md:flex items-center justify-center justify-self-center space-x-1">
            {filteredNavigation.map((item) => {
              const Icon = item.icon
              
              // Handle dropdown items
              if (item.dropdown) {
                return (
                  <div key={item.name} className="relative">
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 ${
                        isDropdownActive(item.dropdown)
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{item.name}</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                        >
                          {item.dropdown.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon
                            return (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                onClick={() => setActiveDropdown(null)}
                                className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                                  isActive(dropdownItem.href)
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                              >
                                <DropdownIcon className="w-4 h-4" />
                                <span>{dropdownItem.name}</span>
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }
              
              // Handle regular navigation items
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Desktop wallet connection (far right within third column) */}
          <div className="hidden md:flex items-center w-full justify-end">
            <ConnectButton />
          </div>

          {/* Mobile menu button (right) */}
          <div className="md:hidden justify-self-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              {isOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
          <div className="px-4 py-2 space-y-1">
            {filteredNavigation.map((item) => {
              const Icon = item.icon
              
              // Handle dropdown items in mobile
              if (item.dropdown) {
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className={`flex items-center justify-between w-full px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isDropdownActive(item.dropdown)
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-1 space-y-1"
                        >
                          {item.dropdown.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon
                            return (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                onClick={() => {
                                  setIsOpen(false)
                                  setActiveDropdown(null)
                                }}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                                  isActive(dropdownItem.href)
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                              >
                                <DropdownIcon className="w-4 h-4" />
                                <span>{dropdownItem.name}</span>
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }
              
              // Handle regular navigation items in mobile
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}

            {/* Mobile wallet connection */}
            <div className="pt-4 pb-2 sm:hidden">
              <ConnectButton />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </nav>
  )
}

export default Navbar