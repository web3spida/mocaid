import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Pages
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import MyIdentity from './pages/MyIdentity'
import MyCredentials from './pages/MyCredentials'
import Verification from './pages/Verification'
import VerifyAndEarn from './pages/VerifyAndEarn'
import AccessControl from './pages/AccessControl'
import Settings from './pages/Settings'
import About from './pages/About'
import Careers from './pages/Careers'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Credentials from './pages/Credentials'
import Verifiers from './pages/Verifiers'
import Rewards from './pages/Rewards'
import Leaderboard from './pages/Leaderboard'

// Hooks
import { useAccount } from 'wagmi'

function App() {
  const { isConnected } = useAccount()

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
        <Navbar />
        
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            {isConnected && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-identity" element={<MyIdentity />} />
                <Route path="/my-credentials" element={<MyCredentials />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/verify-and-earn" element={<VerifyAndEarn />} />
                <Route path="/access-control" element={<AccessControl />} />
                <Route path="/settings" element={<Settings />} />
              </>
            )}
            <Route path="/about" element={<About />} />
             <Route path="/careers" element={<Careers />} />
             <Route path="/privacy" element={<Privacy />} />
             <Route path="/terms" element={<Terms />} />
             <Route path="/credentials" element={<Credentials />} />
             <Route path="/verifiers" element={<Verifiers />} />
             <Route path="/rewards" element={<Rewards />} />
             <Route path="/leaderboard" element={<Leaderboard />} />
            {/* Redirect to home if not connected and trying to access protected routes */}
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>

        <Footer />
        
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 25px -5px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App