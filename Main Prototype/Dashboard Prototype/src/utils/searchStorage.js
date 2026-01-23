// Search action storage utilities (compatible with Search Action Creator)

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

export const getSearchActionsByUser = (userId) => {
  const actions = getSearchActions()
  return actions.filter(action => action.createdBy === userId)
}

export const getPublicSearchActions = () => {
  const actions = getSearchActions()
  return actions.filter(action => action.isPublic === true)
}

export const saveSearchAction = (action) => {
  try {
    const actions = getSearchActions()
    const existingIndex = actions.findIndex(a => a.id === action.id)
    
    if (existingIndex >= 0) {
      actions[existingIndex] = action
    } else {
      actions.push(action)
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actions))
    return action
  } catch (error) {
    console.error('Fehler beim Speichern der Suchaktion:', error)
    throw error
  }
}

export const deleteSearchAction = (id, userId) => {
  try {
    const actions = getSearchActions()
    const action = actions.find(a => a.id === id)
    
    // Check if user has permission (admin or owner)
    if (action && (action.createdBy === userId || userId === 'admin-1')) {
      const filtered = actions.filter(a => a.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
      return true
    }
    
    return false
  } catch (error) {
    console.error('Fehler beim Löschen der Suchaktion:', error)
    return false
  }
}

