import { useState } from 'react'
import MapPreview from './MapPreview'
import './SearchActionList.css'

function SearchActionList({ actions, onEdit }) {
  const [expandedMaps, setExpandedMaps] = useState({})
  if (actions.length === 0) {
    return (
      <div className="empty-state">
        <p>Noch keine Suchaktionen erstellt.</p>
        <p>Erstellen Sie eine neue Suchaktion, um zu beginnen.</p>
      </div>
    )
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444'
      case 'normal': return '#624EEF'
      case 'low': return '#888888'
      default: return '#624EEF'
    }
  }

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Hoch'
      case 'normal': return 'Normal'
      case 'low': return 'Niedrig'
      default: return 'Normal'
    }
  }

  const toggleMap = (actionId) => {
    setExpandedMaps(prev => ({
      ...prev,
      [actionId]: !prev[actionId]
    }))
  }

  return (
    <div className="search-action-list">
      <h2>Meine Suchaktionen ({actions.length})</h2>
      <div className="actions-grid">
        {actions.map(action => (
          <div key={action.id} className="action-card">
            <div className="action-header">
              <h3>{action.petName}</h3>
              <span className={`status-badge ${action.isPublic ? 'public' : 'private'}`}>
                {action.isPublic ? 'Öffentlich' : 'Privat'}
              </span>
            </div>

            {action.photos && action.photos.length > 0 && (
              <div className="action-photos">
                <div className="photos-preview">
                  {action.photos.slice(0, 3).map((photo, idx) => (
                    <img
                      key={photo.id || idx}
                      src={photo.dataUrl}
                      alt={`${action.petName} - Foto ${idx + 1}`}
                      className="photo-thumbnail"
                    />
                  ))}
                  {action.photos.length > 3 && (
                    <div className="photo-more">+{action.photos.length - 3}</div>
                  )}
                </div>
              </div>
            )}
            
            <div className="action-info">
              <p><strong>Typ:</strong> {action.petType}</p>
              {action.description && (
                <p><strong>Beschreibung:</strong> {action.description}</p>
              )}
              {action.lastSeenLocation && (
                <p><strong>Letzter bekannter Ort:</strong> {action.lastSeenLocation}</p>
              )}
              <p><strong>Suchbereiche:</strong> {action.areas?.length || 0}</p>
            </div>

            {action.areas && action.areas.length > 0 && (
              <MapPreview
                areas={action.areas}
                expanded={expandedMaps[action.id] || false}
                onToggle={() => toggleMap(action.id)}
              />
            )}

            {action.areas && action.areas.length > 0 && (
              <div className="areas-preview">
                <strong>Bereiche:</strong>
                <div className="areas-list">
                  {action.areas.map((area, idx) => (
                    <span
                      key={area.id || idx}
                      className="area-badge"
                      style={{ 
                        backgroundColor: getPriorityColor(area.priority),
                        color: 'white'
                      }}
                    >
                      {getPriorityLabel(area.priority)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="action-footer">
              <button 
                className="btn-edit"
                onClick={() => onEdit(action)}
              >
                Bearbeiten
              </button>
              <span className="action-date">
                {new Date(action.createdAt).toLocaleDateString('de-DE')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchActionList

