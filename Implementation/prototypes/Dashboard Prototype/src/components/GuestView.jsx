import { useState, useEffect } from 'react'
import { getPublicSearchActions } from '../utils/searchStorage'
import Login from './Login'
import { getCurrentUser } from '../utils/auth'
import './GuestView.css'

function GuestView({ onLogin }) {
  const [publicActions, setPublicActions] = useState([])
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    loadPublicActions()
  }, [])

  const loadPublicActions = () => {
    const actions = getPublicSearchActions()
    setPublicActions(actions)
  }

  if (showLogin) {
    return (
      <div>
        <button 
          className="back-button"
          onClick={() => setShowLogin(false)}
        >
          ← Zurück zur öffentlichen Ansicht
        </button>
        <Login onLogin={(user) => {
          onLogin()
          setShowLogin(false)
        }} />
      </div>
    )
  }

  return (
    <div className="guest-view">
      <header className="guest-header">
        <div className="header-content">
          <h1>🐾 PetFinder</h1>
          <p className="subtitle">Öffentliche Suchaktionen</p>
          <button className="btn-primary" onClick={() => setShowLogin(true)}>
            Anmelden
          </button>
        </div>
      </header>

      <main className="guest-main">
        <div className="info-banner">
          <p>
            👋 Willkommen! Hier sehen Sie alle öffentlichen Suchaktionen. 
            Um eigene Suchaktionen zu erstellen, melden Sie sich bitte an.
          </p>
        </div>

        <div className="public-actions">
          <h2>Öffentliche Suchaktionen ({publicActions.length})</h2>
          
          {publicActions.length === 0 ? (
            <div className="empty-state">
              <p>Derzeit sind keine öffentlichen Suchaktionen verfügbar.</p>
            </div>
          ) : (
            <div className="actions-grid">
              {publicActions.map(action => (
                <div key={action.id} className="action-card">
                  <div className="card-header">
                    <h3>{action.petName || 'Unbenannt'}</h3>
                    <span className="pet-type">{action.petType || 'Unbekannt'}</span>
                  </div>
                  
                  {action.description && (
                    <p className="description">{action.description}</p>
                  )}
                  
                  {action.lastSeenLocation && (
                    <p className="location">
                      📍 {action.lastSeenLocation}
                    </p>
                  )}
                  
                  {action.areas && action.areas.length > 0 && (
                    <p className="areas-info">
                      🗺️ {action.areas.length} Suchbereich{action.areas.length > 1 ? 'e' : ''} markiert
                    </p>
                  )}
                  
                  <div className="card-footer">
                    <span className="date">
                      Erstellt: {new Date(action.createdAt).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default GuestView

