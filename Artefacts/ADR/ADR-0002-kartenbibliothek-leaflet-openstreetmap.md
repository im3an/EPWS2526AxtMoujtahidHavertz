# ADR-0002: Kartenbibliothek - Leaflet.js und OpenStreetMap

**Status:** angenommen

**Datum:** 2025-01-26

---

## Kontext

FindMyPet benötigt eine interaktive Kartenfunktionalität, um Suchgebiete zu markieren, GPS-Tracks zu visualisieren und Teilnehmer:innen ihre zugewiesenen Bereiche anzuzeigen. Die Karte ist ein zentrales Element der Anwendung und muss auf verschiedenen Geräten gut funktionieren.

Ziel ist es, eine kostenlose, wartbare und mobile-freundliche Kartenlösung zu finden, die die notwendigen Funktionen (Bereiche markieren, Marker setzen, GPS-Tracking) unterstützt.

[Technology-Bin: Leaflet.js und OpenStreetMap](../Artefacts/Technology-Bin.md)

---

## Optionen

### 1. Leaflet.js mit OpenStreetMap

- **Funktion:**

  Nutzung der Open-Source-Bibliothek Leaflet.js für interaktive Karten in Kombination mit OpenStreetMap als kostenloser Kartendatenquelle. Leaflet bietet APIs für Marker, Polygone, Kreise und andere Geo-Objekte.

- **Vorteile:**

  - Kostenlos für geringe bis mittlere Nutzung
  - Leichtgewichtig und performant
  - Gute mobile Unterstützung (touch-optimiert)
  - Einfache Integration in Web-Anwendungen
  - Große Community und umfangreiche Dokumentation
  - Flexible Anpassbarkeit (Custom Marker, Styling)
  - Keine API-Key-Anforderungen für OpenStreetMap (bei geringer Nutzung)

- **Nachteile:**

  - OpenStreetMap-Daten können in ländlichen Gebieten weniger detailliert sein
  - Bei hoher Nutzung können Kosten für Tile-Server anfallen
  - Keine kommerzielle Unterstützung (Community-basiert)

- **Bewertung:**

  Leaflet.js mit OpenStreetMap ist die beste Wahl für FindMyPet, da es kostenlos, einfach zu integrieren und gut für mobile Geräte geeignet ist. Die Funktionalität für Bereichsmarkierung und GPS-Tracking ist vollständig gegeben.

---

### 2. Google Maps API

- **Funktion:**

  Nutzung der Google Maps JavaScript API für interaktive Karten mit Google-Kartendaten.

- **Vorteile:**

  - Sehr detaillierte und aktuelle Kartendaten
  - Zusätzliche Features (Street View, Places API)
  - Gute Dokumentation und kommerzielle Unterstützung
  - Bekannte Benutzeroberfläche

- **Nachteile:**

  - Kostenpflichtig ab bestimmten Nutzungsgrenzen
  - API-Key-Management erforderlich
  - Abhängigkeit von Google-Services
  - Komplexere Lizenzbedingungen
  - Höhere Latenz durch externe API-Aufrufe

- **Bewertung:**

  Google Maps bietet zwar hochwertige Daten, ist aber für ein studentisches Projekt mit begrenztem Budget aufgrund der Kosten nicht ideal. Die OpenStreetMap-Daten sind für die Anwendungsfälle von FindMyPet ausreichend.

---

### 3. Mapbox

- **Funktion:**

  Nutzung der Mapbox JavaScript API mit eigenen Kartendaten und Styling-Optionen.

- **Vorteile:**

  - Sehr anpassbare Kartenstile
  - Gute Performance
  - Detaillierte Kartendaten
  - Umfangreiche API-Features

- **Nachteile:**

  - Kostenpflichtig (kostenloses Kontingent, dann Gebühren)
  - API-Key-Management erforderlich
  - Komplexere Einrichtung als Leaflet

- **Bewertung:**

  Mapbox ist eine gute Alternative, aber für FindMyPet ist Leaflet.js mit OpenStreetMap aufgrund der Kostenfreiheit und ausreichenden Funktionalität die bessere Wahl.

---

## Entscheidung

Das Projektteam entscheidet sich für **Leaflet.js in Kombination mit OpenStreetMap** als Kartenbibliothek und Kartendatenquelle.

Diese Kombination bietet alle notwendigen Funktionen (Bereichsmarkierung, Marker, GPS-Tracking-Visualisierung) kostenlos und ist gut für mobile Geräte geeignet. Die bereits durchgeführten Tests mit LeafletTest.html haben die Machbarkeit bestätigt.

---

## Folgen und To-dos

- Integration von Leaflet.js in die Frontend-Anwendung
- Konfiguration von OpenStreetMap Tile-Layer
- Implementierung von Bereichsmarkierung (Polygone auf Karte)
- Implementierung von Marker-Funktionalität für wichtige Punkte
- Implementierung von GPS-Track-Visualisierung
- Mobile Optimierung (Touch-Gesten, responsive Kartenansicht)
- Fallback-Strategie für Offline-Nutzung (Tile-Caching)

---

## Probleme

- OpenStreetMap-Tiles können bei hoher Nutzung kostenpflichtig werden -> Alternative Tile-Server evaluieren
- Tile-Loading-Performance auf mobilen Geräten mit schlechter Verbindung
- Offline-Kartenfunktionalität erfordert zusätzliche Implementierung (Tile-Caching)
- Koordinaten-Konvertierung zwischen verschiedenen Systemen (WGS84, etc.)

