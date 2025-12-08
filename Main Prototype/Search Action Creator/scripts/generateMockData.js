#!/usr/bin/env node

/**
 * Mock-Daten-Generator für Suchaktionen
 * 
 * Verwendung:
 *   node scripts/generateMockData.js [anzahl]
 * 
 * Beispiel:
 *   node scripts/generateMockData.js 20
 */

const fs = require('fs')
const path = require('path')

// Mock-Daten
const petNames = ['Mika', 'Bella', 'Max', 'Luna', 'Charlie', 'Lucy', 'Cooper', 'Daisy', 'Rocky', 'Molly', 'Buddy', 'Sophie', 'Tiger', 'Whiskers', 'Shadow']
const petTypes = ['Katze', 'Hund', 'Vogel', 'Kaninchen', 'Andere']
const descriptions = [
  'Sehr freundlich und zutraulich',
  'Etwas scheu, aber nicht aggressiv',
  'Trägt ein rotes Halsband',
  'Klein, weiß mit braunen Flecken',
  'Groß, schwarzes Fell',
  'Sehr verspielt und aktiv',
  'Älteres Tier, braucht Medikamente',
  'Junges Tier, sehr neugierig',
  'Braun-weiß gefleckt',
  'Langhaarig, sehr flauschig'
]
const locations = [
  'Garten',
  'Park',
  'Waldrand',
  'Nachbarschaft',
  'Stadtzentrum',
  'Wohngebiet',
  'Spielplatz',
  'Schule',
  'Tierpark',
  'Strand'
]

const generateRandomCoordinates = () => {
  const lat = 47 + Math.random() * 8
  const lng = 6 + Math.random() * 9
  return [lat, lng]
}

const generateRandomArea = (center, index) => {
  const [centerLat, centerLng] = center
  const radius = 0.01 + Math.random() * 0.02
  
  const numPoints = 3 + Math.floor(Math.random() * 2)
  const coordinates = []
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 2 * Math.PI) / numPoints + Math.random() * 0.5
    const lat = centerLat + radius * Math.cos(angle) + (Math.random() - 0.5) * 0.005
    const lng = centerLng + radius * Math.sin(angle) + (Math.random() - 0.5) * 0.005
    coordinates.push([lat, lng])
  }
  
  coordinates.push(coordinates[0])
  
  const priorities = ['high', 'normal', 'low']
  const priority = priorities[Math.floor(Math.random() * priorities.length)]
  
  return {
    id: `area-${Date.now()}-${index}-${Math.random()}`,
    type: 'polygon',
    coordinates: coordinates,
    priority: priority
  }
}

const generateMockPhoto = (index) => {
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
  
  return {
    id: `photo-${Date.now()}-${index}-${Math.random()}`,
    dataUrl: 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64'),
    name: `pet-photo-${index}.svg`,
    size: 2000 + Math.floor(Math.random() * 3000)
  }
}

const generateMockSearchActions = (count = 10) => {
  const actions = []
  const now = new Date()
  
  for (let i = 0; i < count; i++) {
    const petName = petNames[Math.floor(Math.random() * petNames.length)]
    const petType = petTypes[Math.floor(Math.random() * petTypes.length)]
    const description = descriptions[Math.floor(Math.random() * descriptions.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    
    const daysAgo = Math.floor(Math.random() * 30)
    const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
    
    const center = generateRandomCoordinates()
    const numAreas = 1 + Math.floor(Math.random() * 4)
    const areas = []
    for (let j = 0; j < numAreas; j++) {
      areas.push(generateRandomArea(center, j))
    }
    
    const numPhotos = Math.floor(Math.random() * 4)
    const photos = []
    for (let k = 0; k < numPhotos; k++) {
      photos.push(generateMockPhoto(k))
    }
    
    const action = {
      id: `action-${Date.now()}-${i}-${Math.random()}`,
      petName: petName,
      petType: petType,
      description: description,
      lastSeenLocation: location,
      isPublic: Math.random() > 0.3,
      areas: areas,
      photos: photos,
      createdAt: createdAt.toISOString(),
      updatedAt: createdAt.toISOString()
    }
    
    actions.push(action)
  }
  
  return actions
}

// Hauptfunktion
const main = () => {
  const count = parseInt(process.argv[2]) || 10
  
  console.log(`Generiere ${count} Mock-Suchaktionen...`)
  
  // Lade bestehende Daten
  const storagePath = path.join(__dirname, '..', 'public', 'mock-data.json')
  let existingActions = []
  
  try {
    if (fs.existsSync(storagePath)) {
      const data = fs.readFileSync(storagePath, 'utf8')
      existingActions = JSON.parse(data)
    }
  } catch (error) {
    console.warn('Konnte bestehende Daten nicht laden, starte neu:', error.message)
  }
  
  // Generiere neue Mock-Daten
  const mockActions = generateMockSearchActions(count)
  const allActions = [...existingActions, ...mockActions]
  
  // Speichere in Datei (für Entwicklung)
  fs.writeFileSync(storagePath, JSON.stringify(allActions, null, 2))
  
  // Speichere auch im LocalStorage-Format (für Browser)
  const browserFormat = JSON.stringify(allActions)
  console.log('\n=== LocalStorage-Daten (kopieren und in Browser-Konsole einfügen) ===')
  console.log(`localStorage.setItem('petfinder_search_actions', '${browserFormat.replace(/'/g, "\\'")}')`)
  console.log('\n=== Oder manuell in Browser-Konsole: ===')
  console.log(`const actions = ${JSON.stringify(allActions, null, 2)}`)
  console.log(`localStorage.setItem('petfinder_search_actions', JSON.stringify(actions))`)
  
  console.log(`\n✅ ${mockActions.length} Mock-Suchaktionen generiert!`)
  console.log(`📁 Gesamt: ${allActions.length} Suchaktionen`)
  console.log(`💾 Gespeichert in: ${storagePath}`)
}

main()

