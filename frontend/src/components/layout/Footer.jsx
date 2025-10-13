import { Link } from 'react-router-dom'
import {
  GlobeAltIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/#features' },
        { name: 'Security', href: '/#security' },
        { name: 'Roadmap', href: '/#roadmap' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: 'https://docs.mocachain.com' },
        { name: 'API Reference', href: 'https://api.mocachain.com' },
        { name: 'Support', href: 'https://support.mocachain.com' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'Discord', href: 'https://discord.gg/mocachain' },
        { name: 'Twitter', href: 'https://twitter.com/mocachain' },
        { name: 'GitHub', href: 'https://github.com/mocachain' },
      ],
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-moca-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">MocaID Vault</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Secure, decentralized identity management on Moca Chain. 
              Take control of your digital identity and credentials.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <ShieldCheckIcon className="w-4 h-4" />
                <span>Secured by Moca Chain</span>
              </div>
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-1"
                      >
                        <span>{link.name}</span>
                        <GlobeAltIcon className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© {currentYear} MocaID Vault. All rights reserved.</span>
              <span>•</span>
              <Link to="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Built with</span>
              <HeartIcon className="w-4 h-4 text-red-500" />
              <span>on Moca Chain</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer