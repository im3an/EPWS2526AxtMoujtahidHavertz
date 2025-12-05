# Map v1 - Einfache interaktive Karte

Eine minimale, schlichte interaktive Kartenanwendung mit Leaflet.js.

## Features

### 🗺️ Interaktive Karte
- **Leaflet.js + OpenStreetMap**
- Vollbild-Kartenansicht
- Zoom und Navigation

### ✏️ Zeichen-Tools
- **Marker** - Einfach auf die Karte klicken, um Marker zu setzen
- **Zone** - Polygone zeichnen (mehrere Punkte setzen, Doppelklick beendet)
- **Kreis** - Kreise zeichnen (Mittelpunkt klicken, dann Radius ziehen)

## Technologie-Stack

- [Leaflet.js](https://leafletjs.com/) - Interaktive Kartenbibliothek
- [Leaflet Geoman](https://www.geoman.io/leaflet-geoman) - Zeichen-Tools für Leaflet
- OpenStreetMap - Kostenlose Kartendaten

## Installation & Nutzung

### Lokale Entwicklung

1. Lokalen Server starten (z.B. mit Python):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Oder mit Node.js (http-server)
   npx http-server -p 8000
   ```

2. Im Browser öffnen: `http://localhost:8000/Main Prototype/Map v1/index-v2.html`

### Browser-Anforderungen

- Moderne Browser mit ES6+ JavaScript Unterstützung
- Getestet mit Chrome, Firefox, Safari

## Verwendung

### Marker hinzufügen
1. Klicken Sie auf "📍 Marker" in der Toolbar
2. Klicken Sie auf die Karte, um einen Marker zu platzieren

### Zone zeichnen
1. Klicken Sie auf "🔷 Zone" in der Toolbar
2. Klicken Sie auf die Karte, um Punkte zu setzen
3. Doppelklick beendet das Zeichnen

### Kreis zeichnen
1. Klicken Sie auf "⭕ Kreis" in der Toolbar
2. Klicken Sie auf die Karte für den Mittelpunkt
3. Ziehen Sie die Maus, um den Radius zu bestimmen
4. Klicken Sie erneut, um den Kreis zu erstellen

## Projektstruktur

```
Map v1/
├── index-v2.html    # Haupt-HTML-Datei
├── styles-v2.css    # Styling
├── app-v2.js        # Hauptanwendungslogik
├── sw.js            # Service Worker (optional)
└── README.md        # Diese Datei
```

## Design-Prinzipien

- **Minimalistisch** - Nur das Nötigste
- **Schlicht** - Keine überflüssigen UI-Elemente
- **Fokus auf die Karte** - Die Karte steht im Mittelpunkt
- **Einfach zu bedienen** - Intuitive Toolbar mit 3 Tools
