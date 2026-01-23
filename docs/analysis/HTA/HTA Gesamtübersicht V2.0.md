# HTA Gesamtübersicht FindMyPet V2.0

**Version:** 2.0  
**Datum:** 2025-01-26  
**Status:** Vollständig & Detailliert

---

## Überblick

Diese Dokumentation stellt eine vollständige Übersicht über alle Hierarchischen Aufgabenanalysen (HTAs) für das FindMyPet-System dar. Die HTAs beschreiben detailliert die Aufgaben und Schritte, die verschiedene Akteure bei der Nutzung des Systems durchführen.

---

## HTA-Übersicht nach Akteur

```mermaid
mindmap
  root((FindMyPet<br/>HTA Übersicht))
    Haustierbesitzer
      Suchaktion erstellen
      Bereiche markieren
      Helfer einladen
      Suchfortschritt einsehen
      Fundmeldung bearbeiten
    Freiwilliger Helfer
      Suchaktion finden
      Bereich absuchen
      GPS-Tracking verwenden
      Bereich als durchsucht markieren
      Fundmeldung erstellen
    Koordinator
      Helfer verwalten
      Bereiche zuweisen
      Prioritäten setzen
      Fortschritt überwachen
```

---

## Vollständige HTA-Liste

### Haustierbesitzer / Koordinator

#### 1. [HTA: Suchaktion erstellen](Einzelne%20HTA/HTA%20Suchaktion%20erstellen.md)
**Zweck:** Neue Suchaktion für vermisstes Haustier erstellen  
**Schwierigkeit:** Mittel  
**Zeitaufwand:** 15-30 Minuten  
**Status:** ✅ Erstellt

**Hauptaufgaben:**
- System öffnen
- Registrierung/Anmeldung
- Suchaktion initialisieren
- Haustier-Informationen eingeben
- Bereiche markieren
- Einstellungen konfigurieren
- Suchaktion veröffentlichen

---

#### 2. [HTA: Bereiche markieren](Einzelne%20HTA/HTA%20Bereiche%20markieren.md)
**Zweck:** Suchgebiete auf Karte markieren und beschreiben  
**Schwierigkeit:** Mittel  
**Zeitaufwand:** 2-10 Minuten pro Gebiet  
**Status:** ✅ Erstellt

**Hauptaufgaben:**
- Kartenansicht öffnen
- Markierungsmodus aktivieren
- Gebiet auf Karte markieren
- Gebiet bearbeiten (optional)
- Gebiet-Informationen hinzufügen
- Speichern

---

#### 3. [HTA: Helfer der Suche hinzufügen](Einzelne%20HTA/HTA%20Helfer%20der%20Suche%20Hinzufügen.pdf)
**Zweck:** Personen zur Suchaktion einladen  
**Schwierigkeit:** Niedrig  
**Zeitaufwand:** 2-5 Minuten  
**Status:** ✅ Vorhanden (PDF)

**Hauptaufgaben:**
- Helfer-Liste öffnen
- Einladung erstellen
- Kontakt auswählen
- Einladung senden
- Bereiche zuweisen (optional)

---

#### 4. [HTA: Suchfortschritt einsehen](Einzelne%20HTA/HTA%20Suchfortschritt%20einsehen.md)
**Zweck:** Status und Fortschritt der Suche überwachen  
**Schwierigkeit:** Niedrig  
**Zeitaufwand:** 1-15 Minuten  
**Status:** ✅ Erstellt

**Hauptaufgaben:**
- Suchaktion öffnen
- Übersicht anzeigen
- Detaillierte Informationen prüfen
- Filter und Sortierung nutzen
- Benachrichtigungen prüfen

---

### Freiwilliger Helfer

#### 5. [HTA: Gebiet absuchen](Einzelne%20HTA/HTA%20Gebiet%20absuchen.pdf)
**Zweck:** Zugewiesenes Gebiet physisch durchsuchen  
**Schwierigkeit:** Mittel  
**Zeitaufwand:** 30 Minuten - mehrere Stunden  
**Status:** ✅ Vorhanden (PDF)

**Hauptaufgaben:**
- Zugewiesenes Gebiet identifizieren
- Zum Gebiet begeben
- Systematisch durchsuchen
- Fundmeldung erstellen (falls Tier gefunden)
- Bereich als durchsucht markieren

---

#### 6. [HTA: GPS-Tracking verwenden](Einzelne%20HTA/HTA%20GPS%20Tracking%20verwenden.md)
**Zweck:** Automatische Erfassung des Suchwegs  
**Schwierigkeit:** Niedrig  
**Zeitaufwand:** Setup 1-2 Min, dann kontinuierlich  
**Status:** ✅ Erstellt

**Hauptaufgaben:**
- Suchaktion öffnen
- GPS-Berechtigung erteilen
- Tracking aktivieren
- Tracking während Suche
- Tracking pausieren/deaktivieren
- Route ansehen

---

#### 7. [HTA: Fundmeldung erstellen](Einzelne%20HTA/HTA%20Fundmeldung%20erstellen.md)
**Zweck:** Meldung erstellen, wenn Tier gefunden wurde  
**Schwierigkeit:** Niedrig-Mittel  
**Zeitaufwand:** 2-15 Minuten  
**Status:** ✅ Erstellt

**Hauptaufgaben:**
- Fund-Situation erkennen
- Fundmeldung öffnen
- Fund-Informationen eingeben
- Position markieren
- Kontakt herstellen
- Fundmeldung absenden

---

## HTA-Beziehungsdiagramm

```mermaid
graph TD
    START[Haustier vermisst] --> CREATE[Suchaktion erstellen]
    CREATE --> MARK[Bereiche markieren]
    MARK --> INVITE[Helfer einladen]
    INVITE --> ASSIGN[Bereiche zuweisen]
    
    ASSIGN --> HELPER_SEARCH[Helfer: Gebiet absuchen]
    ASSIGN --> HELPER_GPS[Helfer: GPS-Tracking]
    
    HELPER_SEARCH --> PROGRESS[Fortschritt einsehen]
    HELPER_GPS --> PROGRESS
    PROGRESS --> FOUND{Fund?}
    
    FOUND -->|Ja| REPORT[Fundmeldung erstellen]
    FOUND -->|Nein| HELPER_SEARCH
    
    REPORT --> SUCCESS[Suche erfolgreich]
    PROGRESS --> CONTINUE{Weiter suchen?}
    CONTINUE -->|Ja| HELPER_SEARCH
    CONTINUE -->|Nein| END[Suche beenden]
    
    style START fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:#fff
    style CREATE fill:#3498db,stroke:#2980b9,stroke-width:2px,color:#fff
    style REPORT fill:#2ecc71,stroke:#27ae60,stroke-width:2px,color:#fff
    style SUCCESS fill:#f39c12,stroke:#d68910,stroke-width:3px,color:#fff
```

---

## Aufgaben-Matrix

| Aufgabe | Akteur | Priorität | Häufigkeit | Schwierigkeit |
|---------|--------|-----------|------------|---------------|
| Suchaktion erstellen | Haustierbesitzer | Hoch | Einmalig | Mittel |
| Bereiche markieren | Haustierbesitzer | Hoch | Mehrmals | Mittel |
| Helfer hinzufügen | Koordinator | Mittel | Mehrmals | Niedrig |
| Gebiet absuchen | Freiwilliger | Hoch | Mehrmals | Mittel |
| GPS-Tracking verwenden | Freiwilliger | Mittel | Oft | Niedrig |
| Fundmeldung erstellen | Finder | Hoch | Selten | Niedrig-Mittel |
| Fortschritt einsehen | Alle | Mittel | Oft | Niedrig |

---

## Workflow-Übersicht

### Workflow 1: Neue Suchaktion starten
```mermaid
graph LR
    A[1. Anmelden] --> B[2. Suchaktion<br/>erstellen]
    B --> C[3. Bereiche<br/>markieren]
    C --> D[4. Helfer<br/>einladen]
    D --> E[5. Bereiche<br/>zuweisen]
    E --> F[6. Suche<br/>starten]
    
    style B fill:#3498db,stroke:#2980b9,stroke-width:2px,color:#fff
    style C fill:#2ecc71,stroke:#27ae60,stroke-width:2px,color:#fff
```

### Workflow 2: Als Helfer suchen
```mermaid
graph LR
    A[1. Suchaktion<br/>finden] --> B[2. Bereich<br/>zuweisen lassen]
    B --> C[3. GPS-Tracking<br/>aktivieren]
    C --> D[4. Gebiet<br/>absuchen]
    D --> E[5. Bereich als<br/>durchsucht markieren]
    E --> F{Weitere<br/>Bereiche?}
    F -->|Ja| B
    F -->|Nein| G[Fertig]
    
    style C fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:#fff
    style D fill:#e67e22,stroke:#d35400,stroke-width:2px,color:#fff
```

### Workflow 3: Fortschritt überwachen
```mermaid
graph LR
    A[1. Suchaktion<br/>öffen] --> B[2. Übersicht<br/>anzeigen]
    B --> C[3. Details<br/>prüfen]
    C --> D[4. Benachrichtigungen<br/>lesen]
    D --> E{Weitere<br/>Aktionen?}
    E -->|Ja| F[Bereiche<br/>anpassen]
    E -->|Nein| G[Fertig]
    F --> B
    
    style B fill:#3498db,stroke:#2980b9,stroke-width:2px,color:#fff
    style D fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:#fff
```

---

## Verbesserungen in V2.0

### Neu erstellte HTAs:
✅ **HTA: Suchaktion erstellen** - Detaillierte Anleitung für die wichtigste Aufgabe  
✅ **HTA: Bereiche markieren** - Umfassende Beschreibung der Bereichsmarkierung  
✅ **HTA: GPS-Tracking verwenden** - Komplette Anleitung für GPS-Funktionalität  
✅ **HTA: Fundmeldung erstellen** - Schritt-für-Schritt Anleitung für Fundmeldungen  
✅ **HTA: Suchfortschritt einsehen** - Detaillierte Übersicht über Fortschritts-Anzeige

### Verbesserungen:
✅ **Mermaid-Diagramme:** Alle HTAs enthalten visuelle Hierarchie-Diagramme  
✅ **Detaillierte Schritte:** Jede Aufgabe ist in Unteraufgaben zerlegt  
✅ **Fehlerbehandlung:** Häufige Fehler und Lösungen dokumentiert  
✅ **Best Practices:** Tipps für effiziente Nutzung  
✅ **Zeitschätzungen:** Realistische Zeitangaben für Planung  
✅ **Varianten:** Verschiedene Nutzungsmöglichkeiten dokumentiert

---

## Dokumentations-Standard

Alle HTAs folgen einem einheitlichen Format:

1. **Kopfzeile:**
   - Akteur
   - Kontext
   - Version
   - Datum

2. **Aufgaben-Hierarchie:**
   - Mermaid-Diagramm
   - Visuelle Darstellung

3. **Detaillierte Schritte:**
   - Nummerierte Schritte
   - Unteraufgaben
   - Entscheidungspunkte

4. **Zusätzliche Informationen:**
   - Werkzeuge & Funktionen
   - Best Practices
   - Fehlerbehandlung
   - Erfolgskriterien
   - Varianten
   - Zeitschätzungen

---

## Navigation

- [HTA: Suchaktion erstellen](Einzelne%20HTA/HTA%20Suchaktion%20erstellen.md)
- [HTA: Bereiche markieren](Einzelne%20HTA/HTA%20Bereiche%20markieren.md)
- [HTA: Helfer hinzufügen](Einzelne%20HTA/HTA%20Helfer%20der%20Suche%20Hinzufügen.pdf)
- [HTA: Gebiet absuchen](Einzelne%20HTA/HTA%20Gebiet%20absuchen.pdf)
- [HTA: GPS-Tracking verwenden](Einzelne%20HTA/HTA%20GPS%20Tracking%20verwenden.md)
- [HTA: Fundmeldung erstellen](Einzelne%20HTA/HTA%20Fundmeldung%20erstellen.md)
- [HTA: Suchfortschritt einsehen](Einzelne%20HTA/HTA%20Suchfortschritt%20einsehen.md)

---

## Anmerkungen

- Diese Dokumentation wird kontinuierlich erweitert
- HTAs werden bei Systemänderungen aktualisiert
- Feedback und Verbesserungsvorschläge sind willkommen
- Für Fragen oder Unklarheiten: Siehe User Stories oder Szenario

---

**Erstellt von:** Team Axt · Moujtahid · Havertz  
**Letzte Aktualisierung:** 2025-01-26

