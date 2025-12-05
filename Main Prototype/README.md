# FindMyPet - Interactive Map Prototype

## Features

### 🗺️ Interaktive Karte
- **Leaflet.js + OpenStreetMap** (ADR-0002)
- Vollständig responsive und touch-optimiert
- Zoom, Pan und Navigation

### ✏️ Zeichen-Tools
- **Marker** hinzufügen
- **Linien** zeichnen (mit Längenmessung)
- **Bereiche/Polygone** zeichnen (mit Flächenmessung)
- **Kreise** zeichnen (mit Flächenmessung)
- Alle Objekte können bearbeitet und gelöscht werden

### 📍 GPS-Tracking
- **Browser Geolocation API** (ADR-0004)
- Aktuelle Position finden
- Kontinuierliches GPS-Tracking
- Genauigkeitsanzeige
- Visualisierung der Tracking-Route

### 🔍 Suche
- Ortssuche über Nominatim (OpenStreetMap)
- Automatische Kartenzentrierung
- Marker für Suchergebnisse

### 💾 Offline-Funktionalität
- **Service Worker** für Offline-Zugriff (ADR-0004)
- **IndexedDB** für lokale Datenspeicherung
- Automatische Synchronisation bei Verbindungswiederherstellung
- Alle Anmerkungen werden lokal gespeichert

### 📝 Anmerkungen-Verwaltung
- Liste aller erstellten Anmerkungen
- Fokussierung auf einzelne Anmerkungen
- Löschen einzelner oder aller Anmerkungen
- Persistente Speicherung

## Technologie-Stack

Basierend auf den ADRs:

- **ADR-0002**: Leaflet.js + OpenStreetMap
- **ADR-0004**: Browser Geolocation API + Service Workers + IndexedDB
- **ADR-0003**: Spring Boot (für zukünftige Backend-Integration)
- **ADR-0005**: VPS (für zukünftiges Deployment)

### Verwendete Bibliotheken

- [Leaflet.js](https://leafletjs.com/) - Interaktive Kartenbibliothek
- [Leaflet Geoman](https://www.geoman.io/leaflet-geoman) - Zeichen-Tools für Leaflet
- [Turf.js](https://turfjs.org/) - Geospatial-Analysen (Flächen- und Längenberechnung)
- OpenStreetMap - Kostenlose Kartendaten
- Nominatim API - Geocoding für Ortssuche

## Installation & Nutzung

### Lokale Entwicklung

1. Öffnen Sie `index.html` in einem modernen Webbrowser
   - **Wichtig**: Für Service Worker und IndexedDB benötigen Sie einen lokalen Server

2. Lokalen Server starten (z.B. mit Python):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Oder mit Node.js (http-server)
   npx http-server -p 8000
   ```

3. Im Browser öffnen: `http://localhost:8000/Main Prototype/`

### Browser-Anforderungen

- Moderne Browser mit Unterstützung für:
  - ES6+ JavaScript
  - Service Workers
  - IndexedDB
  - Geolocation API

Getestet mit:
- Chrome/Edge (empfohlen)
- Firefox
- Safari

## Verwendung

### Marker hinzufügen
1. Klicken Sie auf das Marker-Tool (📍)
2. Klicken Sie auf die Karte, um einen Marker zu platzieren

### Linien/Bereiche zeichnen
1. Wählen Sie das entsprechende Tool (📏 Linie, 📐 Bereich, ⭕ Kreis)
2. Klicken Sie auf die Karte, um Punkte zu setzen
3. Doppelklick oder Enter beendet das Zeichnen

### GPS-Tracking
1. Klicken Sie auf "Position finden" für einmalige Positionsbestimmung
2. Klicken Sie auf "Tracking starten" für kontinuierliches Tracking
3. Die Route wird als rote Linie angezeigt

### Ortssuche
1. Geben Sie einen Ortsnamen in das Suchfeld ein
2. Klicken Sie auf 🔍 oder drücken Sie Enter
3. Die Karte zentriert sich auf das Suchergebnis

### Offline-Nutzung
- Die App funktioniert auch offline
- Alle Anmerkungen werden lokal gespeichert
- Bei Verbindungswiederherstellung werden Daten synchronisiert

## Projektstruktur

```
Main Prototype/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # Styling
├── app.js              # Hauptanwendungslogik
├── sw.js               # Service Worker für Offline-Funktionalität
└── README.md           # Diese Datei
```

## Nächste Schritte

Für die vollständige Implementierung:

1. **Backend-Integration** (ADR-0003)
   - Spring Boot REST API
   - Datenbankanbindung (PostgreSQL/MySQL)
   - Authentifizierung

2. **Erweiterte Features**
   - Echtzeit-Kollaboration (WebSockets)
   - Benutzerverwaltung
   - Karten-Sharing
   - Export als GeoJSON

3. **Deployment** (ADR-0005)
   - VPS-Setup
   - Nginx-Konfiguration
   - SSL-Zertifikate
   - CI/CD-Pipeline

## Lizenz

Dieses Projekt ist Teil des Entwicklungsprojekts WiSe 25/26.
