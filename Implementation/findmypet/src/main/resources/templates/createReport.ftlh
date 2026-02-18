
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <style>
            div {height: 180px}
        </style>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
              integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
              crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                crossorigin=""></script>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>


    <h1>Create new Missing Report</h1>

    <form id="createReportForm">
        <label for="petName">Name of the Pet*</label>
        <input type="text" id="petName" name="petName" required><br><br>

        <label for="species">Species*</label>
        <select id="species" name="species" required>
            <option value="DOG">Dog</option>
            <option value="CAT">Cat</option>
            <option value="OTHER">Other</option>
        </select><br><br>

        <label for="age">Age*</label>
        <select id="age" name="age" required>
            <option value="BABY">Baby</option>
            <option value="YOUNG">Young</option>
            <option value="ADULT">Adult</option>
            <option value="SENIOR">Senior</option>
        </select><br><br>

        <label for="breed">Breed</label>
        <input type="text" id="breed" name="breed"><br><br>

        <label for="primaryColor">Primary Color*</label>
        <select id="primaryColor" name="primaryColor" required>
            <option value="BLACK">Black</option>
            <option value="WHITE">White</option>
            <option value="BROWN">Brown</option>
            <option value="GRAY">Gray</option>
            <option value="RED">Red</option>
            <option value="ORANGE">Orange</option>
            <option value="CREME">Creme</option>
            <option value="TRICOLOR">Tricolor</option>
            <option value="OTHER">Other</option>
        </select><br><br>

        <label for="furColorExtras">Additional fur information</label>
        <textarea id="furColorExtras" name="furColorExtras"></textarea><br><br>

        <label for="chipNumber">Chip Number</label>
        <input type="text" id="chipNumber" name="chipNumber"><br><br>

        <div id="mapDiv" >
            <script>
                var map = L.map('mapDiv').setView([51.505, -0.09], 13);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
                var marker = L.marker([50.9375, 6.9603]).addTo(map);
            </script>
        </div>
        HIER LOCATION KARTE <br><br>

        <label for="description">Additional Information</label>
        <textarea id="description" name="description"></textarea><br><br>

        <label for="lostDate">When was it lost?*</label>
        <input type="datetime-local" id="lostDate" name="lostDate" required><br><br>

        <label for="imageUpload">Upload pictures</label>
        <input type="file" id="imageUpload" accept="image/*" multiple>

        <label for="isPublic">Make this report public</label>
        <input type="checkbox" id="isPublic" name="isPublic">
        <input type="button" value="Save Report" onclick="createReport()">
    </form>

    <script>
        async function createReport() {
            const fileInput = document.getElementById('imageUpload')
            const base64Images = [];

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
                colorDetails: document.getElementById('furColorExtras').value,
                chipNumber: document.getElementById('chipNumber').value,
                description: document.getElementById('description').value,
                lostDate: document.getElementById('lostDate').value,
                images: base64Images,
                isPublic: document.getElementById('isPublic').checked,
                petSize: "MEDIUM", //Ist not nullable deswegen hier hard coded standardwert.
                // Location lassen wir erst mal hard coded, bis die Karte implementiert ist
                location: {
                    latitude: 50.9375,
                    longitude: 6.9603
                },
                status: true
            };

            try {
                const response = await fetch('/api/v1/missing-reports', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reportData)
                });

                if (response.ok) {
                    alert("Report created!");
                    window.location.href = "/dashboard";
                } else {
                    const errorText = await response.text();
                    console.error("Backend Error:", errorText);
                    alert("Check your inputs: " + errorText);
                }
            } catch (err) {
                console.error("Failed to send", err);
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