<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div class="reports-grid">
    <#list reports as report>
        <div class="card">
            <#if report.previewImage?has_content>
                <img src="${report.previewImage}" alt="${report.petName}">
            <#else>
                <div class="placeholder">Kein Bild vorhanden</div>
            </#if>

            <div class="card-content">
                <h3>${report.petName}</h3>
                <p>${report.species}</p>
                <p class="distance">
                    <strong>${report.distanceToUser?string("0.0")} km</strong> von dir entfernt
                </p>
                <a href="/reports/${report.id}" class="btn">Details</a>
            </div>
        </div>
    </#list>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const urlParams = new URLSearchParams(window.location.search);

        // Wir prüfen, ob 'lat' in der URL fehlt ODER ob es noch der Standardwert ist
        if (!urlParams.has('lat')) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    // Seite mit den echten Werten neu aufrufen
                    window.location.href = "/?lat=" + lat + "&lon=" + lon;
                }, function(error) {
                    console.error("GPS Fehler: " + error.message);
                    alert("Bitte erlaube den Standortzugriff, um Tiere in deiner Nähe zu sehen.");
                });
            }
        }
    });
</script>
</body>
</html>