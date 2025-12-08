# Search Action Creator - Prototyp

Ein React-basierter Prototyp für die Erstellung von Suchaktionen für vermisste Haustiere.

## Features

### 🐾 Suchaktionen erstellen
- Haustier-Informationen eingeben (Name, Typ, Beschreibung)
- **Mehrere Fotos hochladen** (bis zu 5 Fotos pro Suchaktion)
- Letzten bekannten Ort angeben
- Suchbereiche auf einer interaktiven Karte markieren
- Prioritäten für Suchbereiche setzen (Hoch, Normal, Niedrig)
- Suchaktionen als öffentlich oder privat markieren

### 🗺️ Kartenfunktionalität
- Interaktive Karte mit Leaflet.js und OpenStreetMap
- **Adresssuche** - Adressen oder Orte suchen und zur Karte springen
- Bereiche als Polygone auf der Karte zeichnen
- Farbcodierte Bereiche basierend auf Priorität
- Bereiche löschen und bearbeiten
- **Kartenvorschau** in der Liste mit expandierbarer Ansicht

### 🔍 Filter & Suche
- **Textsuche** - Durchsucht Name, Beschreibung und Ort
- **Filter nach Haustier-Typ** (Katze, Hund, Vogel, etc.)
- **Filter nach Priorität** (Hoch, Normal, Niedrig)
- **Filter nach Sichtbarkeit** (Öffentlich, Privat)
- **Filter nach Zeitraum** (Heute, Letzte Woche, Letzter Monat)
- Alle Filter können kombiniert werden

### 💾 Lokale Datenspeicherung
- Alle Suchaktionen werden im LocalStorage gespeichert
- Persistenz über Browser-Sessions hinweg
- Bearbeitung bestehender Suchaktionen

### 🎲 Mock-Daten Generator
- Generiere Testdaten direkt im Browser oder via Command-Line
- Perfekt für Entwicklung und Testing

## Technologie-Stack

- **React 19** - Frontend-Framework
- **Vite** - Build-Tool und Development-Server
- **Leaflet.js** - Interaktive Kartenbibliothek
- **react-leaflet** - React-Wrapper für Leaflet
- **@geoman-io/leaflet-geoman-free** - Zeichen-Tools für Leaflet
- **OpenStreetMap** - Kostenlose Kartendaten

## Installation

```bash
# Dependencies installieren
npm install

# Development-Server starten
npm run dev

# Production-Build erstellen
npm run build
```

## Verwendung

### Neue Suchaktion erstellen

1. Klicken Sie auf "Neue Suchaktion" im Header
2. Füllen Sie das Formular aus:
   - Name des Haustiers (Pflichtfeld)
   - Haustier-Typ auswählen
   - Optionale Beschreibung
   - Letzter bekannter Ort
   - **Fotos hochladen** (bis zu 5 Fotos, max. 5MB pro Foto)
3. Markieren Sie Bereiche auf der Karte:
   - **Adresse suchen**: Geben Sie eine Adresse im Suchfeld ein und drücken Sie Enter
   - Wählen Sie eine Priorität (Normal, Hoch, Niedrig)
   - Klicken Sie auf "Polygon zeichnen" in der Karte
   - Klicken Sie auf die Karte, um Punkte zu setzen
   - Doppelklick beendet das Zeichnen
4. Aktivieren Sie "Öffentlich machen", wenn die Suchaktion für alle sichtbar sein soll
5. Klicken Sie auf "Suchaktion erstellen"

### Filter & Suche verwenden

1. Verwenden Sie das Filter-Panel über der Liste
2. Geben Sie Text in das Suchfeld ein (durchsucht Name, Beschreibung, Ort)
3. Wählen Sie Filter aus den Dropdown-Menüs
4. Filter können kombiniert werden
5. Klicken Sie auf "Filter zurücksetzen", um alle Filter zu löschen

### Kartenvorschau

- Klicken Sie auf "▶ Kartenansicht" in einer Suchaktion, um die Karte zu erweitern
- Die Karte zeigt alle markierten Suchbereiche mit ihren Prioritäten
- Klicken Sie erneut, um die Karte wieder zu minimieren

### Suchaktion bearbeiten

1. Klicken Sie auf "Bearbeiten" bei einer bestehenden Suchaktion
2. Nehmen Sie die gewünschten Änderungen vor
3. Klicken Sie auf "Aktualisieren"

### Bereiche löschen

1. Klicken Sie auf einen markierten Bereich auf der Karte
2. Klicken Sie auf "Löschen" im Popup

## Projektstruktur

```
Search Action Creator/
├── src/
│   ├── components/
│   │   ├── SearchActionForm.jsx      # Formular für Suchaktions-Erstellung
│   │   ├── SearchActionForm.css
│   │   ├── MapComponent.jsx          # Kartenkomponente mit Bereichsmarkierung
│   │   ├── MapComponent.css
│   │   ├── SearchActionList.jsx       # Liste der erstellten Suchaktionen
│   │   └── SearchActionList.css
│   ├── utils/
│   │   └── storage.js                 # LocalStorage-Helper-Funktionen
│   ├── App.jsx                        # Hauptkomponente
│   ├── App.css
│   ├── index.css
│   └── main.jsx                       # Entry-Point
├── package.json
└── README.md
```

## Hauptfunktionen (MVP)

✅ Account-ähnliche Funktionalität (lokale Speicherung)  
✅ Suchaktion erstellen mit Haustier-Informationen  
✅ Bereiche auf Karte markieren (Polygone)  
✅ Prioritäten für Bereiche setzen  
✅ Öffentlich/Privat-Toggle  
✅ Übersicht aller erstellten Suchaktionen  
✅ Bearbeitung bestehender Suchaktionen  

## Mock-Daten generieren

### Im Browser
1. Klicken Sie auf den "🎲 Mock-Daten" Button im Header
2. Geben Sie die Anzahl der zu generierenden Suchaktionen ein
3. Die Mock-Daten werden automatisch erstellt und gespeichert

### Via Command-Line
```bash
# Generiere 20 Mock-Suchaktionen
npm run generate-mock 20

# Oder direkt mit Node
node scripts/generateMockData.js 20
```

Die generierten Daten werden im LocalStorage gespeichert und können sofort in der App verwendet werden.

## Nächste Schritte

- [x] ✅ Foto-Upload für Haustiere
- [x] ✅ Adresssuche auf der Karte
- [x] ✅ Filter & erweiterte Suche
- [x] ✅ Kartenvorschau in der Liste
- [x] ✅ Mock-Daten-Generator
- [ ] GPS-Tracking während der Suche
- [ ] Bereiche als "durchsucht" markieren
- [ ] Benachrichtigungen bei Updates
- [ ] Backend-Integration (Spring Boot)
- [ ] Authentifizierung und echte User-Accounts
- [ ] Teilen-Funktionalität für öffentliche Suchaktionen

## Browser-Kompatibilität

- Chrome/Edge (empfohlen)
- Firefox
- Safari
- Moderne Browser mit ES6+ Unterstützung

## Hinweise

- Alle Daten werden lokal im Browser gespeichert (LocalStorage)
- Bei gelöschten Browser-Daten gehen die Suchaktionen verloren
- Für Produktion ist eine Backend-Integration erforderlich
- GPS-Funktionalität erfordert Browser-Berechtigungen
