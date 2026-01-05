import { useState, useEffect } from 'react'
import './SearchActionForm.css'

function SearchActionForm({ action, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    petName: '',
    petType: 'Katze',
    description: '',
    lastSeenLocation: '',
    isPublic: false,
    areas: [],
    photos: [],
    createdAt: new Date().toISOString()
  })

  useEffect(() => {
    if (action) {
      setFormData({
        ...action,
        areas: action.areas || [],
        photos: action.photos || []
      })
    }
  }, [action])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.petName.trim()) {
      alert('Bitte geben Sie den Namen des Haustiers ein.')
      return
    }

    const actionData = {
      ...formData,
      id: action?.id || `action-${Date.now()}`,
      updatedAt: new Date().toISOString()
    }

    onSave(actionData)
  }

  return (
    <div className="search-action-form">
      <h2>{action ? 'Suchaktion bearbeiten' : 'Neue Suchaktion erstellen'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Haustier-Informationen</h3>
          
          <div className="form-group">
            <label htmlFor="petName">Name des Haustiers *</label>
            <input
              type="text"
              id="petName"
              name="petName"
              value={formData.petName}
              onChange={handleInputChange}
              required
              placeholder="z.B. Mika"
            />
          </div>

          <div className="form-group">
            <label htmlFor="petType">Haustier-Typ</label>
            <select
              id="petType"
              name="petType"
              value={formData.petType}
              onChange={handleInputChange}
            >
              <option value="Katze">Katze</option>
              <option value="Hund">Hund</option>
              <option value="Andere">Andere</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Beschreibung</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Weitere Informationen zum Haustier..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastSeenLocation">Letzter bekannter Ort</label>
            <input
              type="text"
              id="lastSeenLocation"
              name="lastSeenLocation"
              value={formData.lastSeenLocation}
              onChange={handleInputChange}
              placeholder="z.B. Garten, Park, etc."
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Einstellungen</h3>
          
          <div className="form-group checkbox-group">
            <label htmlFor="isPublic">
              <input
                type="checkbox"
                id="isPublic"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleInputChange}
              />
              <span>Suchaktion öffentlich machen</span>
            </label>
            <p className="form-hint">
              Öffentliche Suchaktionen sind für alle Nutzer sichtbar und können von Freiwilligen gefunden werden.
            </p>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Abbrechen
          </button>
          <button type="submit" className="btn-primary">
            {action ? 'Aktualisieren' : 'Suchaktion erstellen'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchActionForm

