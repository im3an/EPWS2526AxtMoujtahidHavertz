// Simple Map v2 - Map with markers, zones and circles

let map;
let markers = [];
let currentTool = 'marker';

// Initialize map
function initMap() {
    map = L.map('map').setView([51.1657, 10.4515], 6);
    
    // OpenStreetMap tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Enable Geoman but hide default controls
    map.pm.addControls({
        position: 'topleft',
        drawCircle: false,
        drawMarker: false,
        drawPolyline: false,
        drawRectangle: false,
        drawPolygon: false,
        editMode: false,
        dragMode: false,
        cutPolygon: false,
        removalMode: false
    });
    
    // Add marker on click (only when marker tool is active)
    map.on('click', function(e) {
        if (currentTool === 'marker') {
            addMarker(e.latlng);
        }
    });
    
    // Initialize tool buttons
    initTools();
}

// Initialize tool selection
function initTools() {
    const markerBtn = document.getElementById('tool-marker');
    const polygonBtn = document.getElementById('tool-polygon');
    const circleBtn = document.getElementById('tool-circle');
    
    markerBtn.addEventListener('click', () => setTool('marker'));
    polygonBtn.addEventListener('click', () => setTool('polygon'));
    circleBtn.addEventListener('click', () => setTool('circle'));
}

// Set active tool
function setTool(tool) {
    currentTool = tool;
    
    // Update button states
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    
    // Disable all drawing modes
    map.pm.disableDraw();
    
    // Enable selected tool
    if (tool === 'marker') {
        document.getElementById('tool-marker').classList.add('active');
    } else if (tool === 'polygon') {
        document.getElementById('tool-polygon').classList.add('active');
        map.pm.enableDraw('Polygon', {
            snappable: true,
            snapDistance: 20
        });
    } else if (tool === 'circle') {
        document.getElementById('tool-circle').classList.add('active');
        map.pm.enableDraw('Circle', {
            snappable: true,
            snapDistance: 20
        });
    }
}

// Add marker at position
function addMarker(latlng) {
    const marker = L.marker(latlng).addTo(map);
    markers.push(marker);
}

// Initialize when page loads
initMap();

