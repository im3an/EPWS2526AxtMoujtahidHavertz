const STORAGE_KEY = 'petfinder_search_actions'

export const getSearchActions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Fehler beim Laden der Suchaktionen:', error)
    return []
  }
}

export const saveSearchAction = (action) => {
  try {
    const actions = getSearchActions()
    const existingIndex = actions.findIndex(a => a.id === action.id)
    
    if (existingIndex >= 0) {
      // Aktualisiere bestehende Aktion
      actions[existingIndex] = action
    } else {
      // Füge neue Aktion hinzu
      actions.push(action)
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actions))
    return action
  } catch (error) {
    console.error('Fehler beim Speichern der Suchaktion:', error)
    throw error
  }
}

export const deleteSearchAction = (id) => {
  try {
    const actions = getSearchActions()
    const filtered = actions.filter(a => a.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('Fehler beim Löschen der Suchaktion:', error)
    return false
  }
}

