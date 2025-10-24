import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock user data for different roles
const mockUsers = {
  admin: {
    id: 'admin-1',
    name: 'System Administrator',
    email: 'admin@mocaid.com',
    role: 'admin',
    avatar: '/api/placeholder/40/40'
  },
  verifier: {
    id: 'verifier-1',
    name: 'John Verifier',
    email: 'john@verifier.com',
    role: 'verifier',
    avatar: '/api/placeholder/40/40',
    verificationCount: 156,
    rating: 4.8,
    specialties: ['Identity', 'Education', 'Professional']
  },
  user: {
    id: 'user-1',
    name: 'Jane User',
    email: 'jane@user.com',
    role: 'user',
    avatar: '/api/placeholder/40/40'
  }
}

// Define which routes each role can access
const roleRoutes = {
  admin: [
    '/admin/dashboard',
    '/settings'
  ],
  verifier: [
    '/verifier/dashboard',
    '/dashboard',
    '/my-identity',
    '/my-credentials',
    '/verification',
    '/verify-and-earn',
    '/access-control',
    '/rewards',
    '/leaderboard',
    '/settings'
  ],
  user: [
    '/dashboard',
    '/my-identity',
    '/my-credentials',
    '/verification',
    '/verification/request',
    '/verify-and-earn',
    '/access-control',
    '/rewards',
    '/leaderboard',
    '/settings'
  ]
}

// Public routes accessible to all users
const publicRoutes = [
  '/',
  '/about',
  '/careers',
  '/privacy',
  '/terms',
  '/credentials',
  '/verifiers',
  '/admin/login',
  '/role-selection'
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('mocaid_user')
    const storedRole = localStorage.getItem('mocaid_role')
    
    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser))
      setUserRole(storedRole)
    }
    
    setLoading(false)
  }, [])

  const adminLogin = (credentials) => {
    // Mock admin login - in real app, this would be an API call
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const adminUser = mockUsers.admin
      setUser(adminUser)
      setUserRole('admin')
      
      // Store in localStorage
      localStorage.setItem('mocaid_user', JSON.stringify(adminUser))
      localStorage.setItem('mocaid_role', 'admin')
      
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const verifierLogin = (verifierId) => {
    // Mock verifier login - in real app, this would check verifier status
    const verifierUser = mockUsers.verifier
    setUser(verifierUser)
    setUserRole('verifier')
    
    // Store in localStorage
    localStorage.setItem('mocaid_user', JSON.stringify(verifierUser))
    localStorage.setItem('mocaid_role', 'verifier')
    
    return { success: true }
  }

  const userLogin = () => {
    // Mock user login - in real app, this would be wallet connection
    const regularUser = mockUsers.user
    setUser(regularUser)
    setUserRole('user')
    
    // Store in localStorage
    localStorage.setItem('mocaid_user', JSON.stringify(regularUser))
    localStorage.setItem('mocaid_role', 'user')
    
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    setUserRole(null)
    
    // Clear localStorage
    localStorage.removeItem('mocaid_user')
    localStorage.removeItem('mocaid_role')
  }

  const isVerifier = () => {
    return userRole === 'verifier'
  }

  const isAdmin = () => {
    return userRole === 'admin'
  }

  const getAllowedRoutes = (role) => {
    return [...publicRoutes, ...(roleRoutes[role] || [])]
  }

  const canAccessRoute = (path) => {
    if (publicRoutes.includes(path)) return true
    if (!userRole) return false
    
    const allowedRoutes = roleRoutes[userRole] || []
    return allowedRoutes.some(route => path.startsWith(route))
  }

  const value = {
    user,
    userRole,
    loading,
    adminLogin,
    verifierLogin,
    userLogin,
    logout,
    isVerifier,
    isAdmin,
    getAllowedRoutes,
    canAccessRoute
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext