import { useState, useEffect } from 'react'
import { getUsers, createTempUser, generateInvitationCode } from '../utils/auth'
import UserManagement from './UserManagement'
import InvitationCodes from './InvitationCodes'
import './AdminDashboard.css'

function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    const allUsers = getUsers()
    setUsers(allUsers.filter(u => u.role !== 'admin'))
  }

  const handleCreateUser = (username) => {
    const newUser = createTempUser(username)
    loadUsers()
    return newUser
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🐾 PetFinder - Admin Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">Angemeldet als: {user.username}</span>
            <button className="btn-secondary" onClick={onLogout}>
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button
          className={`nav-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Benutzerverwaltung
        </button>
        <button
          className={`nav-button ${activeTab === 'invitations' ? 'active' : ''}`}
          onClick={() => setActiveTab('invitations')}
        >
          🎫 Einladungscodes
        </button>
      </nav>

      <main className="dashboard-main">
        {activeTab === 'users' && (
          <UserManagement
            users={users}
            onCreateUser={handleCreateUser}
            onUserUpdate={loadUsers}
          />
        )}
        {activeTab === 'invitations' && (
          <InvitationCodes />
        )}
      </main>
    </div>
  )
}

export default AdminDashboard

