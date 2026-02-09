import { useState, useEffect } from 'react'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import GuestView from './components/GuestView'
import { getCurrentUser, logout, initializeDefaultAdmin } from './utils/auth'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize default admin if no users exist
    initializeDefaultAdmin()
    
    // Check if user is already logged in
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  if (loading) {
    return <div className="loading">Lade...</div>
  }

  // Guest view (no login required)
  if (!user) {
    return <GuestView onLogin={() => setUser(getCurrentUser())} />
  }

  // Admin view
  if (user.role === 'admin') {
    return <AdminDashboard user={user} onLogout={handleLogout} />
  }

  // Temp User view
  if (user.role === 'temp_user') {
    return <UserDashboard user={user} onLogout={handleLogout} />
  }

  return <Login onLogin={handleLogin} />
}

export default App
