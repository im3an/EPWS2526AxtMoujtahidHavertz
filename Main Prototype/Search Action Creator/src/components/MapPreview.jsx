import { useState } from 'react'
import { MapContainer, TileLayer, Polygon, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapPreview.css'

// Fix für Standard-Marker-Icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function MapPreview({ areas, expanded, onToggle }) {
  if (!areas || areas.length === 0) {
    return null
  }

  // Berechne Bounds für alle Bereiche
  const calculateBounds = () => {
    let allPoints = []
    areas.forEach(area => {
      if (area.coordinates) {
        allPoints = [...allPoints, ...area.coordinates]
      } else if (area.center) {
        allPoints.push(area.center)
      }
    })
    
    if (allPoints.length === 0) return null
    
    const lats = allPoints.map(p => p[0] || p.lat)
    const lngs = allPoints.map(p => p[1] || p.lng)
    
    return [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)]
    ]
  }

  const bounds = calculateBounds()
  const center = bounds 
    ? [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2]
    : [51.1657, 10.4515]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444'
      case 'normal': return '#624EEF'
      case 'low': return '#888888'
      default: return '#624EEF'
    }
  }

  return (
    <div className={`map-preview ${expanded ? 'expanded' : ''}`}>
      <div className="map-preview-header" onClick={onToggle}>
        <span className="map-preview-title">
          {expanded ? '▼' : '▶'} Kartenansicht ({areas.length} {areas.length === 1 ? 'Bereich' : 'Bereiche'})
        </span>
      </div>
      
      {expanded && (
        <div className="map-preview-content">
          <MapContainer
            center={center}
            zoom={bounds ? 12 : 13}
            style={{ height: expanded ? '400px' : '200px', width: '100%' }}
            bounds={bounds ? bounds : undefined}
            boundsOptions={bounds ? { padding: [20, 20] } : undefined}
          >
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {areas.map((area, idx) => {
              const color = getPriorityColor(area.priority)
              if (area.type === 'circle' && area.center && area.radius) {
                return (
                  <Circle
                    key={area.id || idx}
                    center={area.center}
                    radius={area.radius}
                    pathOptions={{
                      color: color,
                      fillColor: color,
                      fillOpacity: 0.2,
                      weight: 2
                    }}
                  />
                )
              } else if (area.coordinates) {
                return (
                  <Polygon
                    key={area.id || idx}
                    positions={area.coordinates}
                    pathOptions={{
                      color: color,
                      fillColor: color,
                      fillOpacity: 0.2,
                      weight: 2
                    }}
                  />
                )
              }
              return null
            })}
          </MapContainer>
        </div>
      )}
    </div>
  )
}

export default MapPreview

