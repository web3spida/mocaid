import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children, requiredRole, allowedRoles = [] }) => {
  const { user, userRole, canAccessRoute } = useAuth()
  const location = useLocation()

  // If no user is logged in, redirect to home
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  // Check if user has required role or is in allowed roles
  const hasAccess = requiredRole 
    ? userRole === requiredRole 
    : allowedRoles.length > 0 
      ? allowedRoles.includes(userRole)
      : canAccessRoute(location.pathname)

  if (!hasAccess) {
    // Redirect based on user role
    switch (userRole) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />
      case 'verifier':
        return <Navigate to="/verifier/dashboard" replace />
      case 'user':
        return <Navigate to="/dashboard" replace />
      default:
        return <Navigate to="/" replace />
    }
  }

  return children
}

export default ProtectedRoute