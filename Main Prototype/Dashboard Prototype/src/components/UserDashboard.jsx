import { useState, useEffect } from 'react'
import { 
  getSearchActionsByUser, 
  getPublicSearchActions,
  saveSearchAction, 
  deleteSearchAction 
} from '../utils/searchStorage'
import SearchActionForm from './SearchActionForm'
import SearchActionList from './SearchActionList'
import './UserDashboard.css'

function UserDashboard({ user, onLogout }) {
  const [searchActions, setSearchActions] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingAction, setEditingAction] = useState(null)
  const [filter, setFilter] = useState('all') // all, public, private

  useEffect(() => {
    loadSearchActions()
  }, [filter])

  const loadSearchActions = () => {
    const allActions = getSearchActionsByUser(user.id)
    let filtered = allActions

    if (filter === 'public') {
      filtered = allActions.filter(a => a.isPublic === true)
    } else if (filter === 'private') {
      filtered = allActions.filter(a => a.isPublic === false)
    }

    setSearchActions(filtered)
  }

  const handleSaveAction = (actionData) => {
    const actionWithUser = {
      ...actionData,
      createdBy: user.id,
      createdAt: actionData.createdAt || new Date().toISOString()
    }
    saveSearchAction(actionWithUser)
    loadSearchActions()
    setShowForm(false)
    setEditingAction(null)
  }

  const handleDeleteAction = (id) => {
    if (window.confirm('Möchten Sie diese Suchaktion wirklich löschen?')) {
      if (deleteSearchAction(id, user.id)) {
        loadSearchActions()
      } else {
        alert('Fehler beim Löschen der Suchaktion.')
      }
    }
  }

  const handleEditAction = (action) => {
    setEditingAction(action)
    setShowForm(true)
  }

  const handleNewAction = () => {
    setEditingAction(null)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingAction(null)
  }

  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🐾 PetFinder - Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">Angemeldet als: {user.username}</span>
            <button className="btn-secondary" onClick={onLogout}>
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {showForm ? (
          <SearchActionForm
            action={editingAction}
            onSave={handleSaveAction}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <div className="dashboard-controls">
              <div className="controls-left">
                <h2>Meine Suchaktionen</h2>
                <div className="filter-buttons">
                  <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                  >
                    Alle ({getSearchActionsByUser(user.id).length})
                  </button>
                  <button
                    className={`filter-btn ${filter === 'public' ? 'active' : ''}`}
                    onClick={() => setFilter('public')}
                  >
                    Öffentlich ({getSearchActionsByUser(user.id).filter(a => a.isPublic).length})
                  </button>
                  <button
                    className={`filter-btn ${filter === 'private' ? 'active' : ''}`}
                    onClick={() => setFilter('private')}
                  >
                    Privat ({getSearchActionsByUser(user.id).filter(a => !a.isPublic).length})
                  </button>
                </div>
              </div>
              <button className="btn-primary" onClick={handleNewAction}>
                + Neue Suchaktion
              </button>
            </div>

            <SearchActionList
              actions={searchActions}
              onEdit={handleEditAction}
              onDelete={handleDeleteAction}
              showDelete={true}
            />
          </>
        )}
      </main>
    </div>
  )
}

export default UserDashboard

