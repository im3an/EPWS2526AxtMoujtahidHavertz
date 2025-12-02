# ADR-0004: GPS-Tracking und Offline-Funktionalität

**Status:** vorgeschlagen

**Datum:** 2025-01-26

---

## Kontext

FindMyPet benötigt GPS-Tracking-Funktionalität, damit Freiwillige ihre durchsuchten Bereiche automatisch erfassen können. Gleichzeitig muss die Anwendung auch bei schlechter Netzabdeckung funktionieren, da Suchaktionen oft in ländlichen Gebieten stattfinden.

Ziel ist es, eine Lösung zu finden, die präzises GPS-Tracking ermöglicht und gleichzeitig Offline-Funktionalität bietet, damit Nutzer:innen auch ohne Internetverbindung Bereiche markieren können.

[User Stories: U2, U3, U6](../Artefacts/Userstory_v1.md)

---

## Optionen

### 1. Browser Geolocation API mit Service Worker für Offline

- **Funktion:**

  Nutzung der HTML5 Geolocation API für GPS-Tracking im Browser in Kombination mit Service Workers für Offline-Funktionalität. Daten werden lokal gespeichert (IndexedDB) und bei Verbindung synchronisiert.

- **Vorteile:**

  - Keine zusätzlichen Bibliotheken erforderlich
  - Funktioniert in modernen Browsern
  - Service Workers ermöglichen echte Offline-Funktionalität
  - IndexedDB für lokale Datenspeicherung
  - Automatische Synchronisation bei Verbindungswiederherstellung

- **Nachteile:**

  - Browser-Berechtigungen erforderlich (kann Nutzer:innen abschrecken)
  - GPS-Genauigkeit variiert je nach Gerät
  - Service Worker Setup kann komplex sein
  - Synchronisationslogik muss sorgfältig implementiert werden

- **Bewertung:**

  Die Browser Geolocation API mit Service Workers ist die beste Lösung für FindMyPet, da sie keine zusätzlichen Abhängigkeiten erfordert und eine gute Balance zwischen Funktionalität und Komplexität bietet.

---

### 2. Native GPS-APIs über Cordova/PhoneGap

- **Funktion:**

  Nutzung von Cordova oder PhoneGap, um native GPS-Funktionen in eine Web-App zu integrieren.

- **Vorteile:**

  - Bessere GPS-Kontrolle als Browser-APIs
  - Zugriff auf erweiterte Gerätefunktionen
  - Kann als App verpackt werden

- **Nachteile:**

  - Zusätzliche Komplexität durch Hybrid-Framework
  - Erfordert App-Entwicklung und -Deployment
  - Höherer Wartungsaufwand

- **Bewertung:**

  Für eine Web-basierte Anwendung ist Cordova unnötig komplex. Die Browser Geolocation API ist ausreichend.

---

### 3. Externe GPS-Tracking-Service

- **Funktion:**

  Nutzung eines externen GPS-Tracking-Services (z.B. Google Maps Geolocation API, Mapbox Directions API) für Positionsbestimmung.

- **Vorteile:**

  - Professionelle Genauigkeit
  - Zusätzliche Features (Routenoptimierung, Geocoding)

- **Nachteile:**

  - Kostenpflichtig
  - Abhängigkeit von externem Service
  - Höhere Latenz durch API-Aufrufe
  - Offline-Funktionalität nicht möglich

- **Bewertung:**

  Externe Services sind für die Anforderungen von FindMyPet nicht notwendig und würden zusätzliche Kosten und Abhängigkeiten einführen.

---

## Entscheidung

Das Projektteam entscheidet sich für die **Browser Geolocation API in Kombination mit Service Workers und IndexedDB** für GPS-Tracking und Offline-Funktionalität.

Diese Lösung bietet eine gute Balance zwischen Funktionalität und Komplexität, ermöglicht Offline-Nutzung und erfordert keine zusätzlichen Kosten oder Abhängigkeiten. Die PWA-Architektur unterstützt diese Entscheidung optimal.

---

## Folgen und To-dos

- Implementierung von Service Worker für Offline-Funktionalität
- Setup von IndexedDB für lokale Datenspeicherung
- Implementierung der Browser Geolocation API für GPS-Tracking
- Entwicklung von Synchronisationslogik für Offline-Daten
- Implementierung von Konfliktlösung bei gleichzeitigen Änderungen
- UI-Feedback für Offline-Status und Synchronisation
- Testing in verschiedenen Netzwerkbedingungen
- Implementierung von manueller Bereichsmarkierung als Fallback

---

## Probleme

- GPS-Genauigkeit kann in Gebäuden oder bei schlechtem Wetter eingeschränkt sein -> manuelle Markierung als Fallback anbieten
- Service Worker Caching-Strategien müssen sorgfältig geplant werden (Cache-Invalidierung)
- Synchronisationskonflikte bei mehreren Geräten derselben Person -> Konfliktlösungsstrategie implementieren
- Browser-Berechtigungen können Nutzer:innen abschrecken -> klare Erklärung der Notwendigkeit
- Batterieverbrauch bei kontinuierlichem GPS-Tracking -> Optionen für Tracking-Intervalle anbieten