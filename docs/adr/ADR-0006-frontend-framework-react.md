# ADR-0006: Frontend-Framework - React

**Status:** vorgeschlagen

**Datum:** 2025-01-26

---

## Kontext

FindMyPet benötigt ein modernes Frontend-Framework für die Entwicklung der Benutzeroberfläche. Die Anwendung muss komplexe Interaktionen (Karten, Formulare, State-Management) handhaben und eine wartbare, übersichtliche Code-Struktur bieten.

Ziel ist es, ein Framework zu wählen, das eine schnelle Entwicklung ermöglicht, gute Wartbarkeit bietet und eine große Community hat.

---

## Optionen

### 1. React

- **Funktion:**

  Nutzung von React als Frontend-Framework für die Entwicklung der Benutzeroberfläche. React bietet Komponenten-basierte Architektur, State-Management und ein großes Ökosystem.

- **Vorteile:**

  - Sehr große Community und umfangreiche Dokumentation
  - Komponenten-basierte Architektur für wiederverwendbaren Code
  - Große Auswahl an Bibliotheken (react-leaflet für Karten)
  - Gute Performance durch Virtual DOM
  - Einfaches State-Management mit Hooks
  - Viele Job-relevante Skills
  - Gute Developer Experience mit modernen Tools (Vite, Create React App)

- **Nachteile:**

  - Lernkurve für Anfänger:innen
  - Viele Entscheidungen zu treffen (State-Management, Routing, etc.)
  - Regelmäßige Updates können Breaking Changes mit sich bringen

- **Bewertung:**

  React ist die beste Wahl für FindMyPet, da es eine etablierte, weit verbreitete Technologie ist, die alle notwendigen Features bietet und eine große Community hat. Die Komponenten-basierte Architektur passt gut zu den verschiedenen Features der Anwendung (Karten, Formulare, Listen).

---

### 2. Vue.js

- **Funktion:**

  Nutzung von Vue.js als Frontend-Framework.

- **Vorteile:**

  - Einfache Lernkurve
  - Gute Dokumentation
  - Progressive Adoption möglich
  - Gute Performance

- **Nachteile:**

  - Kleinere Community als React
  - Weniger Job-relevante Skills
  - Weniger Bibliotheken verfügbar

- **Bewertung:**

  Vue.js ist eine gute Alternative, aber React bietet mehr Ressourcen und eine größere Community, was für die Entwicklung hilfreich ist.

---

### 3. Vanilla JavaScript / HTML

- **Funktion:**

  Entwicklung ohne Framework, nur mit reinem JavaScript, HTML und CSS.

- **Vorteile:**

  - Keine Abhängigkeiten
  - Volle Kontrolle
  - Keine Build-Tools erforderlich

- **Nachteile:**

  - Sehr aufwändig für komplexe Anwendungen
  - Schwierige Wartbarkeit bei größeren Projekten
  - Keine Wiederverwendbarkeit von Komponenten
  - Manuelles State-Management

- **Bewertung:**

  Vanilla JavaScript ist für eine komplexe Anwendung wie FindMyPet nicht praktikabel. Ein Framework wie React reduziert den Entwicklungsaufwand erheblich.

---

## Entscheidung

Das Projektteam entscheidet sich für **React** als Frontend-Framework.

Diese Entscheidung basiert auf der großen Community, der guten Dokumentation, dem großen Ökosystem an Bibliotheken und der Komponenten-basierten Architektur, die eine wartbare und skalierbare Anwendung ermöglicht. React ist zudem eine weit verbreitete Technologie, die für die Team-Mitglieder wertvolle Skills bietet.

---

## Folgen und To-dos

- Setup von React-Projekt mit Vite (moderner Build-Tool)
- Integration von react-leaflet für Kartenfunktionalität
- Setup von React Router für Navigation (später)
- Implementierung von State-Management (Context API oder Zustand)
- Komponenten-Struktur definieren
- Styling-Ansatz wählen (CSS Modules, Tailwind CSS, oder styled-components)
- Testing-Setup (Jest, React Testing Library)

---

## Probleme

- React hat eine Lernkurve -> gute Tutorials und Dokumentation nutzen
- Viele Bibliotheks-Entscheidungen zu treffen -> Start mit minimalen Dependencies
- Build-Tool-Konfiguration kann komplex sein -> Vite nutzen für einfaches Setup
- State-Management kann bei größeren Apps komplex werden -> mit Context API starten, später auf Zustand/Redux migrieren wenn nötig

