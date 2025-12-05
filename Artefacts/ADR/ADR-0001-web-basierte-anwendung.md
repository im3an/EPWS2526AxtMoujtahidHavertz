# ADR-0001: Web-basierte Anwendung

**Status:** angenommen

**Datum:** 2025-01-26

---

## Kontext

FindMyPet benötigt eine Plattform, die es Tierbesitzern und Freiwilligen ermöglicht, Suchaktionen zu organisieren und zu koordinieren. Die Anwendung muss von verschiedenen Geräten (Desktop, Tablet, Smartphone) zugänglich sein und eine intuitive Benutzeroberfläche bieten.

Ziel ist es, eine Lösung zu wählen, die eine breite Zugänglichkeit, einfache Wartung und schnelle Entwicklung ermöglicht, ohne dass Nutzer:innen zusätzliche Software installieren müssen.

---

## Optionen

### 1. Web-basierte Anwendung (Progressive Web App)

- **Funktion:**

  Entwicklung als responsive Web-Anwendung, die im Browser läuft und als Progressive Web App (PWA) installierbar ist. Nutzung moderner Web-Technologien (HTML5, CSS3, JavaScript) mit einem Backend-Server.

- **Vorteile:**

  - Keine Installation erforderlich, sofortige Nutzbarkeit
  - Plattformunabhängig (Windows, macOS, Linux, iOS, Android)
  - Einfache Updates ohne App-Store-Prozesse
  - Geringere Entwicklungskosten (eine Codebasis für alle Plattformen)
  - PWA ermöglicht Offline-Funktionalität und App-ähnliche Erfahrung
  - Einfaches Teilen über URL-Links

- **Nachteile:**

  - Abhängigkeit von Internetverbindung (teilweise durch PWA-Offline-Funktionen gemildert)
  - Möglicherweise geringere Performance als native Apps
  - Begrenzter Zugriff auf einige Gerätefunktionen (GPS funktioniert jedoch gut)

- **Bewertung:**

  Die Web-basierte Lösung bietet die beste Balance zwischen Zugänglichkeit, Entwicklungsaufwand und Funktionalität. Die PWA-Technologie ermöglicht eine app-ähnliche Erfahrung mit Offline-Funktionalität, was für die GPS-basierte Suche wichtig ist.

---

### 2. Native Mobile Apps (iOS & Android)

- **Funktion:**

  Separate native Anwendungen für iOS (Swift/SwiftUI) und Android (Kotlin/Java), die über App Stores verteilt werden.

- **Vorteile:**

  - Optimale Performance und native Benutzererfahrung
  - Vollständiger Zugriff auf alle Gerätefunktionen
  - App-Store-Präsenz für bessere Auffindbarkeit

- **Nachteile:**

  - Doppelter Entwicklungsaufwand (zwei Codebasen)
  - Höhere Wartungskosten
  - App-Store-Zulassungsprozesse verzögern Updates
  - Desktop-Nutzer:innen benötigen separate Lösung
  - Höhere Entwicklungskosten

- **Bewertung:**

  Native Apps bieten zwar optimale Performance, sind aber für dieses Projekt aufgrund des höheren Aufwands und der Notwendigkeit, auch Desktop-Nutzer zu bedienen, nicht die beste Wahl.

---

### 3. Hybrid-App (React Native, Flutter, Ionic)

- **Funktion:**

  Entwicklung mit Frameworks wie React Native oder Flutter, die eine Codebasis für mehrere Plattformen ermöglichen.

- **Vorteile:**

  - Eine Codebasis für mehrere Plattformen
  - App-Store-Verfügbarkeit
  - Zugriff auf native Gerätefunktionen

- **Nachteile:**

  - Komplexere Entwicklung als Web-App
  - App-Store-Prozesse erforderlich
  - Mögliche Performance-Einbußen gegenüber nativen Apps
  - Desktop-Unterstützung oft eingeschränkt

- **Bewertung:**

  Hybrid-Apps sind ein Kompromiss, aber für FindMyPet ist die Web-basierte Lösung mit PWA-Funktionalität ausreichend und einfacher zu entwickeln und zu warten.

---

## Entscheidung

Das Projektteam entscheidet sich für eine **web-basierte Anwendung mit Progressive Web App (PWA) Funktionalität** als primäre Plattform.

Diese Entscheidung ermöglicht eine schnelle Entwicklung, breite Zugänglichkeit auf allen Geräten und eine einfache Wartung. Die PWA-Funktionalität bietet Offline-Fähigkeiten und eine app-ähnliche Benutzererfahrung, die für die GPS-basierte Suchfunktion essentiell ist.

---

## Folgen und To-dos

- Implementierung als responsive Web-Anwendung
- Integration von PWA-Manifest und Service Worker für Offline-Funktionalität
- Responsive Design für Desktop, Tablet und Smartphone
- Implementierung von Installations-Prompts für PWA
- Testing auf verschiedenen Browsern und Geräten

---

## Probleme

- Browser-Kompatibilität muss getestet werden (insbesondere ältere Browser)
- PWA-Installation funktioniert nicht auf allen Geräten gleich (iOS hat Einschränkungen)
- Offline-Synchronisation muss sorgfältig implementiert werden, um Datenverlust zu vermeiden