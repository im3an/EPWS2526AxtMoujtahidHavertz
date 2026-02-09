// Authentication utilities for ID-based auth (PIN/TAN system)

const STORAGE_KEY_USERS = 'petfinder_users'
const STORAGE_KEY_SESSIONS = 'petfinder_sessions'
const CURRENT_USER_KEY = 'petfinder_current_user'

// Generate random PIN (4-6 digits)
export const generatePIN = () => {
  return Math.floor(1000 + Math.random() * 9000).toString() // 4-digit PIN
}

// Generate TAN (temporary code, 6-8 characters alphanumeric)
export const generateTAN = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Exclude confusing chars
  let tan = ''
  for (let i = 0; i < 6; i++) {
    tan += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return tan
}

// Generate invitation code
export const generateInvitationCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// Get all users
export const getUsers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_USERS)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Fehler beim Laden der Benutzer:', error)
    return []
  }
}

// Save user
export const saveUser = (user) => {
  try {
    const users = getUsers()
    const existingIndex = users.findIndex(u => u.id === user.id)
    
    if (existingIndex >= 0) {
      users[existingIndex] = user
    } else {
      users.push(user)
    }
    
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users))
    return user
  } catch (error) {
    console.error('Fehler beim Speichern des Benutzers:', error)
    throw error
  }
}

// Create temp user (Admin function)
export const createTempUser = (username) => {
  const pin = generatePIN()
  const tan = generateTAN()
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 30) // TAN expires in 30 days

  const user = {
    id: `user-${Date.now()}`,
    username: username || `User-${Date.now()}`,
    role: 'temp_user',
    pin: pin,
    tan: tan,
    tanExpiration: expirationDate.toISOString(),
    createdAt: new Date().toISOString(),
    isActive: true
  }

  saveUser(user)
  return user
}

// Login with PIN/TAN
export const login = (pin, tan) => {
  try {
    const users = getUsers()
    const user = users.find(u => 
      u.pin === pin && 
      u.tan === tan && 
      u.isActive &&
      new Date(u.tanExpiration) > new Date()
    )

    if (!user) {
      return { success: false, error: 'Ungültige PIN/TAN oder abgelaufen' }
    }

    // Create session
    const session = {
      userId: user.id,
      token: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    }

    const sessions = getSessions()
    sessions.push(session)
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions))

    // Store current user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
      ...user,
      sessionToken: session.token
    }))

    return { success: true, user: { ...user, sessionToken: session.token } }
  } catch (error) {
    console.error('Fehler beim Login:', error)
    return { success: false, error: 'Login fehlgeschlagen' }
  }
}

// Get sessions
const getSessions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SESSIONS)
    return data ? JSON.parse(data) : []
  } catch (error) {
    return []
  }
}

// Get current user
export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY)
    if (!data) return null
    
    const user = JSON.parse(data)
    // Check if session is still valid
    const sessions = getSessions()
    const session = sessions.find(s => s.token === user.sessionToken)
    
    if (!session || new Date(session.expiresAt) < new Date()) {
      logout()
      return null
    }
    
    return user
  } catch (error) {
    return null
  }
}

// Logout
export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}

// Create admin user (for initial setup)
export const createAdminUser = () => {
  const admin = {
    id: 'admin-1',
    username: 'Admin',
    role: 'admin',
    pin: '1234', // Default admin PIN (should be changed in production)
    tan: 'ADMIN1',
    createdAt: new Date().toISOString(),
    isActive: true
  }

  const users = getUsers()
  const existingAdmin = users.find(u => u.role === 'admin')
  
  if (!existingAdmin) {
    saveUser(admin)
  }
  
  return admin
}

// Initialize default admin if no users exist
export const initializeDefaultAdmin = () => {
  const users = getUsers()
  if (users.length === 0) {
    createAdminUser()
  }
}

