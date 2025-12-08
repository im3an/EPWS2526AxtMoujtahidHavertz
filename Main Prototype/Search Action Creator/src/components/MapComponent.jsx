import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import '@geoman-io/leaflet-geoman-free'
import 'leaflet/dist/leaflet.css'
import { geocodeAddress } from '../utils/geocoding'
import './MapComponent.css'

// Fix für Standard-Marker-Icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function MapController({ areas, onAreasChange, onLocationChange }) {
  const map = useMap()
  const drawnLayersRef = useRef(new Map())
  const currentToolRef = useRef('polygon')
  const currentPriorityRef = useRef('normal')
  const searchMarkerRef = useRef(null)

  useEffect(() => {
    // Geoman initialisieren
    map.pm.addControls({
      position: 'topleft',
      drawCircle: false,
      drawMarker: false,
      drawPolyline: false,
      drawRectangle: false,
      drawPolygon: true,
      editMode: false,
      dragMode: false,
      cutPolygon: false,
      removalMode: false
    })

    // Event-Handler für gezeichnete Bereiche
    const handleCreate = (e) => {
      const layer = e.layer
      const id = `area-${Date.now()}`
      
      // Styling basierend auf Priorität
      const priority = currentPriorityRef.current
      const color = priority === 'high' ? '#ff4444' : priority === 'normal' ? '#624EEF' : '#888888'
      
      layer.setStyle({
        color: color,
        fillColor: color,
        fillOpacity: 0.2,
        weight: 2
      })

      // Popup mit Priorität und Löschen-Button
      const popupContent = `
        <div class="area-popup">
          <strong>Priorität: ${priority === 'high' ? 'Hoch' : priority === 'normal' ? 'Normal' : 'Niedrig'}</strong>
          <button class="delete-area-btn" data-id="${id}">Löschen</button>
        </div>
      `
      layer.bindPopup(popupContent).openPopup()

      // Speichere Layer-Referenz
      drawnLayersRef.current.set(id, { layer, priority })

      // Aktualisiere Areas
      const latlngs = layer.getLatLngs()[0] || layer.getLatLngs()
      const coordinates = latlngs.map(ll => [ll.lat, ll.lng])
      
      const newArea = {
        id,
        type: layer instanceof L.Circle ? 'circle' : 'polygon',
        coordinates,
        priority,
        center: layer instanceof L.Circle ? [layer.getLatLng().lat, layer.getLatLng().lng] : null,
        radius: layer instanceof L.Circle ? layer.getRadius() : null
      }

      onAreasChange([...areas, newArea])
    }

    // Event-Handler für Popup-Buttons
    const handlePopupClick = (e) => {
      if (e.target.classList.contains('delete-area-btn')) {
        const id = e.target.getAttribute('data-id')
        const areaData = drawnLayersRef.current.get(id)
        if (areaData) {
          map.removeLayer(areaData.layer)
          drawnLayersRef.current.delete(id)
          onAreasChange(areas.filter(a => a.id !== id))
        }
      }
    }

    map.on('pm:create', handleCreate)
    document.addEventListener('click', handlePopupClick)

    // Lade bestehende Areas (nur wenn noch nicht geladen)
    areas.forEach(area => {
      // Prüfe ob Area bereits geladen ist
      if (!drawnLayersRef.current.has(area.id)) {
        let layer
        if (area.type === 'circle' && area.center && area.radius) {
          layer = L.circle(area.center, { radius: area.radius })
        } else {
          layer = L.polygon(area.coordinates)
        }

        const color = area.priority === 'high' ? '#ff4444' : area.priority === 'normal' ? '#624EEF' : '#888888'
        layer.setStyle({
          color: color,
          fillColor: color,
          fillOpacity: 0.2,
          weight: 2
        })

        const popupContent = `
          <div class="area-popup">
            <strong>Priorität: ${area.priority === 'high' ? 'Hoch' : area.priority === 'normal' ? 'Normal' : 'Niedrig'}</strong>
            <button class="delete-area-btn" data-id="${area.id}">Löschen</button>
          </div>
        `
        layer.bindPopup(popupContent)
        layer.addTo(map)
        drawnLayersRef.current.set(area.id, { layer, priority: area.priority })
      }
    })

    // Entferne Areas, die nicht mehr in der Liste sind
    drawnLayersRef.current.forEach((data, id) => {
      if (!areas.find(a => a.id === id)) {
        map.removeLayer(data.layer)
        drawnLayersRef.current.delete(id)
      }
    })

    return () => {
      map.off('pm:create', handleCreate)
      document.removeEventListener('click', handlePopupClick)
    }
  }, [map, areas, onAreasChange])

  const setPriority = (priority, event) => {
    currentPriorityRef.current = priority
    // Visual Feedback
    const buttons = document.querySelectorAll('.priority-btn')
    buttons.forEach(btn => btn.classList.remove('active'))
    if (event?.target) {
      event.target.classList.add('active')
    }
  }

  const handleLocationSearch = async (address) => {
    if (!address.trim()) return
    
    const result = await geocodeAddress(address)
    if (result) {
      map.setView([result.lat, result.lng], 15)
      
      // Entferne alten Marker
      if (searchMarkerRef.current) {
        map.removeLayer(searchMarkerRef.current)
      }
      
      // Füge neuen Marker hinzu
      const marker = L.marker([result.lat, result.lng])
        .addTo(map)
        .bindPopup(result.displayName)
        .openPopup()
      
      searchMarkerRef.current = marker
      
      if (onLocationChange) {
        onLocationChange({ lat: result.lat, lng: result.lng, address: result.displayName })
      }
    }
  }

  return (
    <div className="map-controls">
      <div className="address-search">
        <input
          type="text"
          placeholder="Adresse oder Ort suchen..."
          className="address-input"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleLocationSearch(e.target.value)
            }
          }}
        />
        <button
          type="button"
          className="search-btn"
          onClick={(e) => {
            const input = e.target.previousElementSibling
            handleLocationSearch(input.value)
          }}
        >
          🔍
        </button>
      </div>
      
      <div className="priority-selector">
        <span>Priorität für nächsten Bereich:</span>
        <button 
          className="priority-btn active" 
          onClick={(e) => setPriority('normal', e)}
        >
          Normal
        </button>
        <button 
          className="priority-btn priority-high" 
          onClick={(e) => setPriority('high', e)}
        >
          Hoch
        </button>
        <button 
          className="priority-btn priority-low" 
          onClick={(e) => setPriority('low', e)}
        >
          Niedrig
        </button>
      </div>
      <p className="map-hint">
        Klicken Sie auf "Polygon zeichnen" in der Karte, um einen Bereich zu markieren.
        Doppelklick beendet das Zeichnen.
      </p>
    </div>
  )
}

function MapComponent({ areas = [], onAreasChange, onLocationChange, center, zoom = 13 }) {
  return (
    <div className="map-component">
      <MapContainer
        center={center || [51.1657, 10.4515]}
        zoom={zoom}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapController 
          areas={areas} 
          onAreasChange={onAreasChange}
          onLocationChange={onLocationChange}
        />
      </MapContainer>
    </div>
  )
}

export default MapComponent

