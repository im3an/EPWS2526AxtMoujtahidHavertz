import { useState, useEffect, useMemo } from 'react'
import SearchActionForm from './components/SearchActionForm'
import SearchActionList from './components/SearchActionList'
import SearchFilters from './components/SearchFilters'
import { getSearchActions, saveSearchAction } from './utils/storage'
import { generateMockSearchActions } from './utils/generateMockData'
import './App.css'

function App() {
  const [searchActions, setSearchActions] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingAction, setEditingAction] = useState(null)
  const [filters, setFilters] = useState({
    searchText: '',
    petType: '',
    priority: '',
    isPublic: null,
    dateRange: ''
  })

  useEffect(() => {
    // Lade gespeicherte Suchaktionen beim Start
    const actions = getSearchActions()
    setSearchActions(actions)
  }, [])

  // Filter-Logik
  const filteredActions = useMemo(() => {
    return searchActions.filter(action => {
      // Text-Suche (Name, Beschreibung, Ort)
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase()
        const matchesSearch = 
          action.petName?.toLowerCase().includes(searchLower) ||
          action.description?.toLowerCase().includes(searchLower) ||
          action.lastSeenLocation?.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Haustier-Typ Filter
      if (filters.petType && action.petType !== filters.petType) {
        return false
      }

      // Prioritäts-Filter (prüft ob mindestens ein Bereich die Priorität hat)
      if (filters.priority) {
        const hasPriority = action.areas?.some(area => area.priority === filters.priority)
        if (!hasPriority) return false
      }

      // Sichtbarkeits-Filter
      if (filters.isPublic !== null && action.isPublic !== filters.isPublic) {
        return false
      }

      // Datum-Filter
      if (filters.dateRange) {
        const actionDate = new Date(action.createdAt)
        const now = new Date()
        const daysDiff = Math.floor((now - actionDate) / (1000 * 60 * 60 * 24))

        switch (filters.dateRange) {
          case 'today':
            if (daysDiff !== 0) return false
            break
          case 'week':
            if (daysDiff > 7) return false
            break
          case 'month':
            if (daysDiff > 30) return false
            break
        }
      }

      return true
    })
  }, [searchActions, filters])

  const handleSaveAction = (actionData) => {
    const savedAction = saveSearchAction(actionData)
    setSearchActions(getSearchActions())
    setShowForm(false)
    setEditingAction(null)
    return savedAction
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

  const handleGenerateMockData = () => {
    const count = parseInt(prompt('Wie viele Mock-Suchaktionen sollen generiert werden?', '10')) || 10
    const mockActions = generateMockSearchActions(count)
    
    // Speichere alle Mock-Aktionen
    mockActions.forEach(action => {
      saveSearchAction(action)
    })
    
    // Aktualisiere Liste
    setSearchActions(getSearchActions())
    alert(`${count} Mock-Suchaktionen wurden erstellt!`)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐾 PetFinder - Suchaktionen</h1>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleGenerateMockData} title="Mock-Daten generieren">
            🎲 Mock-Daten
          </button>
          <button className="btn-primary" onClick={handleNewAction}>
            + Neue Suchaktion
          </button>
        </div>
      </header>

      <main className="app-main">
        {showForm ? (
          <SearchActionForm
            action={editingAction}
            onSave={handleSaveAction}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
            />
            <SearchActionList
              actions={filteredActions}
              onEdit={handleEditAction}
            />
          </>
        )}
      </main>
    </div>
  )
}

export default App
