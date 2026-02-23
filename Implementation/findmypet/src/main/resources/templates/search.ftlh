<#import "layout.ftlh" as layout>

<@layout.page_layout>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Suche - FindMyPet</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        /* Grundstyling */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f2f5;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        h1 { color: #007bff; text-align: center; margin-bottom: 30px; }

        /* Container für das Formular */
        #search-form {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            max-width: 1000px;
            margin: 0 auto 40px;
        }

        /* Karte */
        #map { height: 400px; border-radius: 8px; margin-bottom: 20px; cursor: crosshair; border: 1px solid #ddd; }

        /* Filter-Grid */
        .filter-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
        }

        .filter-section label { font-weight: bold; font-size: 0.9rem; color: #555; }
        .filter-section input, .filter-section select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-top: 5px;
        }

        /* Status Texte */
        .active-location { color: #28a745; font-weight: bold; background: #e8f5e9; padding: 5px 10px; border-radius: 4px; }
        .no-location { color: #666; font-style: italic; background: #f8f9fa; padding: 5px 10px; border-radius: 4px; }

        /* Such-Button */
        .btn-submit {
            cursor: pointer;
            transition: background 0.2s;
            width: 100%;
            font-size: 1rem;
            font-weight: bold;
        }
        .btn-submit:hover { background: #0056b3 !important; }

        /* Ergebnisse */
        .results-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 25px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .card {
            background: white;
            border: none;
            padding: 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s;
            display: flex;
            flex-direction: column;
        }
        .card:hover { transform: translateY(-5px); }
        .card img { width: 100%; height: 200px; object-fit: cover; }
        .card h3 { margin: 15px 15px 5px; font-size: 1.25rem; color: #007bff; }
        .card p { margin: 5px 15px; color: #666; font-size: 0.95rem; }
        .card b { color: #333; }

        .card a {
            margin: 15px;
            padding: 10px;
            background: #f8f9fa;
            color: #007bff;
            text-decoration: none;
            text-align: center;
            border: 1px solid #007bff;
            border-radius: 6px;
            font-weight: bold;
            transition: all 0.2s;
        }
        .card a:hover { background: #007bff; color: white; }

        /* Pagination Buttons */
        #pagination { text-align: center; margin-top: 40px; padding-bottom: 40px; }
        #pagination button {
            padding: 8px 15px;
            margin: 0 5px;
            border: 1px solid #007bff;
            background: white;
            color: #007bff;
            border-radius: 4px;
            cursor: pointer;
        }
        #pagination button:disabled { background: #007bff; color: white; cursor: default; }
    </style>
</head>
<body>

<div class="container">
    <h1>Vermisste Tiere suchen</h1>

    <div id="search-form">
        <div class="filter-section">
            <div>
                <label>Name des Tieres</label><br>
                <input type="text" id="petName" placeholder="z.B. Bello">
            </div>

            <div>
                <label>Tierart</label><br>
                <select id="species">
                    <option value="">Alle</option>
                    <#list speciesList as s><option value="${s}">${s.displayName}</option></#list>
                </select>
            </div>

            <div>
                <label>Farbe</label><br>
                <select id="color">
                    <option value="">Alle</option>
                    <#list colorList as c><option value="${c}">${c.displayName}</option></#list>
                </select>
            </div>

            <div>
                <label>Größe</label><br>
                <select id="size">
                    <option value="">Alle</option>
                    <#list sizeList as sz><option value="${sz}">${sz.displayName}</option></#list>
                </select>
            </div>

            <div>
                <label>Alter</label><br>
                <select id="age">
                    <option value="">Alle</option>
                    <#list ageList as a><option value="${a}">${a.displayName}</option></#list>
                </select>
            </div>

            <div>
                <label>Umkreis (km)</label><br>
                <input type="number" id="radius" value="30" min="1" max="500">
            </div>
        </div>

        <h3>Gebiet einschränken (Optional)</h3>
        <p id="location-status" class="no-location">Klicke auf die Karte, um einen Suchpunkt zu setzen. Ein zweiter klick entfernt ihn wieder.</p>
        <div id="map"></div>

        <button onclick="performSearch(0)" class="btn-submit" style="padding: 12px 20px; background: #007bff; color: white; border: none; border-radius: 5px;">
            Tier suchen
        </button>
    </div>

    <hr style="border: 0; height: 1px; background: #ddd; margin: 40px 0;">

    <div id="results-area">
        <div id="results-list" class="results-container">
        </div>
        <div id="pagination"></div>
    </div>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<#noparse>
    <script>
        let map, marker, selectedLat = null, selectedLon = null;

        // 1. Karte initialisieren
        function initMap() {
            map = L.map('map').setView([51.0232, 7.5646], 12); // Default Gummersbach
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            map.on('click', function(e) {
                if (marker) {
                    map.removeLayer(marker);
                    marker = null;
                    selectedLat = null;
                    selectedLon = null;
                    document.getElementById('location-status').innerText = "Suche ohne Gebietsfilter.";
                    document.getElementById('location-status').className = "no-location";
                } else {
                    selectedLat = e.latlng.lat;
                    selectedLon = e.latlng.lng;
                    marker = L.marker([selectedLat, selectedLon]).addTo(map);
                    document.getElementById('location-status').innerText = "Standort gesetzt: " + selectedLat.toFixed(4) + ", " + selectedLon.toFixed(4);
                    document.getElementById('location-status').className = "active-location";
                }
            });
        }

        function performSearch(page) {
            const params = new URLSearchParams({
                petName: document.getElementById('petName').value,
                species: document.getElementById('species').value,
                color: document.getElementById('color').value,
                petSize: document.getElementById('size').value,
                age: document.getElementById('age').value,
                radius: document.getElementById('radius').value,
                page: page,
                size: 6
            });

            if (selectedLat && selectedLon) {
                params.append('lat', selectedLat);
                params.append('lon', selectedLon);
            }

            fetch('/api/reports/search?' + params.toString())
                .then(response => response.json())
                .then(data => {
                    if (data.content){
                        renderResults(data.content);
                        renderPagination(data);
                    }
                })
                .catch(error => console.error('Fehler bei der Suche:', error));
        }

        function renderResults(reports) {
            const container = document.getElementById('results-list');
            container.innerHTML = reports.length === 0 ? '<p style="text-align: center; grid-column: 1/-1;">Keine Berichte gefunden.</p>' : '';

            reports.forEach(report => {
                container.innerHTML += `
                <div class="card">
                    <img src="${report.previewImage || 'placeholder.jpg'}" alt="Tierbild">
                    <h3>${report.petName}</h3>
                    <p><b>Tierart:</b> ${report.species}</p>
                    ${report.distanceToUser ? `<p><b>Entfernung:</b> ${report.distanceToUser.toFixed(1)} km</p>` : ''}
                    <a href="/missing-reports/${report.id}">Details ansehen</a>
                </div>
            `;
            });
        }

        function renderPagination(pageData) {
            const container = document.getElementById('pagination');
            container.innerHTML = '';
            for (let i = 0; i < pageData.totalPages; i++) {
                container.innerHTML += `<button onclick="performSearch(${i})" ${pageData.number === i ? 'disabled' : ''}>${i + 1}</button> `;
            }
        }

        window.onload = initMap;
    </script>
</#noparse>
</body>
</html>
</@layout.page_layout>