# Use Cases
---
## 01: Suchaktion erstellen
  
- **Name:** Suchaktion erstellen  
- **Primärer Akteur:** Haustierbesitzer  
- **Sekundäre Akteure:** System  

### Kurzbeschreibung

Der Haustierbesitzer erstellt eine neue Suchaktion für ein vermisstes Haustier, indem er relevante Tier-, Kontakt- und Suchinformationen eingibt und die Aktion veröffentlicht.

### Vorbedingungen

- Benutzer ist registriert und angemeldet
- Benutzer hat auf seinem Profil mindestens eine Option zur Kontaktaufnahme angegeben

### Nachbedingungen (Erfolg)

- Suchaktion ist aktiv
- Suchaktion ist sichtbar für Helfer (falls öffentlich)

### Standardablauf

1. Benutzer meldet sich im System an (Vorbedingung)
2. Benutzer wählt die Funtkion um eine Suchaktion zu erstellen
3. Benutzer gibt Informationen zum Haustier ein
4. Benutzer markiert erste Suchgebiete auf der Karte
5. Benutzer konfiguriert Sichtbarkeit und Benachrichtigungen
6. Benutzer veröffentlicht die Suchaktion
7. System bestätigt die erfolgreiche Erstellung

### Alternative Abläufe
- 3.1: Benutzer lädt mindestens ein Foto von dem Haustier hoch.


## 02: Suchgebiete verwalten

- **Name:** Suchgebiete verwalten  
- **Primärer Akteur:** Haustierbesitzer
- **Sekundäre Akteure:** System  

### Kurzbeschreibung

Der Haustierbesitzer erstellt, bearbeitet oder löscht Suchgebiete auf einer Karte, um die Suche räumlich zu strukturieren und zu priorisieren.

### Vorbedingungen

- Suchaktion existiert und ist nicht beendet.

### Nachbedingungen (Erfolg)

- Suchgebiete sind gespeichert
- Suchgebiete sind für alle Teilnehmer sichtbar

### Standardablauf

1. Benutzer öffnet eine bestehende Suchaktion
2. Benutzer navigiert zu der Karte
3. Benutzer markiert ein Gebiet auf der Karte
4. Benutzer speichert das Gebiet
5. System zeigt das Gebiet in Karten- und Listenansicht an

### Alternative Abläufe
- 3.1: Benutzer bearbeitet bestehende Gebiete
- 3.2: Benutzer löscht Gebiete
- 3.3: Benutzer heftet eine Notiz an ein Gebiet oder einer Markierung an

---

## 03: Suchfortschritt einsehen
- **Name:** Suchfortschritt einsehen  
- **Primärer Akteur:** Haustierbesitzer und Helfer  
- **Sekundäre Akteure:** System  

### Kurzbeschreibung

Ein Benutzer verschafft sich einen Überblick über den aktuellen Stand der Suchaktion, inklusive durchsuchter Gebiete, aktiver Helfer und eingegangener Hinweise.

### Vorbedingungen

- Suchaktion existiert
- Benutzer hat Rechte bei der Suchanzeige zu helfen

### Nachbedingungen

- Keine 

### Standardablauf

1. Benutzer öffnet die Suchaktion
2. System zeigt Karten- und Fortschrittsübersicht
3. Benutzer prüft den Status einzelner Gebiete
4. Benutzer liest Hinweise und Kommentare
5. Benutzer prüft Benachrichtigungen

---

## 04: Fund melden
- **Name:** Fund melden  
- **Primärer Akteur:** Freiwilliger Helfer 
- **Sekundäre Akteure:** Haustierbesitzer, System  

### Kurzbeschreibung

Ein Helfer meldet einen vermuteten oder bestätigten Fund eines vermissten Haustieres und informiert den Besitzer über Ort, Zustand und Zeitpunkt.

### Vorbedingungen

- Suchaktion ist aktiv
- Helfer hat Zugriff auf die Suchaktion (öffentlich oder eingeladen)

### Nachbedingungen (Erfolg)

- Fundmeldung ist gespeichert
- Haustierbesitzer wurde benachrichtigt

### Standardablauf

1. Helfer öffnet die Suchaktion
2. Helfer wählt einen Fund aus.
3. Helfer gibt Funddetails ein
4. Helfer markiert den Fundort auf der Karte
5. Helfer sendet die Fundmeldung ab
6. System benachrichtigt den Besitzer

### Alternative Abläufe
-  Vermuteter Fund statt bestätigter Fund

