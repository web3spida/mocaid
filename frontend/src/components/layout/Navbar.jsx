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
  IdentificationIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
  KeyIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isConnected } = useAccount()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon, public: true },
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon, public: false },
    { name: 'My Identity', href: '/identity', icon: IdentificationIcon, public: false },
    { name: 'Credentials', href: '/credentials', icon: DocumentCheckIcon, public: false },
    { name: 'Verification', href: '/verification', icon: ShieldCheckIcon, public: false },
    { name: 'Access Control', href: '/access-control', icon: KeyIcon, public: false },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, public: false },
  ]

  const filteredNavigation = navigation.filter(item => 
    item.public || isConnected
  )

  const isActive = (href) => location.pathname === href

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-moca-600 bg-clip-text text-transparent">MocaID Vault</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {filteredNavigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
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
          </div>

          {/* Desktop wallet connection (right-aligned) */}
          <div className="hidden md:flex items-center">
            <ConnectButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
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
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
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