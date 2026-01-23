import { useState } from 'react'
import { getUsers, saveUser } from '../utils/auth'
import './UserManagement.css'

function UserManagement({ users, onCreateUser, onUserUpdate }) {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [username, setUsername] = useState('')
  const [createdUser, setCreatedUser] = useState(null)

  const handleCreateUser = (e) => {
    e.preventDefault()
    if (!username.trim()) {
      alert('Bitte geben Sie einen Benutzernamen ein.')
      return
    }

    const newUser = onCreateUser(username)
    setCreatedUser(newUser)
    setUsername('')
    setShowCreateForm(false)
  }

  const handleToggleUserStatus = (userId) => {
    const allUsers = getUsers()
    const user = allUsers.find(u => u.id === userId)
    if (user) {
      user.isActive = !user.isActive
      saveUser(user)
      onUserUpdate()
    }
  }

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>Benutzerverwaltung</h2>
        <button 
          className="btn-primary"
          onClick={() => {
            setShowCreateForm(true)
            setCreatedUser(null)
          }}
        >
          + Neuen Benutzer erstellen
        </button>
      </div>

      {createdUser && (
        <div className="success-card">
          <h3>✅ Benutzer erfolgreich erstellt!</h3>
          <div className="credentials">
            <p><strong>Benutzername:</strong> {createdUser.username}</p>
            <p><strong>PIN:</strong> <code>{createdUser.pin}</code></p>
            <p><strong>TAN:</strong> <code>{createdUser.tan}</code></p>
            <p className="warning">⚠️ Bitte notieren Sie sich diese Daten. Sie werden nicht erneut angezeigt!</p>
          </div>
          <button 
            className="btn-secondary"
            onClick={() => setCreatedUser(null)}
          >
            Schließen
          </button>
        </div>
      )}

      {showCreateForm && !createdUser && (
        <div className="create-user-form">
          <h3>Neuen Benutzer erstellen</h3>
          <form onSubmit={handleCreateUser}>
            <div className="form-group">
              <label htmlFor="username">Benutzername</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="z.B. Helfer-1"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Benutzer erstellen
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => {
                  setShowCreateForm(false)
                  setUsername('')
                }}
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="users-list">
        <h3>Aktive Benutzer ({users.filter(u => u.isActive).length})</h3>
        {users.length === 0 ? (
          <p className="empty-state">Noch keine Benutzer erstellt.</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Benutzername</th>
                <th>Rolle</th>
                <th>Erstellt am</th>
                <th>TAN Ablauf</th>
                <th>Status</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>
                    <span className="role-badge">{user.role === 'temp_user' ? 'Temp User' : user.role}</span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString('de-DE')}</td>
                  <td>{new Date(user.tanExpiration).toLocaleDateString('de-DE')}</td>
                  <td>
                    <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-small"
                      onClick={() => handleToggleUserStatus(user.id)}
                    >
                      {user.isActive ? 'Deaktivieren' : 'Aktivieren'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default UserManagement

