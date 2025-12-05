# ADR-0003: Backend-Framework - Spring Boot

**Status:** vorgeschlagen

**Datum:** 2025-01-26

---

## Kontext

FindMyPet benötigt ein Backend-System zur Verwaltung von Suchaktionen, Benutzer:innen, GPS-Tracks und Bereichszuweisungen. Das Backend muss REST-APIs bereitstellen, Datenbankoperationen durchführen und mit dem Frontend kommunizieren.

Ziel ist es, ein robustes, wartbares und skalierbares Backend-Framework zu wählen, das eine schnelle Entwicklung ermöglicht und gut dokumentiert ist.

[Technology-Bin: Spring Boot](../Artefacts/Technology-Bin.md)

---

## Optionen

### 1. Spring Boot (Java)

- **Funktion:**

  Nutzung des Spring Boot Frameworks für die Backend-Entwicklung in Java. Spring Boot bietet Auto-Konfiguration, eingebetteten Server und umfangreiche Bibliotheken für REST-APIs, Datenbankzugriff und Sicherheit.

- **Vorteile:**

  - Sehr umfangreiches Ökosystem und große Community
  - Ausgezeichnete Dokumentation und viele Tutorials
  - Eingebaute Sicherheitsfeatures (Spring Security)
  - Einfache Integration von Datenbanken (JPA/Hibernate)
  - Auto-Konfiguration reduziert Boilerplate-Code
  - Gute Skalierbarkeit und Performance
  - Enterprise-Ready mit vielen Best Practices
  - Eingebetteter Server (Tomcat) für einfaches Deployment

- **Nachteile:**

  - Java kann für kleine Projekte etwas "schwergewichtig" sein
  - Längere Startzeiten im Vergleich zu Node.js
  - Höherer Speicherverbrauch

- **Bewertung:**

  Spring Boot ist eine solide Wahl für das Backend, da es alle notwendigen Features bietet, gut dokumentiert ist und eine professionelle Basis für die Anwendung schafft. Die Team-Mitglieder haben vermutlich bereits Java-Erfahrung aus dem Studium.

---

### 2. Node.js mit Express

- **Funktion:**

  Nutzung von Node.js mit Express.js Framework für das Backend in JavaScript/TypeScript.

- **Vorteile:**

  - Eine Sprache für Frontend und Backend (JavaScript)
  - Sehr schnelle Entwicklung
  - Gute Performance für I/O-intensive Anwendungen
  - Große NPM-Paket-Bibliothek
  - Schnelle Startzeiten

- **Nachteile:**

  - Callback-Hell ohne sorgfältige Strukturierung
  - Weniger Enterprise-Features out-of-the-box
  - Asynchrone Programmierung kann komplex werden

- **Bewertung:**

  Node.js wäre eine gute Alternative, aber Spring Boot bietet mehr Struktur und Enterprise-Features, die für ein professionelles Projekt wertvoll sind.

---

### 3. Python mit Flask/Django

- **Funktion:**

  Nutzung von Python mit Flask oder Django Framework für das Backend.

- **Vorteile:**

  - Einfache Syntax und schnelle Entwicklung
  - Gute Bibliotheken für Datenanalyse (falls benötigt)
  - Django bietet Admin-Interface out-of-the-box

- **Nachteile:**

  - Geringere Performance als Java/Node.js
  - Weniger verbreitet in Enterprise-Umgebungen
  - GIL (Global Interpreter Lock) kann bei Multithreading problematisch sein

- **Bewertung:**

  Python ist gut für Prototypen, aber für eine produktive Anwendung mit GPS-Tracking und vielen gleichzeitigen Nutzern ist Spring Boot die robustere Wahl.

---

## Entscheidung

Das Projektteam entscheidet sich für **Spring Boot** als Backend-Framework.

Diese Entscheidung basiert auf der Robustheit, dem umfangreichen Ökosystem und den Enterprise-Features, die Spring Boot bietet. Die gute Dokumentation und große Community unterstützen die Entwicklung, und das Framework ist gut für skalierbare Anwendungen geeignet.

---

## Folgen und To-dos

- Einrichtung eines Spring Boot Projekts
- Konfiguration von REST-Controllers für API-Endpunkte
- Integration einer Datenbank (z.B. PostgreSQL oder MySQL)
- Implementierung von Spring Data JPA für Datenbankzugriff
- Konfiguration von Spring Security für Authentifizierung und Autorisierung
- Implementierung von CORS-Konfiguration für Frontend-Kommunikation
- Setup von Error-Handling und Logging
- Deployment-Konfiguration (JAR/WAR)

---

## Probleme

- Spring Boot kann für Anfänger:innen komplex erscheinen -> gute Dokumentation und Tutorials nutzen
- Konfiguration von Datenbankverbindungen und JPA kann initial aufwändig sein
- Spring Security Setup erfordert sorgfältige Konfiguration für API-Sicherheit
- Deployment auf Server erfordert Java-Runtime-Umgebung