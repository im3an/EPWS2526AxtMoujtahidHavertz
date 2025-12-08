import './SearchFilters.css'

function SearchFilters({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      searchText: '',
      petType: '',
      priority: '',
      isPublic: null,
      dateRange: ''
    })
  }

  const hasActiveFilters = filters.searchText || filters.petType || filters.priority || 
                          filters.isPublic !== null || filters.dateRange

  return (
    <div className="search-filters">
      <div className="filters-header">
        <h3>Filter & Suche</h3>
        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Filter zurücksetzen
          </button>
        )}
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="searchText">Suche</label>
          <input
            type="text"
            id="searchText"
            placeholder="Name, Beschreibung, Ort..."
            value={filters.searchText || ''}
            onChange={(e) => handleFilterChange('searchText', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="petType">Haustier-Typ</label>
          <select
            id="petType"
            value={filters.petType || ''}
            onChange={(e) => handleFilterChange('petType', e.target.value)}
          >
            <option value="">Alle</option>
            <option value="Katze">Katze</option>
            <option value="Hund">Hund</option>
            <option value="Vogel">Vogel</option>
            <option value="Kaninchen">Kaninchen</option>
            <option value="Andere">Andere</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority">Priorität</label>
          <select
            id="priority"
            value={filters.priority || ''}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="">Alle</option>
            <option value="high">Hoch</option>
            <option value="normal">Normal</option>
            <option value="low">Niedrig</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="isPublic">Sichtbarkeit</label>
          <select
            id="isPublic"
            value={filters.isPublic === null ? '' : filters.isPublic ? 'public' : 'private'}
            onChange={(e) => {
              const value = e.target.value
              handleFilterChange('isPublic', value === '' ? null : value === 'public')
            }}
          >
            <option value="">Alle</option>
            <option value="public">Öffentlich</option>
            <option value="private">Privat</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="dateRange">Zeitraum</label>
          <select
            id="dateRange"
            value={filters.dateRange || ''}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
          >
            <option value="">Alle</option>
            <option value="today">Heute</option>
            <option value="week">Letzte Woche</option>
            <option value="month">Letzter Monat</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchFilters

