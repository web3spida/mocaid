import { useAuth } from '../../contexts/AuthContext'
import UserNavbar from './UserNavbar'
import VerifierNavbar from './VerifierNavbar'
import AdminNavbar from './AdminNavbar'
import Navbar from './Navbar' // Fallback navbar

const RoleBasedLayout = ({ children }) => {
  const { user, userRole } = useAuth()

  const renderNavbar = () => {
    switch (userRole) {
      case 'admin':
        return <AdminNavbar />
      case 'verifier':
        return <VerifierNavbar />
      case 'user':
        return <UserNavbar />
      default:
        return <Navbar /> // Default navbar for unauthenticated users
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavbar()}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

export default RoleBasedLayout