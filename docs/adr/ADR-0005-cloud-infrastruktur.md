# ADR-0005: Cloud-Infrastruktur

**Status:** vorgeschlagen

**Datum:** 2025-01-26

---

## Kontext

FindMyPet benötigt eine skalierbare Infrastruktur, die bei Spitzenlasten (z.B. wenn viele Suchaktionen gleichzeitig aktiv sind) stabil läuft. Die Anwendung muss zuverlässig verfügbar sein und Daten sicher speichern.

Ziel ist es, eine Cloud-Infrastruktur zu wählen, die Skalierbarkeit, Zuverlässigkeit und angemessene Kosten für ein studentisches Projekt bietet.

[User Story: U19](../Artefacts/Userstory_v1.md)

---

## Optionen

### 1. Cloud-Provider (AWS, Google Cloud, Azure) mit Auto-Scaling

- **Funktion:**

  Nutzung eines großen Cloud-Providers (AWS, Google Cloud Platform oder Microsoft Azure) mit Auto-Scaling-Funktionen. Deployment auf Container-basierten Services (z.B. AWS Elastic Beanstalk, Google App Engine, Azure App Service).

- **Vorteile:**

  - Sehr gute Skalierbarkeit und Auto-Scaling
  - Hohe Verfügbarkeit und Redundanz
  - Umfangreiche Services (Datenbank, CDN, Monitoring)
  - Professionelle Infrastruktur
  - Gute Dokumentation und Support

- **Nachteile:**

  - Kosten können bei hoher Nutzung steigen
  - Komplexere Konfiguration
  - Vendor Lock-in möglich
  - Lernkurve für Cloud-Services

- **Bewertung:**

  Cloud-Provider bieten die beste Skalierbarkeit, sind aber für ein studentisches Projekt möglicherweise zu komplex und teuer. Für die Entwicklung und initiale Tests ist eine einfachere Lösung ausreichend.

---

### 2. VPS (Virtual Private Server) mit manuellem Scaling

- **Funktion:**

  Nutzung eines VPS-Anbieters (z.B. DigitalOcean, Hetzner, Contabo) mit manueller Konfiguration von Server, Datenbank und Deployment.

- **Vorteile:**

  - Geringere Kosten als große Cloud-Provider
  - Volle Kontrolle über die Infrastruktur
  - Einfacheres Setup für kleine bis mittlere Projekte
  - Keine Vendor Lock-in
  - Gute Performance für den Preis

- **Nachteile:**

  - Manuelles Scaling erforderlich
  - Weniger automatische Backups und Redundanz
  - Selbst-Management von Updates und Sicherheit
  - Begrenzte Skalierbarkeit ohne zusätzliche Server

- **Bewertung:**

  VPS ist eine gute Balance zwischen Kosten und Funktionalität für ein studentisches Projekt. Für die initiale Entwicklung und Tests ist dies ausreichend.

---

### 3. Platform-as-a-Service (Heroku, Railway, Render)

- **Funktion:**

  Nutzung von PaaS-Anbietern, die automatisches Deployment und einfaches Scaling bieten.

- **Vorteile:**

  - Sehr einfaches Deployment
  - Automatisches Scaling
  - Eingebaute CI/CD
  - Geringer Wartungsaufwand
  - Oft kostenlose Tiers für kleine Projekte

- **Nachteile:**

  - Kosten können bei hoher Nutzung steigen
  - Weniger Kontrolle über die Infrastruktur
  - Mögliche Einschränkungen (z.B. Sleep-Mode bei Inaktivität)

- **Bewertung:**

  PaaS ist eine gute Option für schnelle Entwicklung und Deployment, besonders wenn kostenlose Tiers verfügbar sind. Für die Produktion sollte jedoch ein VPS oder Cloud-Provider in Betracht gezogen werden.

---

## Entscheidung

Das Projektteam entscheidet sich zunächst für einen **VPS (Virtual Private Server)** für die Entwicklung und initiale Tests.

Für die spätere Produktion und bei steigender Nutzung sollte eine Migration zu einem Cloud-Provider mit Auto-Scaling in Betracht gezogen werden. Die VPS-Lösung bietet eine gute Balance zwischen Kosten, Kontrolle und Funktionalität für die Entwicklungsphase.

---

## Folgen und To-dos

- Auswahl eines VPS-Anbieters (z.B. Hetzner, DigitalOcean)
- Setup von Server mit Linux (Ubuntu/Debian)
- Konfiguration von Web-Server (Nginx) als Reverse Proxy
- Setup von Datenbank (PostgreSQL oder MySQL)
- Konfiguration von SSL-Zertifikaten (Let's Encrypt)
- Implementierung von Backup-Strategie
- Monitoring-Setup (z.B. mit Prometheus/Grafana oder einfachem Logging)
- Deployment-Automatisierung (z.B. mit GitHub Actions)
- Dokumentation der Infrastruktur

---

## Probleme

- Manuelles Scaling erfordert Monitoring und proaktives Handeln bei steigender Last
- Backup-Strategie muss sorgfältig geplant werden (tägliche Backups empfohlen)
- Sicherheits-Updates müssen regelmäßig durchgeführt werden
- Bei hoher Nutzung muss Migration zu Cloud-Provider geplant werden
- Single Point of Failure bei nur einem Server -> später Redundanz einplanen

