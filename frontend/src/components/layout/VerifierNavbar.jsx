import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import Logo from './Logo'
import {
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

const VerifierNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isConnected } = useAccount()
  const { logout, user } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/verifier/dashboard', icon: ChartBarIcon },
    { name: 'Verification Requests', href: '/verification/request', icon: DocumentCheckIcon },
    { name: 'Rewards', href: '/rewards', icon: CurrencyDollarIcon },
    { name: 'Leaderboard', href: '/leaderboard', icon: TrophyIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon }
  ]

  const isActiveRoute = (href) => {
    return location.pathname === href || location.pathname.startsWith(href)
  }

  const handleLogout = () => {
    logout()
    // Redirect will be handled by the auth context
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/verifier/dashboard" className="flex-shrink-0">
              <Logo />
            </Link>
            <div className="ml-4 pl-4 border-l border-gray-200">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Verifier Portal</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActiveRoute(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Link>
            ))}
            
            <div className="ml-4 pl-4 border-l border-gray-200 flex items-center space-x-3">
              <ConnectButton />
              {user && (
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">Verified Verifier</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    title="Logout"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActiveRoute(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-2 mt-2 border-t border-gray-200 space-y-2">
                <ConnectButton />
                {user && (
                  <div className="flex items-center justify-between px-3 py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">Verified Verifier</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default VerifierNavbar