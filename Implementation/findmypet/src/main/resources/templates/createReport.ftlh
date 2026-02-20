<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FindMyPet - Meldung erstellen</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>

    <style>
        :root {
            --primary-blue: #0056b3;
            --secondary-blue: #e7f1ff;
            --accent-orange: #ff8c00;
            --text-dark: #333;
            --bg-light: #f4f7f6;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-light);
            color: var(--text-dark);
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        h1 {
            color: var(--primary-blue);
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid var(--secondary-blue);
            padding-bottom: 10px;
        }

        .grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }

        @media (max-width: 768px) {
            .grid-container { grid-template-columns: 1fr; }
        }

        .form-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            font-weight: 600;
            margin-bottom: 5px;
            font-size: 0.9rem;
        }

        input[type="text"],
        input[type="datetime-local"],
        select,
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 1rem;
        }

        textarea { height: 80px; resize: vertical; }

        /* Karten Styling */
        #mapDiv {
            height: 400px; /* Feste, ordentliche Höhe */
            width: 100%;
            border-radius: 12px;
            border: 2px solid var(--secondary-blue);
            margin-bottom: 10px;
        }

        .map-wrapper {
            background: var(--secondary-blue);
            padding: 10px;
            border-radius: 15px;
        }

        /* Button Styling */
        .btn-submit {
            grid-column: 1 / -1;
            background-color: var(--primary-blue);
            color: white;
            padding: 15px;
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s ease;
            margin-top: 20px;
        }

        .btn-submit:hover {
            background-color: #003d7a;
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 10px;
            background: var(--secondary-blue);
            padding: 10px;
            border-radius: 8px;
        }

        .checkbox-group input { width: auto; }
    </style>
</head>
<body>

<div class="container">
    <h1>Vermisstenmeldung erstellen</h1>

    <form id="createReportForm">
        <div class="grid-container">
            <div class="info-section">
                <div class="form-group">
                    <label for="petName">Name des Tieres*</label>
                    <input type="text" id="petName" name="petName" placeholder="z.B. Bello" required>
                </div>

                <div style="display: flex; gap: 10px;">
                    <div class="form-group" style="flex: 1;">
                        <label for="species">Art*</label>
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
                    <input type="text" id="breed" name="breed" placeholder="z.B. Golden Retriever">
                </div>

                <div class="form-group">
                    <label for="primaryColor">Hauptfarbe*</label>
                    <select id="primaryColor" name="primaryColor" required>
                        <option value="BLACK">Schwarz</option>
                        <option value="WHITE">Weiß</option>
                        <option value="BROWN">Braun</option>
                        <option value="GRAY">Grau</option>
                        <option value="RED">Rot</option>
                        <option value="TRICOLOR">Dreifarbig</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="description">Besondere Merkmale</label>
                    <textarea id="description" name="description" placeholder="Halsband, Narben, Verhalten..."></textarea>
                </div>

                <div class="form-group">
                    <label for="lostDate">Wann wurde es verloren?*</label>
                    <input type="datetime-local" id="lostDate" name="lostDate" required>
                </div>
            </div>

            <div class="map-section">
                <label>Letzter bekannter Standort (Klick zum Markieren)</label>
                <div class="map-wrapper">
                    <div id="mapDiv"></div>
                </div>

                <div class="form-group" style="margin-top: 20px;">
                    <label for="imageUpload">Fotos hochladen</label>
                    <input type="file" id="imageUpload" accept="image/*" multiple>
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" id="isPublic" name="isPublic" checked>
                    <label for="isPublic" style="margin-bottom: 0;">Meldung öffentlich sichtbar machen</label>
                </div>
            </div>

            <input type="button" class="btn-submit" value="Bericht speichern & Suche starten" onclick="createReport()">
        </div>
    </form>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

<script>
    // Karte initialisieren
    let selectedLat = 50.9375;
    let selectedLon = 6.9603;

    var map = L.map('mapDiv').setView([selectedLat, selectedLon], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    var marker = L.marker([selectedLat, selectedLon], {draggable: false}).addTo(map);

    map.on('click', function(e) {
        selectedLat = e.latlng.lat;
        selectedLon = e.latlng.lng;
        marker.setLatLng([selectedLat, selectedLon]);
    });

    // Deine bestehende Logik (createReport und processImage) hier einfügen...
    async function createReport() {
        // ... (Dein Code bleibt gleich)
        alert("Sende Daten für: " + document.getElementById('petName').value + " an Position: " + selectedLat + ", " + selectedLon);
        // Hier folgt dein fetch...
    }
</script>

</body>
</html>