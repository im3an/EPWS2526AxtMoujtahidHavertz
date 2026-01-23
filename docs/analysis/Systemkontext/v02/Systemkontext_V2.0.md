# Systemkontext FindMyPet V2.0

**Version:** 2.0  
**Datum:** 2025-01-26  
**Status:** Detailliert & Verbessert

---

## Überblick

Das FindMyPet-System ist eine web-basierte Plattform zur Koordination von Suchaktionen für vermisste Haustiere. Die Anwendung ermöglicht es Tierbesitzern, Suchgebiete zu markieren, und Freiwilligen, ihre durchsuchten Bereiche zu erfassen und zu koordinieren.

## Systemkontext-Diagramm

### Hauptansicht: System und externe Akteure

```mermaid
graph TB
    subgraph "Externe Akteure - Interne Faktoren"
        HAUS[Haustierbesitzer<br/>Meldet Suchaktionen]
        VERW[Verwandte/Angehörige<br/>Koordiniert Suche]
        ADMIN[Administratoren<br/>Verwaltet System]
        BETR[Systembetreiber<br/>Wartet Infrastruktur]
    end

    subgraph "Externe Akteure - Externe Faktoren"
        HELF[Freiwillige Helfer<br/>Durchsucht Gebiete]
        TIER[Tierschutzvereine<br/>Fundmeldungen]
        TIERARZT[Tierärzte<br/>Fundmeldungen]
        OEFF[Öffentlichkeit<br/>Passive Beobachter]
    end

    subgraph "FindMyPet System"
        subgraph "Frontend Layer"
            REACT[React Frontend<br/>Benutzeroberfläche]
            PWA[PWA Service Worker<br/>Offline-Funktionalität]
            LEAF[Leaflet.js<br/>Kartenvisualisierung]
        end

        subgraph "Backend Layer"
            SPRING[Spring Boot API<br/>REST-Services]
            AUTH[Authentifizierung<br/>OAuth-Integration]
        end

        subgraph "Daten Layer"
            DB[(Datenbank<br/>PostgreSQL/MySQL)]
            IDB[IndexedDB<br/>Lokaler Cache]
        end
    end

    subgraph "Externe Systeme & APIs"
        OSM[OpenStreetMap<br/>Kartendaten & Tiles]
        GEO[Browser Geolocation API<br/>GPS-Positionierung]
        OAUTH[OAuth-Provider<br/>Google, Facebook, etc.]
        VERMISST[Externe Vermisstendatenbank<br/>TASSO, FINDEFIX]
        CLOUD[Cloud-Hosting<br/>VPS/Cloud Provider]
        SOCIAL[Social Media APIs<br/>Sharing-Funktionen]
    end

    %% Interne Faktoren Verbindungen
    HAUS -->|Erstellt Suchaktion| REACT
    HAUS -->|Speichert Daten| DB
    VERW -->|Koordiniert Suche| REACT
    VERW -->|Ermittelt Fortschritt| SPRING
    ADMIN -->|Verwaltet Benutzer| SPRING
    ADMIN -->|Konfiguriert System| SPRING
    BETR -->|Wartet Server| CLOUD
    BETR -->|Überwacht Logs| SPRING

    %% Externe Faktoren Verbindungen
    HELF -->|Durchsucht Bereiche| REACT
    HELF -->|GPS-Tracking| GEO
    HELF -->|Offline-Daten| PWA
    TIER -->|Fundmeldungen| SPRING
    TIER -->|Aktualisiert Status| SPRING
    TIERARZT -->|Fundmeldungen| SPRING
    OEFF -->|Sieht öffentliche Karte| REACT

    %% Frontend Verbindungen
    REACT -->|Lädt Karten| OSM
    REACT -->|Zeigt Karten| LEAF
    REACT -->|Offline-Speicherung| PWA
    REACT -->|API-Aufrufe| SPRING
    REACT -->|GPS-Anfragen| GEO
    PWA -->|Lokale Daten| IDB
    PWA -->|Synchronisation| SPRING

    %% Backend Verbindungen
    SPRING -->|Datenbankzugriff| DB
    SPRING -->|OAuth-Verifizierung| OAUTH
    SPRING -->|Chip-Abgleich| VERMISST
    SPRING -->|Sharing| SOCIAL
    AUTH -->|Authentifizierung| OAUTH

    %% Infrastruktur
    SPRING -->|Hosting| CLOUD
    DB -->|Hosting| CLOUD

    style REACT fill:#4a90e2,stroke:#2c5aa0,stroke-width:3px,color:#fff
    style SPRING fill:#6db33f,stroke:#4a7c2a,stroke-width:3px,color:#fff
    style DB fill:#336791,stroke:#1e4d6b,stroke-width:3px,color:#fff
    style PWA fill:#ff6b6b,stroke:#d63031,stroke-width:3px,color:#fff
```

## Detaillierte Komponentenansicht

### Frontend-Architektur

```mermaid
graph LR
    subgraph "React Frontend"
        COMP[Komponenten<br/>MapComponent, Forms, Lists]
        STATE[State Management<br/>Context API / Zustand]
        ROUTER[React Router<br/>Navigation]
        HOOKS[Custom Hooks<br/>GPS, Offline, Data]
    end

    subgraph "PWA Features"
        SW[Service Worker<br/>Offline-Strategien]
        MANIFEST[Web App Manifest<br/>Installation]
        CACHE[Cache API<br/>Ressourcen-Caching]
    end

    subgraph "Karten-Integration"
        LEAFMAP[Leaflet Map<br/>Interaktive Karte]
        MARKER[Marker & Polygone<br/>Bereichsmarkierung]
        TRACK[GPS-Track<br/>Visualisierung]
    end

    COMP --> STATE
    COMP --> ROUTER
    COMP --> HOOKS
    HOOKS --> SW
    SW --> CACHE
    SW --> MANIFEST
    COMP --> LEAFMAP
    LEAFMAP --> MARKER
    LEAFMAP --> TRACK

    style COMP fill:#4a90e2,stroke:#2c5aa0,stroke-width:2px,color:#fff
    style SW fill:#ff6b6b,stroke:#d63031,stroke-width:2px,color:#fff
    style LEAFMAP fill:#51cf66,stroke:#37b24d,stroke-width:2px,color:#fff
```

### Backend-Architektur

```mermaid
graph TB
    subgraph "Spring Boot Backend"
        REST[REST Controllers<br/>API-Endpunkte]
        SERVICE[Service Layer<br/>Business-Logik]
        REPO[Repository Layer<br/>Datenbankzugriff]
        SEC[Spring Security<br/>Authentifizierung]
    end

    subgraph "Datenbank"
        ENTITY[Entities<br/>User, SearchAction, Area]
        REL[Relationships<br/>JPA/Hibernate]
    end

    subgraph "Externe Integrationen"
        OAUTH_INT[OAuth-Integration<br/>Token-Verifizierung]
        CHIP_API[Chip-Register API<br/>TASSO, FINDEFIX]
        GEO_SERV[Geocoding-Service<br/>Adressen → Koordinaten]
    end

    REST --> SERVICE
    SERVICE --> REPO
    REST --> SEC
    SEC --> OAUTH_INT
    REPO --> ENTITY
    ENTITY --> REL
    SERVICE --> CHIP_API
    SERVICE --> GEO_SERV

    style REST fill:#6db33f,stroke:#4a7c2a,stroke-width:2px,color:#fff
    style SERVICE fill:#6db33f,stroke:#4a7c2a,stroke-width:2px,color:#fff
    style REPO fill:#6db33f,stroke:#4a7c2a,stroke-width:2px,color:#fff
    style SEC fill:#f39c12,stroke:#d68910,stroke-width:2px,color:#fff
```

## Datenfluss-Diagramm

### Hauptfunktion: Suchaktion erstellen und Bereich markieren

```mermaid
sequenceDiagram
    participant H as Haustierbesitzer
    participant F as React Frontend
    participant SW as Service Worker
    participant B as Spring Boot API
    participant DB as Datenbank
    participant OSM as OpenStreetMap
    participant GEO as Geolocation API

    H->>F: Erstellt Suchaktion
    F->>OSM: Lädt Karten-Tiles
    OSM-->>F: Karten-Daten
    F->>GEO: Fragt GPS-Position an
    GEO-->>F: Aktuelle Position
    H->>F: Markiert Suchgebiete auf Karte
    F->>F: Validiert Eingaben
    alt Online
        F->>B: POST /api/search-actions
        B->>DB: Speichert Suchaktion
        DB-->>B: Bestätigung
        B-->>F: Success Response
        F->>H: Erfolgsmeldung
    else Offline
        F->>SW: Speichert in IndexedDB
        SW->>SW: Queue für Sync
        Note over SW: Synchronisation bei<br/>Verbindungswiederherstellung
        SW->>B: Sync-Request
        B->>DB: Speichert Daten
        DB-->>B: Bestätigung
        B-->>SW: Success
    end
```

### Hauptfunktion: Freiwilliger sucht Gebiete

```mermaid
sequenceDiagram
    participant V as Freiwilliger Helfer
    participant F as React Frontend
    participant SW as Service Worker
    participant B as Spring Boot API
    participant DB as Datenbank
    participant GEO as Geolocation API

    V->>F: Öffnet Suchaktion
    F->>B: GET /api/search-actions/{id}
    B->>DB: Lädt Suchaktion & Bereiche
    DB-->>B: Daten
    B-->>F: Suchaktion-Daten
    F->>F: Zeigt Karte mit Bereichen
    
    V->>F: Startet GPS-Tracking
    F->>GEO: Kontinuierliche Position
    GEO-->>F: GPS-Koordinaten
    F->>F: Visualisiert Route auf Karte
    
    V->>F: Markiert Bereich als durchsucht
    alt Online
        F->>B: PATCH /api/areas/{id}/searched
        B->>DB: Aktualisiert Status
        DB-->>B: Bestätigung
        B-->>F: Erfolg
    else Offline
        F->>SW: Speichert lokal
        SW->>SW: Queue für Sync
        Note over SW: Wird später synchronisiert
    end
    
    B->>V: Benachrichtigung: Update verfügbar
```

## Akteur-Verbindungsmatrix

### Interne Akteure (Projekt-interne)

| Akteur | Interaktion mit System | Hauptfunktionen | Technologie-Zugriff |
|--------|----------------------|-----------------|---------------------|
| **Haustierbesitzer** | React Frontend | • Suchaktion erstellen<br/>• Bereiche markieren<br/>• Fortschritt einsehen<br/>• Fotos hochladen | Browser, PWA |
| **Verwandte/Angehörige** | React Frontend | • Suchaktion verwalten<br/>• Bereiche zuweisen<br/>• Koordination | Browser, PWA |
| **Administratoren** | Spring Boot API | • Benutzer verwalten<br/>• Rollen & Rechte<br/>• Content-Moderation | Admin-Interface, API |
| **Systembetreiber** | Infrastruktur | • Server-Wartung<br/>• Monitoring<br/>• Backups | SSH, Cloud-Console |

### Externe Akteure (Community)

| Akteur | Interaktion mit System | Hauptfunktionen | Zugriff |
|--------|----------------------|-----------------|---------|
| **Freiwillige Helfer** | React Frontend (PWA) | • Suchgebiete sehen<br/>• GPS-Tracking aktivieren<br/>• Bereiche markieren (online/offline)<br/>• Updates erhalten | Browser, Mobile |
| **Tierschutzvereine** | Spring Boot API | • Fundmeldungen<br/>• Suchaktionen abrufen<br/>• Matching-Algorithmus | API, Dashboard |
| **Tierärzte** | Spring Boot API | • Fundmeldungen<br/>• Chip-Scanner-Integration | API |
| **Öffentlichkeit** | React Frontend | • Öffentliche Karte einsehen<br/>• Passives Beobachten | Browser (read-only) |

### Externe Systeme

| System | Funktion | Integration | Technologie |
|--------|----------|-------------|-------------|
| **OpenStreetMap** | Karten-Daten & Tiles | Leaflet.js Integration | REST API, Tile-Server |
| **Browser Geolocation API** | GPS-Positionierung | Native Browser API | HTML5 Geolocation |
| **OAuth-Provider** | Authentifizierung | Spring Security OAuth2 | OAuth2, JWT |
| **Externe Vermisstendatenbank** | Chip-Abgleich | REST API Integration | TASSO API, FINDEFIX API |
| **Cloud-Hosting** | Infrastruktur | Deployment | VPS, Docker, Nginx |
| **Social Media APIs** | Sharing-Funktionen | Optional Integration | Facebook API, Twitter API |

## Technologie-Stack Übersicht

```mermaid
mindmap
  root((FindMyPet<br/>Technologie-Stack))
    Frontend
      React
        Components
        Hooks
        Context API
      Leaflet.js
        Karten
        Marker
        Polygone
      PWA
        Service Worker
        IndexedDB
        Web Manifest
    Backend
      Spring Boot
        REST API
        Spring Security
        Spring Data JPA
      Datenbank
        PostgreSQL/MySQL
        JPA/Hibernate
    Infrastruktur
      Hosting
        VPS/Cloud
        Docker
        Nginx
      Monitoring
        Logs
        Error Tracking
    Externe APIs
      OpenStreetMap
        Tile-Server
        Geocoding
      Browser APIs
        Geolocation
        Service Worker
        IndexedDB
      OAuth
        Google
        (Facebook?)
```

---

## System-Grenzen und Verantwortlichkeiten

### FindMyPet System ist verantwortlich für

✅ **Suchaktions-Management**
- Erstellung und Verwaltung von Suchaktionen
- Bereichsmarkierung und Zuweisung
- Fortschritts-Tracking

✅ **GPS-Tracking & Offline-Funktionalität**
- Kontinuierliche GPS-Erfassung
- Offline-Datenspeicherung
- Synchronisation bei Verbindungswiederherstellung

✅ **Benutzer-Authentifizierung & Autorisierung**
- Benutzer-Registrierung
- Rollen & Rechte-Management
- OAuth-Integration

✅ **Daten-Management**
- Persistierung von Suchaktionen, Bereichen, Benutzern
- Datensicherheit & DSGVO-Konformität
- Backup & Wiederherstellung

### FindMyPet System ist NICHT verantwortlich für

❌ **Kartendaten-Erstellung** (OpenStreetMap)  
❌ **GPS-Hardware** (Browser/Device)  
❌ **OAuth-Provider-Betrieb** (Google, Facebook, etc.)  
❌ **Infrastruktur-Betrieb** (Cloud-Provider)  
❌ **Chip-Register-Datenbanken** (TASSO, FINDEFIX)

## Datenfluss-Übersicht

```mermaid
flowchart TD
    START([Benutzer-Aktion]) --> ONLINE{Online?}
    
    ONLINE -->|Ja| API[Spring Boot API]
    ONLINE -->|Nein| PWA_SW[Service Worker]
    
    API --> VALID[Validierung]
    VALID --> DB[(Datenbank)]
    DB --> RESPONSE[API Response]
    RESPONSE --> FRONTEND[React Frontend]
    
    PWA_SW --> IDB[(IndexedDB)]
    IDB --> SYNC{Sync möglich?}
    SYNC -->|Ja| API
    SYNC -->|Nein| QUEUE[Sync-Queue]
    QUEUE -->|Später| API
    
    FRONTEND --> UI[UI Update]
    UI --> NOTIF[Benachrichtigungen]
    NOTIF --> END([Benutzer sieht Ergebnis])
    
    style API fill:#6db33f,stroke:#4a7c2a,stroke-width:2px,color:#fff
    style PWA_SW fill:#ff6b6b,stroke:#d63031,stroke-width:2px,color:#fff
    style DB fill:#336791,stroke:#1e4d6b,stroke-width:2px,color:#fff
    style IDB fill:#ffa502,stroke:#ff6348,stroke-width:2px,color:#fff
```

---

## Sicherheits- und Datenschutz-Aspekte

```mermaid
graph LR
    subgraph "Sicherheitsmaßnahmen"
        AUTH_SYS[Authentifizierung<br/>OAuth2 + JWT]
        AUTOR[Autorisierung<br/>Rollen & Rechte]
        ENCRYPT[Verschlüsselung<br/>HTTPS/TLS]
        VALID_IN[Input-Validierung<br/>XSS/CSRF Protection]
    end

    subgraph "Datenschutz"
        DSGVO[DSGVO-Konformität<br/>Datenschutzerklärung]
        MIN_DATA[Data Minimization<br/>Nur nötige Daten]
        ANON[Anonymisierungsoption<br/>Freiwillige Helfer]
        CONSENT[Einwilligung<br/>Standort-Tracking]
    end

    AUTH_SYS --> AUTOR
    AUTOR --> ENCRYPT
    ENCRYPT --> VALID_IN
    DSGVO --> MIN_DATA
    MIN_DATA --> ANON
    ANON --> CONSENT

    style AUTH_SYS fill:#f39c12,stroke:#d68910,stroke-width:2px,color:#fff
    style DSGVO fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:#fff
```

---

## Erweiterungen & Zukünftige Integrationen

### Mögliche zukünftige Erweiterungen

- **Push-Benachrichtigungen** (Web Push API)
- **E-Mail-Benachrichtigungen** (SMTP-Service)
- **SMS-Benachrichtigungen** (Twilio API)
- **Social Media Integration** (Facebook, Twitter Sharing)
- **KI-basierte Matching** (Bilderkennung für Fundtiere)
- **Mobile Apps** (React Native als Erweiterung der PWA)

## Vergleich zur V1.0

### Verbesserungen in V2.0

✅ **Detailliertere Komponentendarstellung** - Frontend, Backend und Datenbank-Layer klar getrennt  
✅ **Datenfluss-Diagramme** - Sequence Diagrams zeigen konkrete Interaktionen  
✅ **Technologie-Details** - Konkrete Technologien (React, Spring Boot, Leaflet.js) explizit genannt  
✅ **Akteur-Matrix** - Übersichtliche Tabelle aller Akteure und deren Funktionen  
✅ **Sicherheits-Aspekte** - Datenschutz und Sicherheit dokumentiert  
✅ **Offline-Funktionalität** - Service Worker und IndexedDB Integration klar dargestellt  
✅ **Multiple Views** - Verschiedene Diagramm-Typen für verschiedene Perspektiven  
✅ **Intuitivere Struktur** - Bessere Gruppierung und farbliche Kennzeichnung


## Anmerkungen

- Dieses Dokument verwendet **Mermaid-Diagramme** für die Visualisierung
- Für die Anzeige wird ein Mermaid-fähiger Markdown-Viewer benötigt (z.B. Typora, GitHub, GitLab)
- Die Diagramme können in verschiedene Formate exportiert werden (SVG, PNG)
- Bei Änderungen am System sollte dieses Dokument aktualisiert werden

---

**Erstellt von:** Team Axt · Moujtahid · Havertz  
**Letzte Aktualisierung:** 2025-12-28