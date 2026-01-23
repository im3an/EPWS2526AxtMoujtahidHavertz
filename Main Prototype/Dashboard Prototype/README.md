# Dashboard Prototype - ID-basierte Authentifizierung

Dieser Prototyp implementiert ein Dashboard mit ID-basierter Authentifizierung (PIN/TAN-System) für das PetFinder-Projekt.

## Features

### Admin-Funktionen
- **Benutzerverwaltung**: Temp Users mit PIN/TAN erstellen
- **Einladungscodes**: Generierung von Invitation Codes für Suchaktionen
- **User-Rollen verwalten**: Aktivieren/Deaktivieren von Benutzern

### Temp User-Funktionen
- **Anmeldung**: Login mit PIN/TAN
- **Dashboard-Übersicht**: Alle eigenen Suchaktionen anzeigen
- **Suchen erstellen**: Öffentliche oder private Suchaktionen erstellen
- **Suchen löschen**: Eigene Suchaktionen löschen
- **Filter**: Nach öffentlich/privat filtern

### Guest User
- **Öffentliche Suchen**: Alle öffentlichen Suchaktionen ohne Anmeldung einsehen
- **Anmeldung**: Möglichkeit zur Anmeldung

## Technologie-Stack

- **React 19.2.0**: Frontend-Framework
- **Vite**: Build-Tool
- **LocalStorage**: Datenpersistenz (für Prototyp)

## Installation

```bash
cd "Main Prototype/Dashboard Prototype"
npm install
npm run dev
```

## Standard-Admin-Zugang

Beim ersten Start wird automatisch ein Standard-Admin-Benutzer erstellt:
- **PIN**: `1234`
- **TAN**: `ADMIN1`

⚠️ **Wichtig**: In der Produktion sollte dieser Standard-Admin geändert werden!

## Datenstruktur

### Benutzer (Users)
```javascript
{
  id: "user-1234567890",
  username: "Helfer-1",
  role: "temp_user", // oder "admin"
  pin: "1234",
  tan: "ABC123",
  tanExpiration: "2024-02-01T00:00:00.000Z",
  createdAt: "2024-01-01T00:00:00.000Z",
  isActive: true
}
```

### Suchaktionen (Search Actions)
```javascript
{
  id: "action-1234567890",
  petName: "Mika",
  petType: "Katze",
  description: "...",
  lastSeenLocation: "...",
  isPublic: true,
  areas: [],
  photos: [],
  createdBy: "user-1234567890",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

### Einladungscodes (Invitation Codes)
```javascript
{
  code: "ABC12345",
  createdAt: "2024-01-01T00:00:00.000Z",
  expiresAt: "2024-01-08T00:00:00.000Z",
  used: false
}
```

## Kompatibilität

Dieser Prototyp verwendet die gleiche Datenstruktur für Suchaktionen wie der "Search Action Creator" Prototyp, sodass Daten zwischen den Prototypen geteilt werden können (beide nutzen LocalStorage).

## Sicherheitshinweise

Dieser Prototyp ist für Demonstrationszwecke erstellt. Für die Produktion müssen folgende Sicherheitsmaßnahmen implementiert werden:

- Rate-Limiting für Login-Versuche
- Verschlüsselung von PIN/TAN im Backend
- Session-Management mit sicheren Tokens
- Ablaufzeiten für Sessions
- Backend-Validierung aller Aktionen

## User-Flows

### Admin-Flow
1. Admin meldet sich mit PIN/TAN an
2. Admin erstellt Temp Users (erhält PIN/TAN)
3. Admin generiert Invitation Codes
4. Admin verwaltet Benutzer

### Temp User-Flow
1. Temp User meldet sich mit PIN/TAN an
2. Temp User sieht Dashboard mit eigenen Suchen
3. Temp User erstellt neue Suchaktion (öffentlich/privat)
4. Temp User kann Suchen bearbeiten/löschen

### Guest-Flow
1. Guest sieht öffentliche Suchaktionen ohne Anmeldung
2. Guest kann sich anmelden, um eigene Suchen zu erstellen

