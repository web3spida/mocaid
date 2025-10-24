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
} from '@heroicons/react/24/outline'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isConnected } = useAccount()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon, public: true },
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon, public: false },
    { name: 'Credentials', href: '/credentials', icon: DocumentCheckIcon, public: false },
    { name: 'Verify & Earn', href: '/verification', icon: ShieldCheckIcon, public: false },
    { name: 'Rewards', href: '/rewards', icon: CurrencyDollarIcon, public: false },
    { name: 'Leaderboard', href: '/leaderboard', icon: TrophyIcon, public: false },
    { name: 'Verifiers', href: '/verifiers', icon: UserGroupIcon, public: false },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, public: false },
  ]

  const filteredNavigation = navigation.filter(item => 
    item.public || isConnected
  )

  const isActive = (href) => location.pathname === href

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Logo and brand (far left) */}
          <div className="flex items-center justify-self-start">
            <Link to="/" className="inline-flex items-center space-x-2 whitespace-nowrap">
              <Logo />
              <span className="text-lg leading-none font-bold bg-gradient-to-r from-primary-600 to-moca-600 bg-clip-text text-transparent align-middle"> Verya Protocol</span>
            </Link>
          </div>

          {/* Desktop navigation (centered) */}
          <div className="hidden md:flex items-center justify-center justify-self-center space-x-1">
            {filteredNavigation.map((item) => {
              const Icon = item.icon
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

      {/* Removed absolute Connect Button to prevent overlaying page headers */}

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