<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FindMyPet | Vermisstenmeldung erstellen</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""/>

    <style>
        :root {
            --primary-blue: #0056b3;
            --secondary-blue: #e7f1ff;
            --accent-orange: #ff8c00;
            --text-dark: #2c3e50;
            --bg-light: #f8fafc;
            --white: #ffffff;
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: var(--bg-light);
            color: var(--text-dark);
            margin: 0;
            padding: 20px;
            line-height: 1.5;
        }

        .container {
            max-width: 1100px;
            margin: 0 auto;
            background: var(--white);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        h1 {
            color: var(--primary-blue);
            font-size: 2rem;
            margin-bottom: 10px;
            text-align: center;
        }

        .subtitle {
            text-align: center;
            color: #64748b;
            margin-bottom: 40px;
        }

        .grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }

        @media (max-width: 900px) {
            .grid-container { grid-template-columns: 1fr; }
            .container { padding: 20px; }
        }

        /* Formular Styling */
        .section-title {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--primary-blue);
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 0.9rem;
        }

        input[type="text"],
        input[type="datetime-local"],
        select,
        textarea {
            width: 100%;
            padding: 12px;
            border: 1.5px solid #e2e8f0;
            border-radius: 10px;
            box-sizing: border-box;
            font-size: 1rem;
            transition: border-color 0.2s;
        }

        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: var(--primary-blue);
        }

        textarea { height: 100px; resize: vertical; }

        /* Karte */
        #mapDiv {
            height: 450px;
            width: 100%;
            border-radius: 15px;
            border: 2px solid var(--secondary-blue);
            z-index: 1;
        }

        .map-wrapper {
            position: relative;
            background: #fff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        /* Buttons & Extras */
        .btn-submit {
            grid-column: 1 / -1;
            background-color: var(--primary-blue);
            color: white;
            padding: 18px;
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s, background 0.2s;
            margin-top: 20px;
        }

        .btn-submit:hover {
            background-color: #004494;
            transform: translateY(-2px);
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 15px;
            background: var(--bg-light);
            border-radius: 10px;
            margin-top: 15px;
        }

        .checkbox-group input { width: 20px; height: 20px; cursor: pointer; }

        .helper-text {
            font-size: 0.8rem;
            color: #64748b;
            margin-top: 5px;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Vermisstenmeldung erstellen</h1>
    <p class="subtitle">Bitte füllen Sie alle markierten Felder aus, um die Suche zu starten.</p>

    <form id="createReportForm">
        <div class="grid-container">

            <div class="form-section">
                <div class="section-title">Basis-Informationen</div>

                <div class="form-group">
                    <label for="petName">Name des Tieres*</label>
                    <input type="text" id="petName" name="petName" required placeholder="z.B. Luna">
                </div>

                <div style="display: flex; gap: 15px;">
                    <div class="form-group" style="flex: 1;">
                        <label for="species">Tierart*</label>
                        <select id="species" name="species" required>
                            <option value="DOG">Hund</option>
                            <option value="CAT">Katze</option>
                            <option value="OTHER">Andere</option>
                        </select>
                    </div>
                    <div class="form-group" style="flex: 1;">
                        <label for="age">Alter*</label>
                        <select id="age" name="age" required>
                            <option value="BABY">Baby</option>
                            <option value="YOUNG">Jung</option>
                            <option value="ADULT">Erwachsen</option>
                            <option value="SENIOR">Senior</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="breed">Rasse</label>
                    <input type="text" id="breed" name="breed" placeholder="z.B. Mischling">
                </div>

                <div class="form-group">
                    <label for="primaryColor">Hauptfarbe*</label>
                    <select id="primaryColor" name="primaryColor" required>
                        <option value="BLACK">Schwarz</option>
                        <option value="WHITE">Weiß</option>
                        <option value="BROWN">Braun</option>
                        <option value="GRAY">Grau</option>
                        <option value="RED">Rot</option>
                        <option value="ORANGE">Orange</option>
                        <option value="CREME">Creme</option>
                        <option value="TRICOLOR">Dreifarbig</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="description">Zusätzliche Infos / Merkmale</label>
                    <textarea id="description" name="description" placeholder="Besondere Kennzeichen, Verhalten, Halsbandfarbe..."></textarea>
                </div>

                <div class="form-group">
                    <label for="lostDate">Vermisst seit*</label>
                    <input type="datetime-local" id="lostDate" name="lostDate" required>
                </div>
            </div>

            <div class="map-section">
                <div class="section-title">Fundort & Fotos</div>

                <label>Letzter bekannter Aufenthaltsort*</label>
                <div class="map-wrapper">
                    <div id="mapDiv"></div>
                </div>
                <p class="helper-text">Klicken Sie in die Karte, um den Marker exakt zu positionieren.</p>

                <div class="form-group" style="margin-top: 25px;">
                    <label for="imageUpload">Bilder hochladen</label>
                    <input type="file" id="imageUpload" accept="image/*" multiple>
                    <p class="helper-text">Mehrere Bilder möglich (max. 800px Breite).</p>
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" id="isPublic" name="isPublic" checked>
                    <label for="isPublic" style="margin-bottom: 0;">Meldung öffentlich sichtbar machen</label>
                </div>

                <input type="hidden" id="chipNumber" name="chipNumber">
                <input type="hidden" id="furColorExtras" name="furColorExtras">
            </div>

            <button type="button" class="btn-submit" onclick="createReport()">Meldung absenden & Suche aktivieren</button>
        </div>
    </form>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""></script>

<script>
    // Karte Initialisierung
    let selectedLat = 50.9375;
    let selectedLon = 6.9603;

    const map = L.map('mapDiv').setView([selectedLat, selectedLon], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const marker = L.marker([selectedLat, selectedLon], {draggable: true}).addTo(map);

    // Marker-Position aktualisieren bei Klick auf Karte
    map.on('click', function(e) {
        selectedLat = e.latlng.lat;
        selectedLon = e.latlng.lng;
        marker.setLatLng([selectedLat, selectedLon]);
    });

    // Marker-Position aktualisieren bei Ziehen des Markers
    marker.on('dragend', function(e) {
        const position = marker.getLatLng();
        selectedLat = position.lat;
        selectedLon = position.lng;
    });

    async function createReport() {
        const fileInput = document.getElementById('imageUpload');
        const base64Images = [];

        // Bilder verarbeiten
        for (let file of fileInput.files) {
            const b64 = await processImage(file);
            base64Images.push(b64);
        }

        const reportData = {
            petName: document.getElementById('petName').value,
            species: document.getElementById('species').value,
            ageRange: document.getElementById('age').value,
            breed: document.getElementById('breed').value,
            primaryColor: document.getElementById('primaryColor').value,
            colorDetails: document.getElementById('furColorExtras').value || "",
            chipNumber: document.getElementById('chipNumber').value || "",
            description: document.getElementById('description').value,
            lostDate: document.getElementById('lostDate').value,
            images: base64Images,
            isPublic: document.getElementById('isPublic').checked,
            petSize: "MEDIUM",
            location: {
                latitude: selectedLat,
                longitude: selectedLon
            },
            status: true
        };

        console.log("Sende Report:", reportData);

        try {
            const response = await fetch('/api/v1/missing-reports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reportData)
            });

            if (response.ok) {
                alert("Erfolgreich erstellt! Viel Glück bei der Suche.");
                window.location.href = "/dashboard";
            } else {
                const errorText = await response.text();
                console.error("Server Antwort:", errorText);
                alert("Fehler beim Speichern: " + errorText);
            }
        } catch (err) {
            console.error("Verbindungsfehler:", err);
            alert("Server nicht erreichbar. Bitte prüfen Sie Ihre Verbindung.");
        }
    }

    async function processImage(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
            };
        });
    }
</script>

</body>
</html>