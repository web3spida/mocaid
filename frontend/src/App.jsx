import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'

// Components
import RoleBasedLayout from './components/layout/RoleBasedLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/layout/Footer'

// Context
import { AuthProvider } from './contexts/AuthContext'

// Pages
import Home from './pages/Home'
import RoleSelection from './pages/RoleSelection'
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
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import VerifierDashboard from './pages/VerifierDashboard'
import VerificationRequest from './pages/VerificationRequest'

// Hooks
import { useAccount } from 'wagmi'

function App() {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <RoleBasedLayout>
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/role-selection" element={<RoleSelection />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/credentials" element={<Credentials />} />
              <Route path="/verifiers" element={<Verifiers />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Verifier Routes */}
              <Route 
                path="/verifier/dashboard" 
                element={
                  <ProtectedRoute requiredRole="verifier">
                    <VerifierDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* User Routes (require authentication) */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['user', 'verifier']}>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-identity" 
                element={
                  <ProtectedRoute allowedRoles={['user', 'verifier']}>
                    <MyIdentity />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-credentials" 
                element={
                  <ProtectedRoute allowedRoles={['user', 'verifier']}>
                    <MyCredentials />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/verification" 
                element={
                  <ProtectedRoute allowedRoles={['user', 'verifier']}>
                    <Verification />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/verify-and-earn" 
                element={
                  <ProtectedRoute allowedRoles={['user', 'verifier']}>
                    <VerifyAndEarn />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/access-control" 
                element={
                  <ProtectedRoute allowedRoles={['user', 'verifier']}>
                    <AccessControl />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute allowedRoles={['user', 'verifier', 'admin']}>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/rewards" 
                element={
                  <ProtectedRoute allowedRoles={['user', 'verifier']}>
                    <Rewards />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/leaderboard" 
                element={
                  <ProtectedRoute allowedRoles={['user', 'verifier']}>
                    <Leaderboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/verification/request" 
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <VerificationRequest />
                  </ProtectedRoute>
                } 
              />
              
              {/* Redirect to home for unknown routes */}
              <Route path="*" element={<Home />} />
            </Routes>
          </motion.main>

          <Footer />
        </RoleBasedLayout>
        
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
      </Router>
    </AuthProvider>
  )
}

export default App