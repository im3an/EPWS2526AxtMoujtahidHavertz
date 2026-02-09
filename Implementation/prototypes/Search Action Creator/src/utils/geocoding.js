// Geocoding mit Nominatim (OpenStreetMap)
export const geocodeAddress = async (address) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          'User-Agent': 'PetFinder App'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Geocoding fehlgeschlagen')
    }
    
    const data = await response.json()
    
    if (data.length === 0) {
      return null
    }
    
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      displayName: data[0].display_name
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

export const reverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: {
          'User-Agent': 'PetFinder App'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Reverse geocoding fehlgeschlagen')
    }
    
    const data = await response.json()
    return data.display_name || null
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    return null
  }
}

