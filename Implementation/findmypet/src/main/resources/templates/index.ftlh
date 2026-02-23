<#import "layout.ftlh" as layout>

<@layout.page_layout>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FindMyPet - Vermisste Tiere in deiner Nähe</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #007bff;
            --primary-hover: #0056b3;
            --text-main: #2d3436;
            --text-muted: #636e72;
            --bg-body: #f8f9fa;
            --card-bg: #ffffff;
            --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-body);
            color: var(--text-main);
            margin: 0;
            padding: 20px;
        }

        header {
            text-align: center;
            margin-bottom: 40px;
        }

        h1 {
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 10px;
        }

        .subtitle {
            color: var(--text-muted);
            font-size: 1.1rem;
        }

        /* Das Grid für die Karten */
        .reports-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 25px;
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Die Karten */
        .card {
            background: var(--card-bg);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(0,0,0,0.05);
        }

        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        /* Bild-Styling */
        .card img, .placeholder {
            width: 100%;
            height: 220px;
            object-fit: cover;
            border-bottom: 1px solid #eee;
        }

        .placeholder {
            background-color: #dfe6e9;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-muted);
            font-weight: 600;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
        }

        /* Content der Karte */
        .card-content {
            padding: 20px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        .card-content h3 {
            margin: 0 0 8px 0;
            font-size: 1.4rem;
            color: var(--text-main);
        }

        .species-tag {
            display: inline-block;
            background: #e1f0ff;
            color: var(--primary);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 15px;
            align-self: flex-start;
        }

        .distance {
            margin-top: auto;
            font-size: 0.95rem;
            color: var(--text-muted);
            border-top: 1px solid #f1f1f1;
            padding-top: 15px;
            margin-bottom: 15px;
        }

        .distance strong {
            color: #2d3436;
        }

        /* Button-Styling */
        .btn {
            text-decoration: none;
            background-color: var(--primary);
            color: white;
            text-align: center;
            padding: 12px;
            border-radius: 8px;
            font-weight: 600;
            transition: background 0.2s;
        }

        .btn:hover {
            background-color: var(--primary-hover);
        }

        /* GPS Status Nachricht */
        #gps-status {
            max-width: 600px;
            margin: 0 auto 20px;
            text-align: center;
            padding: 10px;
            border-radius: 8px;
            font-size: 0.9rem;
            display: none; /* Wird nur angezeigt, wenn GPS lädt */
        }
    </style>
</head>
<body>

<header>
    <h1>🐾 FindMyPet</h1>
    <p class="subtitle">Hilf mit, vermisste Tiere in deiner Umgebung zu finden.</p>
</header>

<div id="gps-status" style="background: #fff3cd; color: #856404;">
    Suche deinen Standort für Ergebnisse in deiner Nähe...
</div>

<div class="reports-grid">
    <#list reports as report>
        <div class="card">
            <#if report.previewImage?has_content>
                <img src="${report.previewImage}" alt="${report.petName}">
            <#else>
                <div class="placeholder">Kein Bild vorhanden</div>
            </#if>

            <div class="card-content">
                <span class="species-tag">${report.species}</span>
                <h3>${report.petName}</h3>

                <p class="distance">
                    <strong>${report.distanceToUser?string("0.0")} km</strong> von dir entfernt
                </p>

                <a href="/missing-reports/${report.id}" class="btn">Details ansehen</a>
            </div>
        </div>
    </#list>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const urlParams = new URLSearchParams(window.location.search);

        if (!urlParams.has('lat')) {
            const statusBox = document.getElementById('gps-status');
            if (navigator.geolocation) {
                statusBox.style.display = 'block';
                navigator.geolocation.getCurrentPosition(function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    window.location.href = "/?lat=" + lat + "&lon=" + lon;
                }, function(error) {
                    statusBox.innerHTML = "⚠️ Standortzugriff verweigert. Zeige allgemeine Ergebnisse.";
                    console.error("GPS Fehler: " + error.message);
                });
            }
        }
    });
</script>
</body>
</html>
</@layout.page_layout>