// Mock-Daten-Generator für Suchaktionen

const petNames = ['Mika', 'Bella', 'Max', 'Luna', 'Charlie', 'Lucy', 'Cooper', 'Daisy', 'Rocky', 'Molly']
const petTypes = ['Katze', 'Hund', 'Vogel', 'Kaninchen', 'Andere']
const descriptions = [
  'Sehr freundlich und zutraulich',
  'Etwas scheu, aber nicht aggressiv',
  'Trägt ein rotes Halsband',
  'Klein, weiß mit braunen Flecken',
  'Groß, schwarzes Fell',
  'Sehr verspielt und aktiv',
  'Älteres Tier, braucht Medikamente',
  'Junges Tier, sehr neugierig'
]
const locations = [
  'Garten',
  'Park',
  'Waldrand',
  'Nachbarschaft',
  'Stadtzentrum',
  'Wohngebiet',
  'Spielplatz',
  'Schule'
]

// Generiere zufällige Koordinaten in Deutschland
const generateRandomCoordinates = () => {
  // Deutschland grob: 47°N - 55°N, 6°E - 15°E
  const lat = 47 + Math.random() * 8
  const lng = 6 + Math.random() * 9
  return [lat, lng]
}

// Generiere zufälligen Polygon-Bereich
const generateRandomArea = (center, index) => {
  const [centerLat, centerLng] = center
  const radius = 0.01 + Math.random() * 0.02 // ~1-3km
  
  // Erstelle ein einfaches Polygon (Dreieck oder Viereck)
  const numPoints = 3 + Math.floor(Math.random() * 2) // 3 oder 4 Punkte
  const coordinates = []
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 2 * Math.PI) / numPoints + Math.random() * 0.5
    const lat = centerLat + radius * Math.cos(angle) + (Math.random() - 0.5) * 0.005
    const lng = centerLng + radius * Math.sin(angle) + (Math.random() - 0.5) * 0.005
    coordinates.push([lat, lng])
  }
  
  // Schließe Polygon
  coordinates.push(coordinates[0])
  
  const priorities = ['high', 'normal', 'low']
  const priority = priorities[Math.floor(Math.random() * priorities.length)]
  
  return {
    id: `area-${Date.now()}-${index}`,
    type: 'polygon',
    coordinates: coordinates,
    priority: priority
  }
}

// Generiere Mock-Foto (Base64 Data URL für Platzhalter)
const generateMockPhoto = (index) => {
  // Erstelle einen einfachen SVG als Platzhalter
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']
  const color = colors[Math.floor(Math.random() * colors.length)]
  
  const svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="${color}"/>
    <circle cx="200" cy="150" r="60" fill="white" opacity="0.8"/>
    <ellipse cx="180" cy="140" rx="15" ry="20" fill="#333"/>
    <ellipse cx="220" cy="140" rx="15" ry="20" fill="#333"/>
    <path d="M 170 180 Q 200 200 230 180" stroke="#333" stroke-width="3" fill="none"/>
    <text x="200" y="280" font-family="Arial" font-size="24" fill="white" text-anchor="middle" font-weight="bold">Pet Photo</text>
  </svg>`
  
  // Encode SVG für Data URL
  const encodedSvg = encodeURIComponent(svg)
  
  return {
    id: `photo-${Date.now()}-${index}-${Math.random()}`,
    dataUrl: `data:image/svg+xml;charset=utf-8,${encodedSvg}`,
    name: `pet-photo-${index}.svg`,
    size: 2000 + Math.floor(Math.random() * 3000)
  }
}

export const generateMockSearchActions = (count = 10) => {
  const actions = []
  const now = new Date()
  
  for (let i = 0; i < count; i++) {
    const petName = petNames[Math.floor(Math.random() * petNames.length)]
    const petType = petTypes[Math.floor(Math.random() * petTypes.length)]
    const description = descriptions[Math.floor(Math.random() * descriptions.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    
    // Zufälliges Datum in den letzten 30 Tagen
    const daysAgo = Math.floor(Math.random() * 30)
    const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
    
    // Generiere Bereiche
    const center = generateRandomCoordinates()
    const numAreas = 1 + Math.floor(Math.random() * 4) // 1-4 Bereiche
    const areas = []
    for (let j = 0; j < numAreas; j++) {
      areas.push(generateRandomArea(center, j))
    }
    
    // Generiere Fotos (0-3 Fotos)
    const numPhotos = Math.floor(Math.random() * 4)
    const photos = []
    for (let k = 0; k < numPhotos; k++) {
      photos.push(generateMockPhoto(k))
    }
    
    const action = {
      id: `action-${Date.now()}-${i}`,
      petName: petName,
      petType: petType,
      description: description,
      lastSeenLocation: location,
      isPublic: Math.random() > 0.3, // 70% öffentlich
      areas: areas,
      photos: photos,
      createdAt: createdAt.toISOString(),
      updatedAt: createdAt.toISOString()
    }
    
    actions.push(action)
  }
  
  return actions
}

// Speichere Mock-Daten im LocalStorage
export const seedMockData = (count = 10) => {
  const existingActions = JSON.parse(localStorage.getItem('petfinder_search_actions') || '[]')
  const mockActions = generateMockSearchActions(count)
  
  // Füge Mock-Daten zu bestehenden hinzu (vermeide Duplikate)
  const allActions = [...existingActions, ...mockActions]
  localStorage.setItem('petfinder_search_actions', JSON.stringify(allActions))
  
  return mockActions.length
}

