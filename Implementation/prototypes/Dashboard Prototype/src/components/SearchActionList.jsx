import './SearchActionList.css'

function SearchActionList({ actions, onEdit, onDelete, showDelete = false }) {
  if (actions.length === 0) {
    return (
      <div className="empty-state">
        <p>Keine Suchaktionen gefunden.</p>
      </div>
    )
  }

  return (
    <div className="search-action-list">
      <div className="actions-grid">
        {actions.map(action => (
          <div key={action.id} className="action-card">
            <div className="card-header">
              <div>
                <h3>{action.petName || 'Unbenannt'}</h3>
                <span className={`visibility-badge ${action.isPublic ? 'public' : 'private'}`}>
                  {action.isPublic ? '🌐 Öffentlich' : '🔒 Privat'}
                </span>
              </div>
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
              <div className="card-meta">
                <span className="date">
                  Erstellt: {new Date(action.createdAt).toLocaleDateString('de-DE')}
                </span>
                {action.updatedAt && (
                  <span className="date">
                    Aktualisiert: {new Date(action.updatedAt).toLocaleDateString('de-DE')}
                  </span>
                )}
              </div>
              <div className="card-actions">
                <button 
                  className="btn-edit"
                  onClick={() => onEdit(action)}
                >
                  ✏️ Bearbeiten
                </button>
                {showDelete && onDelete && (
                  <button 
                    className="btn-delete"
                    onClick={() => onDelete(action.id)}
                  >
                    🗑️ Löschen
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchActionList

