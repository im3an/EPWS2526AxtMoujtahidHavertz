// FindMyPet Interactive Map Prototype
// Based on ADR-0002 (Leaflet.js + OpenStreetMap)
// ADR-0004 (GPS Tracking + Offline Functionality)

class MapApp {
    constructor() {
        this.map = null;
        this.annotations = [];
        this.currentTool = 'marker';
        this.trackingActive = false;
        this.trackingInterval = null;
        this.currentPosition = null;
        this.db = null;
        this.isOnline = navigator.onLine;
        this.highPriorityMode = false;
        this.trackingPoints = [];
        this.trackingTrailVisible = false;
        this.publicSearch = false;
        this.currentColor = '#624EEF';
        this.availableColors = ['#624EEF', '#EC1D43', '#EC811D', '#ECBE1D', '#B6EC1D', '#1DA2EC', '#781DEC', '#CF1DEC', '#222222'];
        
        this.init();
    }
    
    async init() {
        this.initMap();
        this.initDrawingTools();
        this.initGPS();
        this.initSearch();
        this.initUI();
        this.initIndexedDB();
        this.loadAnnotations();
        this.loadTrackingPoints();
        this.setupOfflineDetection();
    }
    
    // Initialize Leaflet Map (ADR-0002)
    initMap() {
        // Default center: Germany (adjust as needed)
        this.map = L.map('map', {
            center: [51.1657, 10.4515],
            zoom: 6,
            editable: true,
            zoomControl: false, // Disable default zoom control
            attributionControl: false, // Disable default attribution
            preferCanvas: true, // Use canvas renderer for better performance
            fadeAnimation: false, // Disable fade animation for faster updates
            zoomAnimation: false, // Disable zoom animation for faster updates
            markerZoomAnimation: false // Disable marker animation for faster updates
        });
        
        // OpenStreetMap tiles (ADR-0002) - with performance optimizations
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            updateWhenIdle: false, // Update tiles only when panning stops
            keepBuffer: 2, // Keep fewer tiles in buffer for better performance
            updateWhenZooming: false // Don't update tiles during zoom animation
        }).addTo(this.map);
        
        // Optimize map rendering - debounce updates
        this.map.on('moveend', () => {
            // Force a small delay to batch updates
            if (this.mapUpdateTimeout) {
                clearTimeout(this.mapUpdateTimeout);
            }
            this.mapUpdateTimeout = setTimeout(() => {
                this.map.invalidateSize(false); // false = don't pan, just refresh
            }, 50); // Reduced delay for faster refresh
        });
        
        // Optimize zoom events
        this.map.on('zoomend', () => {
            if (this.zoneRefreshTimeout) {
                clearTimeout(this.zoneRefreshTimeout);
            }
            this.zoneRefreshTimeout = setTimeout(() => {
                // Refresh zone styles efficiently
                this.annotations.forEach(ann => {
                    if (ann.layer && !(ann.layer instanceof L.Marker)) {
                        // Only update if needed
                        ann.layer.redraw();
                    }
                });
            }, 50);
        });
        
        // Enable Geoman drawing tools but hide the default controls
        this.map.pm.addControls({
            position: 'topleft',
            drawCircle: false,
            drawMarker: false,
            drawPolyline: false,
            drawRectangle: false,
            drawPolygon: false,
            editMode: true,
            dragMode: false, // Disable drag mode to prevent zones from moving
            cutPolygon: false,
            removalMode: true
        });
        
        // Hide Geoman controls by default
        const geomanControls = document.querySelector('.leaflet-pm-toolbar');
        if (geomanControls) {
            geomanControls.style.display = 'none';
        }
        
        // Set global options for Geoman
        this.map.pm.setGlobalOptions({
            allowSelfIntersection: false,
            snappable: true,
            snapDistance: 20
        });
        
        // Handle map clicks for custom tools
        this.map.on('click', (e) => {
            if (this.currentTool === 'marker') {
                this.addMarker(e.latlng);
            } else if (this.currentTool === 'interest-point') {
                this.addInterestPoint(e.latlng);
            }
        });
        
        // Handle Geoman events
        this.map.on('pm:create', (e) => {
            this.handleDrawingCreated(e);
        });
        
        this.map.on('pm:drawend', (e) => {
            // Drawing is complete, but don't disable yet - wait for popup
            // The popup will handle disabling the drawing mode
        });
        
        this.map.on('pm:remove', (e) => {
            this.handleDrawingRemoved(e);
        });
    }
    
    // Initialize drawing tools
    initDrawingTools() {
        // Toolbar buttons
        document.getElementById('toolbar-marker').addEventListener('click', () => this.setTool('marker'));
        document.getElementById('toolbar-interest-point').addEventListener('click', () => this.setTool('interest-point'));
        document.getElementById('toolbar-polygon').addEventListener('click', () => this.setTool('polygon'));
        document.getElementById('toolbar-circle').addEventListener('click', () => this.setTool('circle'));
        
        // Sidebar buttons
        document.getElementById('tool-marker').addEventListener('click', () => this.setTool('marker'));
        document.getElementById('tool-interest-point').addEventListener('click', () => this.setTool('interest-point'));
        document.getElementById('tool-polygon').addEventListener('click', () => this.setTool('polygon'));
        document.getElementById('tool-circle').addEventListener('click', () => this.setTool('circle'));
        
        // Priority buttons
        document.getElementById('priority-high').addEventListener('click', () => this.togglePriority());
        document.getElementById('priority-normal').addEventListener('click', () => this.togglePriority());
        
        // Public/Private toggle
        document.getElementById('public-search').addEventListener('change', (e) => {
            this.publicSearch = e.target.checked;
            this.showToast(this.publicSearch ? 'Suchaktion ist jetzt öffentlich' : 'Suchaktion ist jetzt privat');
        });
        
        // Tools toggle
        const toolsToggle = document.getElementById('tools-toggle');
        const toolsDropdown = document.getElementById('tools-dropdown');
        const closeTools = document.getElementById('close-tools');
        
        toolsToggle.addEventListener('click', () => {
            toolsDropdown.classList.toggle('hidden');
            toolsToggle.classList.toggle('active');
        });
        
        closeTools.addEventListener('click', () => {
            toolsDropdown.classList.add('hidden');
            toolsToggle.classList.remove('active');
        });
        
        // Close tools when clicking outside
        document.addEventListener('click', (e) => {
            if (!toolsDropdown.contains(e.target) && !toolsToggle.contains(e.target)) {
                toolsDropdown.classList.add('hidden');
                toolsToggle.classList.remove('active');
            }
        });
        
        // Geoman tool buttons
        document.getElementById('btn-edit-mode')?.addEventListener('click', () => {
            this.map.pm.toggleGlobalEditMode();
            this.showToast('Bearbeitungsmodus umgeschaltet');
        });
        
        document.getElementById('btn-remove-mode')?.addEventListener('click', () => {
            this.map.pm.toggleGlobalRemovalMode();
            this.showToast('Löschmodus umgeschaltet');
        });
        
        // Zoom controls (new location)
        document.getElementById('zoom-in').addEventListener('click', () => this.map.zoomIn());
        document.getElementById('zoom-out').addEventListener('click', () => this.map.zoomOut());
        
        // Location control (new location)
        document.getElementById('location-control').addEventListener('click', () => this.locateUser());
    }
    
    togglePriority() {
        this.highPriorityMode = !this.highPriorityMode;
        document.getElementById('priority-high').style.display = this.highPriorityMode ? 'none' : 'block';
        document.getElementById('priority-normal').style.display = this.highPriorityMode ? 'block' : 'none';
        this.showToast(this.highPriorityMode ? 'Hohe Priorität aktiviert' : 'Normale Priorität');
    }
    
    setTool(tool) {
        this.currentTool = tool;
        
        // Disable all Geoman tools
        this.map.pm.disableDraw();
        
        // Update UI
        document.querySelectorAll('.tool').forEach(btn => btn.classList.remove('tool-active'));
        document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
        
        // Enable selected tool
        switch(tool) {
            case 'marker':
                document.getElementById('toolbar-marker').classList.add('tool-active');
                document.getElementById('tool-marker').classList.add('active');
                break;
            case 'interest-point':
                document.getElementById('toolbar-interest-point').classList.add('tool-active');
                document.getElementById('tool-interest-point').classList.add('active');
                break;
            case 'polygon':
                this.map.pm.setPathOptions({
                    color: this.currentColor,
                    fillColor: this.currentColor,
                    fillOpacity: 0.3,
                    weight: 2,
                    pane: 'overlayPane' // Ensure correct pane
                });
                this.map.pm.enableDraw('Polygon', {
                    tooltips: false,
                    snappable: true,
                    templineStyle: {color: this.currentColor},
                    hintlineStyle: {color: this.currentColor, dashArray: [5, 5]},
                    pmIgnore: false,
                    allowSelfIntersection: false,
                    finishOn: 'dblclick' // Double-click to finish polygon
                });
                document.getElementById('toolbar-polygon').classList.add('tool-active');
                document.getElementById('tool-polygon').classList.add('active');
                break;
            case 'circle':
                this.map.pm.setPathOptions({
                    color: this.currentColor,
                    fillColor: this.currentColor,
                    fillOpacity: 0.3,
                    weight: 2,
                    pane: 'overlayPane' // Ensure correct pane
                });
                this.map.pm.enableDraw('Circle', {
                    tooltips: false,
                    snappable: true,
                    templineStyle: {color: this.currentColor},
                    hintlineStyle: {color: this.currentColor, dashArray: [5, 5]},
                    pmIgnore: false
                });
                document.getElementById('toolbar-circle').classList.add('tool-active');
                document.getElementById('tool-circle').classList.add('active');
                break;
        }
    }
    
    // Add marker manually
    addMarker(latlng) {
        // Show popup for marker details
        this.showShapePopup(latlng, 'marker', null);
    }
    
    // Add point of special interest
    addInterestPoint(latlng) {
        const marker = L.marker(latlng, {
            draggable: true,
            pmIgnore: false,
            icon: L.divIcon({
                className: 'interest-point-marker',
                html: '<div style="background: #FFD700; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 18px;">⭐</div>',
                iconSize: [32, 32]
            })
        }).addTo(this.map);
        
        const annotation = {
            id: this.generateId(),
            type: 'interest-point',
            layer: marker,
            name: `Punkt von besonderem Interesse ${this.annotations.length + 1}`,
            description: '',
            latlng: latlng,
            createdAt: new Date().toISOString()
        };
        
        marker.bindPopup(`<b>${annotation.name}</b><br>Punkt von besonderem Interesse`);
        
        this.annotations.push(annotation);
        this.saveAnnotation(annotation);
        this.updateAnnotationsList();
        
        // Show popup for details
        setTimeout(() => {
            this.showShapePopup(latlng, 'interest-point', marker);
        }, 100);
    }
    
    // Show popup for creating/editing shapes
    showShapePopup(latlng, type, layer) {
        const popup = document.getElementById('shape-popup');
        if (!popup) {
            console.error('Popup element not found!');
            return;
        }
        const isEdit = layer !== null;
        
        // Get existing data if editing
        let existingData = {};
        if (isEdit) {
            const annotation = this.annotations.find(a => a.layer === layer);
            if (annotation) {
                existingData = {
                    name: annotation.name || '',
                    description: annotation.description || '',
                    color: annotation.color || this.currentColor,
                    priority: annotation.priority || 'normal',
                    searchStatus: annotation.searchStatus || 'not-searched',
                    assignedTo: annotation.assignedTo || '',
                    assignedType: annotation.assignedType || 'user'
                };
            }
        }
        
        const typeName = type === 'marker' ? 'Marker' : type === 'interest-point' ? 'Punkt von besonderem Interesse' : 'Suchbereich';
        const popupContent = `
            <div class="create-shape-flow">
                <h1>${isEdit ? 'Bearbeiten' : 'Neuer ' + typeName}</h1>
                <label>Name</label>
                <input type="text" id="shape-name" placeholder="Name..." value="${existingData.name || ''}">
                <label>Beschreibung</label>
                <textarea id="shape-description" placeholder="Beschreibung...">${existingData.description || ''}</textarea>
                ${type !== 'marker' && type !== 'interest-point' ? `
                    <label>Farbe</label>
                    <div id="color-picker-popup" style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px;">
                        ${this.availableColors.map(c => `
                            <div class="color-option" data-color="${c}" style="width: 30px; height: 30px; border-radius: 50%; background: ${c}; border: 2px solid ${(existingData.color || this.currentColor) === c ? '#222' : '#E8E8E8'}; cursor: pointer; transition: all 0.2s;" title="${c}"></div>
                        `).join('')}
                    </div>
                    <label>Priorität</label>
                    <select id="shape-priority">
                        <option value="normal" ${existingData.priority === 'normal' || !existingData.priority ? 'selected' : ''}>Normale Priorität</option>
                        <option value="high" ${existingData.priority === 'high' ? 'selected' : ''}>Hohe Priorität (Haustier wurde hier gesehen)</option>
                    </select>
                    <label>Suchstatus</label>
                    <select id="shape-search-status">
                        <option value="not-searched" ${existingData.searchStatus === 'not-searched' ? 'selected' : ''}>Nicht durchsucht</option>
                        <option value="searched" ${existingData.searchStatus === 'searched' ? 'selected' : ''}>Durchsucht</option>
                    </select>
                    <label>Zugewiesen an</label>
                    <select id="shape-assigned-type">
                        <option value="user" ${existingData.assignedType === 'user' ? 'selected' : ''}>Benutzer</option>
                        <option value="group" ${existingData.assignedType === 'group' ? 'selected' : ''}>Gruppe</option>
                    </select>
                    <input type="text" id="shape-assigned-to" placeholder="Name des Benutzers/Gruppe..." value="${existingData.assignedTo || ''}">
                ` : ''}
                <div id="buttons">
                    <button class="save-button" id="save-shape">Speichern</button>
                    <button class="cancel-button" id="cancel-shape">Abbrechen</button>
                </div>
            </div>
        `;
        
        // Show overlay
        const currentOverlay = document.getElementById('shape-popup-overlay');
        if (currentOverlay) {
            currentOverlay.classList.add('show');
            // Add click handler to close popup
            const closePopup = () => {
                popup.style.display = 'none';
                currentOverlay.classList.remove('show');
                if (layer && !isEdit) {
                    this.map.removeLayer(layer);
                    const index = this.annotations.findIndex(a => a.layer === layer);
                    if (index !== -1) {
                        this.annotations.splice(index, 1);
                        this.updateAnnotationsList();
                    }
                }
                this.map.pm.disableDraw();
                this.setTool('marker');
                currentOverlay.removeEventListener('click', closePopup);
            };
            currentOverlay.addEventListener('click', closePopup);
        }
        
        // Clear popup first
        popup.innerHTML = popupContent;
        popup.style.display = 'block';
        popup.style.zIndex = '1000001';
        
        // Position popup - center it on screen for better UX
        popup.style.left = '50%';
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.position = 'fixed';
        
        // Get elements after popup is populated
        const saveButton = document.getElementById('save-shape');
        const cancelButton = document.getElementById('cancel-shape');
        
        // Color picker event handlers
        let selectedColor = existingData.color || this.currentColor;
        if (type !== 'marker' && type !== 'interest-point') {
            const colorOptions = popup.querySelectorAll('.color-option');
            
            // Set initial selection
            colorOptions.forEach(opt => {
                if (opt.dataset.color === selectedColor) {
                    opt.style.border = '2px solid #222';
                }
            });
            
            colorOptions.forEach(option => {
                option.addEventListener('click', () => {
                    // Update visual selection
                    colorOptions.forEach(opt => opt.style.border = '2px solid #E8E8E8');
                    option.style.border = '2px solid #222';
                    selectedColor = option.dataset.color;
                    this.tempSelectedColor = selectedColor;
                });
            });
            
            // Store selected color for save
            this.tempSelectedColor = selectedColor;
        }
        
        // Save button event handler
        saveButton.addEventListener('click', () => {
            const name = document.getElementById('shape-name').value || `${type === 'marker' ? 'Marker' : type === 'interest-point' ? 'Punkt von besonderem Interesse' : 'Bereich'} ${this.annotations.length + 1}`;
            const description = document.getElementById('shape-description').value;
            const color = type !== 'marker' && type !== 'interest-point' ? (this.tempSelectedColor || existingData.color || this.currentColor) : null;
            const priority = document.getElementById('shape-priority')?.value || (this.highPriorityMode ? 'high' : 'normal');
            const searchStatus = document.getElementById('shape-search-status')?.value || 'not-searched';
            const assignedTo = document.getElementById('shape-assigned-to')?.value || '';
            const assignedType = document.getElementById('shape-assigned-type')?.value || 'user';
            
            if (isEdit) {
                this.updateShapeData(layer, { name, description, color, priority, searchStatus, assignedTo, assignedType });
            } else if (type === 'marker' || type === 'interest-point') {
                this.createShape(latlng, type, { name, description, priority, searchStatus, assignedTo, assignedType });
            } else {
                // For polygons/circles, update the existing annotation
                const annotation = this.annotations.find(a => a.layer === layer);
                if (annotation) {
                    annotation.name = name;
                    annotation.description = description;
                    annotation.color = color;
                    annotation.priority = priority;
                    annotation.searchStatus = searchStatus;
                    annotation.assignedTo = assignedTo;
                    annotation.assignedType = assignedType;
                    
                    this.updateLayerStyle(layer, annotation);
                    this.updateLayerPopup(layer, annotation);
                    this.saveAnnotation(annotation);
                    this.updateAnnotationsList();
                }
            }
            
            popup.style.display = 'none';
            const currentOverlay = document.getElementById('shape-popup-overlay');
            if (currentOverlay) currentOverlay.classList.remove('show');
            
            // Disable drawing mode and reset tool after saving
            this.map.pm.disableDraw();
            this.setTool('marker');
        });
        
        // Cancel button event handler
        cancelButton.addEventListener('click', () => {
            popup.style.display = 'none';
            const currentOverlay = document.getElementById('shape-popup-overlay');
            if (currentOverlay) currentOverlay.classList.remove('show');
            if (layer && !isEdit) {
                // Remove layer and annotation
                this.map.removeLayer(layer);
                const index = this.annotations.findIndex(a => a.layer === layer);
                if (index !== -1) {
                    this.annotations.splice(index, 1);
                    this.updateAnnotationsList();
                }
            }
            // Disable drawing mode and reset tool
            this.map.pm.disableDraw();
            this.setTool('marker');
        });
    }
    
    // Create shape with data
    createShape(latlng, type, data) {
        let layer;
        
        if (type === 'marker') {
            layer = L.marker(latlng, {
                draggable: true,
                pmIgnore: false
            }).addTo(this.map);
        } else {
            // For polygons/circles, we need to get the layer from the drawing event
            // This will be called after the shape is drawn
            return;
        }
        
        const annotation = {
            id: this.generateId(),
            type: type,
            layer: layer,
            name: data.name,
            description: data.description || '',
            searchStatus: data.searchStatus || 'not-searched',
            assignedTo: data.assignedTo || '',
            assignedType: data.assignedType || 'user',
            latlng: latlng,
            createdAt: new Date().toISOString()
        };
        
        this.updateLayerStyle(layer, annotation);
        this.updateLayerPopup(layer, annotation);
        
        this.annotations.push(annotation);
        this.saveAnnotation(annotation);
        this.updateAnnotationsList();
    }
    
    // Update shape data
    updateShapeData(layer, data) {
        const annotation = this.annotations.find(a => a.layer === layer);
        if (annotation) {
            annotation.name = data.name;
            annotation.description = data.description;
            if (data.color) annotation.color = data.color;
            annotation.priority = data.priority;
            annotation.searchStatus = data.searchStatus;
            annotation.assignedTo = data.assignedTo;
            annotation.assignedType = data.assignedType;
            
            this.updateLayerStyle(layer, annotation);
            this.updateLayerPopup(layer, annotation);
            this.updateAnnotation(annotation);
            this.updateAnnotationsList();
        }
    }
    
    // Update layer style based on search status and priority
    updateLayerStyle(layer, annotation) {
        if (layer instanceof L.Marker) return;
        
        // Use custom color if set, otherwise use default logic
        let color = annotation.color || this.currentColor;
        let weight = 2;
        
        // Priority-based styling (only if no custom color or high priority)
        if (annotation.priority === 'high' && !annotation.color) {
            color = '#f5a5a5';
            weight = 3;
        }
        
        // Search status styling (only if no custom color)
        if (!annotation.color) {
            if (annotation.searchStatus === 'searched') {
                color = '#a8d5ba';
            } else if (annotation.searchStatus === 'not-searched' && annotation.priority !== 'high') {
                color = '#f5a5a5';
            }
            
            // Assignment styling
            if (annotation.assignedTo) {
                color = '#a5c9e8';
            }
        }
        
        // Batch style updates for better performance
        requestAnimationFrame(() => {
            layer.setStyle({
                color: color,
                fillColor: color,
                fillOpacity: annotation.priority === 'high' ? 0.4 : 0.3,
                weight: weight
            });
        });
    }
    
    // Update layer popup
    updateLayerPopup(layer, annotation) {
        let content = `<b>${annotation.name}</b>`;
        if (annotation.description) {
            content += `<br>${annotation.description}`;
        }
        if (annotation.type === 'interest-point') {
            content += `<br>⭐ Punkt von besonderem Interesse`;
            const coords = layer.getLatLng();
            content += `<br>${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
        } else if (annotation.type !== 'marker') {
            if (annotation.area) {
                content += `<br>Fläche: ${annotation.area.toFixed(2)} m²`;
            }
            if (annotation.priority === 'high') {
                content += `<br>🔴 Hohe Priorität (Haustier wurde hier gesehen)`;
            }
            if (annotation.searchStatus) {
                const statusText = annotation.searchStatus === 'searched' ? '✓ Durchsucht' : '✗ Nicht durchsucht';
                content += `<br>Status: ${statusText}`;
            }
            if (annotation.assignedTo) {
                content += `<br>Zugewiesen: ${annotation.assignedTo} (${annotation.assignedType === 'user' ? 'Benutzer' : 'Gruppe'})`;
            }
        } else {
            const coords = layer.getLatLng();
            content += `<br>${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
        }
        layer.bindPopup(content);
    }
    
    // Validate layer coordinates
    validateLayer(layer) {
        if (!layer) return false;
        
        try {
            if (layer instanceof L.Marker) {
                const latlng = layer.getLatLng();
                return latlng && typeof latlng.lat === 'number' && typeof latlng.lng === 'number' &&
                       !isNaN(latlng.lat) && !isNaN(latlng.lng) &&
                       isFinite(latlng.lat) && isFinite(latlng.lng);
            } else if (layer instanceof L.Circle) {
                const latlng = layer.getLatLng();
                const radius = layer.getRadius();
                return latlng && typeof latlng.lat === 'number' && typeof latlng.lng === 'number' &&
                       !isNaN(latlng.lat) && !isNaN(latlng.lng) &&
                       isFinite(latlng.lat) && isFinite(latlng.lng) &&
                       radius && radius > 0;
            } else if (layer instanceof L.Polygon) {
                const latlngs = layer.getLatLngs();
                if (!latlngs || !Array.isArray(latlngs) || latlngs.length === 0) return false;
                
                // Check first ring
                const firstRing = latlngs[0];
                if (!firstRing || !Array.isArray(firstRing) || firstRing.length < 3) return false;
                
                // Validate all coordinates
                return firstRing.every(ll => 
                    ll && typeof ll.lat === 'number' && typeof ll.lng === 'number' &&
                    !isNaN(ll.lat) && !isNaN(ll.lng) &&
                    isFinite(ll.lat) && isFinite(ll.lng)
                );
            } else if (layer instanceof L.Polyline) {
                const latlngs = layer.getLatLngs();
                if (!latlngs || !Array.isArray(latlngs) || latlngs.length < 2) return false;
                
                return latlngs.every(ll => 
                    ll && typeof ll.lat === 'number' && typeof ll.lng === 'number' &&
                    !isNaN(ll.lat) && !isNaN(ll.lng) &&
                    isFinite(ll.lat) && isFinite(ll.lng)
                );
            }
            return true;
        } catch (err) {
            console.error('Error validating layer:', err);
            return false;
        }
    }
    
    // Handle Geoman drawing events
    handleDrawingCreated(e) {
        const layer = e.layer;
        const type = e.shape;
        
        // Validate layer before proceeding
        if (!this.validateLayer(layer)) {
            console.error('Invalid layer created, removing it');
            try {
                if (this.map.hasLayer(layer)) {
                    this.map.removeLayer(layer);
                }
            } catch (err) {
                console.error('Error removing invalid layer:', err);
            }
            this.map.pm.disableDraw();
            this.setTool('marker');
            this.showToast('Ungültige Form erstellt. Bitte versuchen Sie es erneut.');
            return;
        }
        
        // Ensure layer is properly added to map
        if (!this.map.hasLayer(layer)) {
            try {
                layer.addTo(this.map);
            } catch (err) {
                console.error('Error adding layer to map:', err);
                this.map.pm.disableDraw();
                this.setTool('marker');
                return;
            }
        }
        
        // Ensure layer is in the correct pane (overlayPane for geographic layers)
        if (layer instanceof L.Polygon || layer instanceof L.Circle || layer instanceof L.Polyline) {
            // Set pane to overlayPane to ensure geographic coordinates
            if (layer.setPane) {
                try {
                    layer.setPane('overlayPane');
                } catch (err) {
                    console.error('Error setting pane:', err);
                }
            }
            // Ensure layer options have correct pane
            if (!layer.options.pane) {
                layer.options.pane = 'overlayPane';
            }
        }
        
        // IMPORTANT: Don't recreate the layer - it breaks Geoman's event chain
        // Just ensure it's properly configured
        
        // Calculate area
        let area = null;
        if (type === 'Polygon' || type === 'Circle') {
            try {
                area = this.calculateArea(layer);
            } catch (err) {
                console.error('Error calculating area:', err);
            }
        }
        
        // Get center for popup with error handling
        let center;
        try {
            if (layer instanceof L.Circle) {
                center = layer.getLatLng();
                if (!center || isNaN(center.lat) || isNaN(center.lng)) {
                    throw new Error('Invalid circle center');
                }
            } else if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
                const bounds = layer.getBounds();
                if (!bounds || !bounds.isValid()) {
                    // Fallback: calculate center from coordinates
                    const latlngs = layer instanceof L.Polygon ? layer.getLatLngs()[0] : layer.getLatLngs();
                    if (latlngs && latlngs.length > 0) {
                        let sumLat = 0, sumLng = 0;
                        latlngs.forEach(ll => {
                            sumLat += ll.lat;
                            sumLng += ll.lng;
                        });
                        center = L.latLng(sumLat / latlngs.length, sumLng / latlngs.length);
                    } else {
                        throw new Error('Invalid polygon coordinates');
                    }
                } else {
                    center = bounds.getCenter();
                }
            } else {
                center = layer.getLatLng();
            }
        } catch (err) {
            console.error('Error getting center:', err);
            // Use map center as fallback
            center = this.map.getCenter();
        }
        
        // Create temporary annotation
        const tempAnnotation = {
            id: this.generateId(),
            type: type,
            layer: layer,
            name: this.getTypeName(type) + ' ' + (this.annotations.length + 1),
            description: '',
            priority: this.highPriorityMode ? 'high' : 'normal',
            searchStatus: 'not-searched',
            assignedTo: '',
            assignedType: 'user',
            color: this.currentColor,
            area: area,
            createdAt: new Date().toISOString()
        };
        
        // Ensure the annotation references the correct layer
        tempAnnotation.layer = layer;
        
        // Add to annotations first
        this.annotations.push(tempAnnotation);
        
        // Apply initial style with current color
        this.updateLayerStyle(layer, tempAnnotation);
        
        // IMPORTANT: Show popup for shape details
        // Use setTimeout to ensure the drawing is complete and layer is fully initialized
        setTimeout(() => {
            // Double-check that layer still exists and is on map
            if (this.map.hasLayer(layer)) {
                this.showShapePopup(center, type === 'Polygon' ? 'polygon' : 'circle', layer);
            } else {
                console.error('Layer was removed before popup could be shown');
                // Still disable drawing mode
                this.map.pm.disableDraw();
                this.setTool('marker');
            }
        }, 300);
        
        // Listen for changes
        layer.on('pm:edit', () => {
            // Recalculate area after edit
            if (type === 'Polygon' || type === 'Circle') {
                try {
                    const newArea = this.calculateArea(layer);
                    const annotation = this.annotations.find(a => a.layer === layer);
                    if (annotation) {
                        annotation.area = newArea;
                        this.updateLayerPopup(layer, annotation);
                        this.updateAnnotation(annotation);
                    }
                } catch (err) {
                    console.error('Error recalculating area:', err);
                }
            }
        });
        
        // Double-click to edit
        layer.on('dblclick', () => {
            this.showShapePopup(center, type === 'Polygon' ? 'polygon' : 'circle', layer);
        });
    }
    
    handleDrawingRemoved(e) {
        const layer = e.layer;
        const index = this.annotations.findIndex(a => a.layer === layer);
        if (index !== -1) {
            this.deleteAnnotation(this.annotations[index].id);
            this.annotations.splice(index, 1);
            this.updateAnnotationsList();
        }
    }
    
    // Calculate area using Turf.js
    calculateArea(layer) {
        let coordinates;
        
        if (layer instanceof L.Circle) {
            const center = layer.getLatLng();
            const radius = layer.getRadius();
            // Create a polygon approximation of the circle
            const circle = turf.circle([center.lng, center.lat], radius / 1000, { units: 'kilometers' });
            return turf.area(circle);
        } else {
            coordinates = layer.getLatLngs()[0].map(ll => [ll.lng, ll.lat]);
            const polygon = turf.polygon([coordinates]);
            return turf.area(polygon);
        }
    }
    
    // Calculate length using Turf.js
    calculateLength(layer) {
        try {
            if (!layer || !(layer instanceof L.Polyline)) {
                return 0;
            }
            
            const latlngs = layer.getLatLngs();
            if (!latlngs || !Array.isArray(latlngs) || latlngs.length < 2) {
                return 0;
            }
            
            const coordinates = latlngs
                .filter(ll => ll && typeof ll.lat === 'number' && typeof ll.lng === 'number')
                .map(ll => [ll.lng, ll.lat]);
            
            if (coordinates.length < 2) {
                return 0;
            }
            
            const line = turf.lineString(coordinates);
            return turf.length(line, { units: 'meters' });
        } catch (err) {
            console.error('Error calculating length:', err);
            return 0;
        }
    }
    
    getTypeName(type) {
        const names = {
            'Marker': 'Marker',
            'Line': 'Linie',
            'Polygon': 'Bereich',
            'Circle': 'Kreis',
            'interest-point': 'Punkt von besonderem Interesse',
            'marker': 'Marker'
        };
        return names[type] || type;
    }
    
    // GPS Tracking (ADR-0004)
    initGPS() {
        document.getElementById('btn-locate').addEventListener('click', () => this.locateUser());
        document.getElementById('btn-start-tracking').addEventListener('click', () => this.startTracking());
        document.getElementById('btn-stop-tracking').addEventListener('click', () => this.stopTracking());
        document.getElementById('btn-show-trail').addEventListener('click', () => this.showTrail());
        document.getElementById('btn-clear-trail').addEventListener('click', () => this.clearTrail());
    }
    
    locateUser() {
        if (!navigator.geolocation) {
            this.showToast('Geolocation wird von diesem Browser nicht unterstützt');
            return;
        }
        
        this.updateGPSStatus('Suche Position...', null);
        
        // Optimized geolocation options for faster response
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const accuracy = position.coords.accuracy;
                
                this.currentPosition = { lat, lng };
                
                // Use flyTo for smoother, faster transition
                this.map.flyTo([lat, lng], 15, {
                    duration: 0.5,
                    easeLinearity: 0.25
                });
                
                // Add or update user location marker
                if (this.userLocationMarker) {
                    this.userLocationMarker.setLatLng([lat, lng]);
                } else {
                    this.userLocationMarker = L.marker([lat, lng], {
                        icon: L.divIcon({
                            className: 'user-location-marker',
                            html: '<div style="background: #a8d5ba; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
                            iconSize: [20, 20]
                        })
                    }).addTo(this.map);
                    
                    // Add accuracy circle
                    this.accuracyCircle = L.circle([lat, lng], {
                        radius: accuracy,
                        color: '#a8d5ba',
                        fillColor: '#a8d5ba',
                        fillOpacity: 0.2
                    }).addTo(this.map);
                }
                
                // Batch update for better performance
                if (this.accuracyCircle) {
                    this.accuracyCircle.setLatLng([lat, lng]).setRadius(accuracy);
                }
                
                this.updateGPSStatus('Position gefunden', accuracy);
                this.showToast(`Position gefunden (Genauigkeit: ${Math.round(accuracy)}m)`);
            },
            (error) => {
                let message = 'Fehler beim Abrufen der Position: ';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        message += 'Berechtigung verweigert';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message += 'Position nicht verfügbar';
                        break;
                    case error.TIMEOUT:
                        message += 'Zeitüberschreitung';
                        break;
                    default:
                        message += 'Unbekannter Fehler';
                        break;
                }
                this.updateGPSStatus('Fehler', null);
                this.showToast(message);
            },
            {
                enableHighAccuracy: false, // Faster response, less accurate
                timeout: 5000, // Reduced timeout for faster failure
                maximumAge: 30000 // Accept cached position up to 30 seconds old
            }
        );
    }
    
    startTracking() {
        if (!navigator.geolocation) {
            this.showToast('Geolocation wird von diesem Browser nicht unterstützt');
            return;
        }
        
        this.trackingActive = true;
        document.getElementById('btn-start-tracking').style.display = 'none';
        document.getElementById('btn-stop-tracking').style.display = 'block';
        document.getElementById('toolbar-tracking').textContent = '⏸️';
        
        // Create tracking polyline if it doesn't exist
        if (!this.trackingPolyline) {
            this.trackingPolyline = L.polyline([], {
                color: '#ff6b6b',
                weight: 4,
                opacity: 0.8
            }).addTo(this.map);
        }
        
        // Track position every 5 seconds - optimized for performance
        this.trackingInterval = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const accuracy = position.coords.accuracy;
                    
                    this.currentPosition = { lat, lng };
                    
                    // Batch updates for better performance
                    requestAnimationFrame(() => {
                        // Update user location marker
                        if (this.userLocationMarker) {
                            this.userLocationMarker.setLatLng([lat, lng]);
                        } else {
                            this.locateUser();
                        }
                        
                        // Add point to tracking line (limit points for performance)
                        const latlngs = this.trackingPolyline.getLatLngs();
                        latlngs.push([lat, lng]);
                        // Keep only last 1000 points to maintain performance
                        if (latlngs.length > 1000) {
                            latlngs.shift();
                        }
                        this.trackingPolyline.setLatLngs(latlngs);
                        
                        // Save tracking point
                        const point = { lat, lng, accuracy, timestamp: new Date().toISOString() };
                        this.trackingPoints.push(point);
                        // Limit in-memory points
                        if (this.trackingPoints.length > 1000) {
                            this.trackingPoints.shift();
                        }
                        this.saveTrackingPoint(point);
                        
                        // Update trail points count (debounced)
                        if (!this.trailUpdateTimeout) {
                            this.trailUpdateTimeout = setTimeout(() => {
                                document.getElementById('trail-points').textContent = this.trackingPoints.length;
                                this.trailUpdateTimeout = null;
                            }, 1000);
                        }
                        
                        this.updateGPSStatus('Tracking aktiv', accuracy);
                    });
                },
                (error) => {
                    console.error('Tracking error:', error);
                },
                {
                    enableHighAccuracy: false, // Faster, less battery intensive
                    timeout: 3000, // Faster timeout
                    maximumAge: 10000 // Accept cached position
                }
            );
        }, 5000);
        
        this.showToast('GPS-Tracking gestartet');
    }
    
    stopTracking() {
        this.trackingActive = false;
        document.getElementById('btn-start-tracking').style.display = 'block';
        document.getElementById('btn-stop-tracking').style.display = 'none';
        document.getElementById('toolbar-tracking').textContent = '▶️';
        
        if (this.trackingInterval) {
            clearInterval(this.trackingInterval);
            this.trackingInterval = null;
        }
        
        this.updateGPSStatus('Tracking gestoppt', null);
        this.showToast('GPS-Tracking gestoppt');
    }
    
    updateGPSStatus(status, accuracy) {
        document.getElementById('gps-status-text').textContent = status;
        document.getElementById('gps-accuracy').textContent = accuracy ? `${Math.round(accuracy)} m` : '-';
    }
    
    // Show tracking trail
    showTrail() {
        if (this.trackingPoints.length === 0) {
            this.showToast('Keine Tracking-Daten vorhanden');
            return;
        }
        
        if (this.trackingTrailVisible) {
            // Hide trail
            if (this.trackingTrailPolyline) {
                this.map.removeLayer(this.trackingTrailPolyline);
            }
            this.trackingTrailVisible = false;
            document.getElementById('btn-show-trail').textContent = '🗺️ Spur anzeigen';
            document.getElementById('btn-clear-trail').style.display = 'none';
        } else {
            // Show trail
            const latlngs = this.trackingPoints.map(p => [p.lat, p.lng]);
            this.trackingTrailPolyline = L.polyline(latlngs, {
                color: '#FF6B6B',
                weight: 4,
                opacity: 0.8,
                smoothFactor: 1
            }).addTo(this.map);
            
            // Fit map to trail
            if (latlngs.length > 0) {
                this.map.fitBounds(this.trackingTrailPolyline.getBounds(), { padding: [50, 50] });
            }
            
            this.trackingTrailVisible = true;
            document.getElementById('btn-show-trail').textContent = '👁️ Spur verbergen';
            document.getElementById('btn-clear-trail').style.display = 'block';
            this.showToast('Tracking-Spur angezeigt');
        }
    }
    
    // Clear tracking trail
    clearTrail() {
        if (confirm('Möchten Sie wirklich alle Tracking-Daten löschen?')) {
            this.trackingPoints = [];
            if (this.trackingTrailPolyline) {
                this.map.removeLayer(this.trackingTrailPolyline);
            }
            if (this.trackingPolyline) {
                this.map.removeLayer(this.trackingPolyline);
                this.trackingPolyline = null;
            }
            this.clearAllTrackingPoints();
            document.getElementById('trail-points').textContent = '0';
            document.getElementById('btn-show-trail').textContent = '🗺️ Spur anzeigen';
            document.getElementById('btn-clear-trail').style.display = 'none';
            this.trackingTrailVisible = false;
            this.showToast('Tracking-Daten gelöscht');
        }
    }
    
    // Search functionality
    initSearch() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('btn-search');
        
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (!query) return;
            
            this.searchPlace(query);
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Close popup when clicking on map
        this.map.on('click', () => {
            const popup = document.getElementById('shape-popup');
            if (popup && popup.style.display !== 'none') {
                // Don't close if clicking inside popup
                if (!event.target.closest('.create-shape-flow')) {
                    popup.style.display = 'none';
                }
            }
        });
    }
    
    async searchPlace(query) {
        try {
            // Use Nominatim (OpenStreetMap) for geocoding
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
                {
                    headers: {
                        'User-Agent': 'FindMyPet/1.0'
                    }
                }
            );
            
            const results = await response.json();
            
            if (results.length === 0) {
                this.showToast('Keine Ergebnisse gefunden');
                return;
            }
            
            // Use first result
            const result = results[0];
            const lat = parseFloat(result.lat);
            const lng = parseFloat(result.lon);
            
            // Center map on result
            this.map.setView([lat, lng], 15);
            
            // Add marker
            if (this.searchMarker) {
                this.searchMarker.setLatLng([lat, lng]);
            } else {
                this.searchMarker = L.marker([lat, lng], {
                    icon: L.divIcon({
                        className: 'search-marker',
                        html: '<div style="background: #667eea; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
                        iconSize: [24, 24]
                    })
                }).addTo(this.map);
            }
            
            this.searchMarker.bindPopup(`<b>${result.display_name}</b>`).openPopup();
            
            this.showToast(`Gefunden: ${result.display_name}`);
        } catch (error) {
            console.error('Search error:', error);
            this.showToast('Fehler bei der Suche');
        }
    }
    
    // UI Management
    initUI() {
        const toggleSidebar = document.getElementById('toggleSidebar');
        const closeSidebar = document.getElementById('closeSidebar');
        const sidebar = document.querySelector('.sidebar');
        const mapContainer = document.getElementById('map-container');
        
        toggleSidebar.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('open');
            } else {
                sidebar.classList.toggle('hidden');
                mapContainer.classList.toggle('sidebar-closed');
            }
        });
        
        closeSidebar.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            } else {
                sidebar.classList.add('hidden');
                mapContainer.classList.add('sidebar-closed');
            }
        });
        
        // Show sidebar by default on desktop, hide on mobile
        if (window.innerWidth > 768) {
            sidebar.classList.remove('hidden');
            mapContainer.classList.remove('sidebar-closed');
        } else {
            sidebar.classList.remove('open');
        }
        
        // Navbar buttons
        document.getElementById('btn-export')?.addEventListener('click', () => {
            this.exportData();
        });
        
        document.getElementById('btn-share')?.addEventListener('click', () => {
            this.shareMap();
        });
        
        document.getElementById('btn-new-search')?.addEventListener('click', () => {
            if (confirm('Möchten Sie eine neue Suchaktion starten? Alle aktuellen Daten werden gelöscht.')) {
                this.clearAll();
                document.getElementById('map-name').value = 'Neue Suchaktion';
                document.getElementById('map-description').value = '';
            }
        });
        
        // Handle window resize - Responsive behavior
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const isMobile = window.innerWidth <= 768;
                const isTablet = window.innerWidth <= 1024;
                
                if (isMobile) {
                    // Mobile: Sidebar should be hidden by default, toggle with 'open' class
                    sidebar.classList.remove('hidden');
                    if (!sidebar.classList.contains('open')) {
                        mapContainer.classList.remove('sidebar-closed');
                    }
                } else if (isTablet) {
                    // Tablet: Sidebar can be toggled with 'hidden' class
                    sidebar.classList.remove('open');
                    if (!sidebar.classList.contains('hidden')) {
                        mapContainer.classList.remove('sidebar-closed');
                    } else {
                        mapContainer.classList.add('sidebar-closed');
                    }
                } else {
                    // Desktop: Normal behavior
                    sidebar.classList.remove('open');
                    if (!sidebar.classList.contains('hidden')) {
                        mapContainer.classList.remove('sidebar-closed');
                    } else {
                        mapContainer.classList.add('sidebar-closed');
                    }
                }
            }, 100);
        });
        
        // Initial responsive setup
        const initialWidth = window.innerWidth;
        if (initialWidth <= 768) {
            sidebar.classList.remove('open');
            mapContainer.classList.remove('sidebar-closed');
        }
    }
    
    exportData() {
        const data = {
            name: document.getElementById('map-name').value,
            description: document.getElementById('map-description').value,
            annotations: this.annotations.map(ann => ({
                id: ann.id,
                type: ann.type,
                name: ann.name,
                description: ann.description,
                color: ann.color,
                priority: ann.priority,
                searchStatus: ann.searchStatus,
                assignedTo: ann.assignedTo,
                assignedType: ann.assignedType,
                geoJson: this.layerToGeoJSON(ann.layer)
            })),
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `findmypet-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('Daten exportiert');
    }
    
    shareMap() {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: document.getElementById('map-name').value || 'FindMyPet Karte',
                text: document.getElementById('map-description').value || 'Teile diese Suchaktion',
                url: url
            }).catch(() => {
                this.copyToClipboard(url);
            });
        } else {
            this.copyToClipboard(url);
        }
    }
    
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Link in Zwischenablage kopiert');
        }).catch(() => {
            this.showToast('Link konnte nicht kopiert werden');
        });
    }
    
    updateAnnotationsList() {
        const list = document.getElementById('annotations-list');
        
        if (this.annotations.length === 0) {
            list.innerHTML = '<p class="empty-state">Noch keine Anmerkungen</p>';
            return;
        }
        
        list.innerHTML = this.annotations.map(ann => {
            const typeIcon = ann.type === 'marker' ? '<i class="gg-pin"></i>' : 
                          ann.type === 'Polygon' ? '<i class="gg-shape-polygon"></i>' : 
                          ann.type === 'Circle' ? '<i class="gg-shape-circle"></i>' : '';
            const typeName = this.getTypeName(ann.type);
            const priorityBadge = ann.type !== 'marker' && ann.type !== 'interest-point' && ann.priority === 'high' ? 
                `<span class="annotation-data-field" style="background: rgba(245, 165, 165, 0.2); color: #f5a5a5;"><i class="gg-danger"></i> Hohe Priorität</span>` : '';
            const searchStatusBadge = ann.type !== 'marker' && ann.type !== 'interest-point' && ann.searchStatus ? 
                `<span class="status-badge ${ann.searchStatus === 'searched' ? 'searched' : 'not-searched'}">${ann.searchStatus === 'searched' ? 'Durchsucht' : 'Nicht durchsucht'}</span>` : '';
            const assignmentBadge = ann.assignedTo ? 
                `<span class="assignment-badge"><i class="gg-user"></i> ${ann.assignedTo}</span>` : '';
            const interestIcon = ann.type === 'interest-point' ? '<i class="gg-star"></i>' : '';
            
            return `
                <div class="annotation-item" data-id="${ann.id}" onclick="app.toggleAnnotationDetails('${ann.id}')">
                    <div class="annotation-info">
                        <div class="annotation-name">
                            ${interestIcon || typeIcon} <span>${ann.name}</span>
                        </div>
                        <div class="annotation-type">${typeName}</div>
                    </div>
                    <div class="annotation-actions">
                        <button class="annotation-btn" onclick="event.stopPropagation(); app.focusAnnotation('${ann.id}')" title="Fokussieren">
                            <i class="gg-search"></i>
                        </button>
                        <button class="annotation-btn" onclick="event.stopPropagation(); app.editAnnotation('${ann.id}')" title="Bearbeiten">
                            <i class="gg-pen"></i>
                        </button>
                        ${ann.type !== 'marker' && ann.type !== 'interest-point' ? `
                            <button class="annotation-btn" onclick="event.stopPropagation(); app.toggleSearchedStatus('${ann.id}')" title="Als durchsucht markieren">
                                <i class="gg-${ann.searchStatus === 'searched' ? 'check' : 'close'}"></i>
                            </button>
                        ` : ''}
                        <button class="annotation-btn" onclick="event.stopPropagation(); app.deleteAnnotation('${ann.id}')" title="Löschen">
                            <i class="gg-trash"></i>
                        </button>
                    </div>
                    <div class="annotation-details">
                        ${ann.description ? `<div class="annotation-description">${ann.description}</div>` : ''}
                        <div class="annotation-data">
                            ${ann.area ? `<div class="annotation-data-field"><i class="gg-ruler"></i> ${ann.area.toFixed(2)} m²</div>` : ''}
                            ${priorityBadge}
                            ${searchStatusBadge}
                            ${assignmentBadge}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    toggleAnnotationDetails(id) {
        const item = document.querySelector(`[data-id="${id}"]`);
        if (item) {
            item.classList.toggle('expanded');
        }
    }
    
    editAnnotation(id) {
        const annotation = this.annotations.find(a => a.id === id);
        if (annotation && annotation.layer) {
            // Validate layer before editing
            if (!this.validateLayer(annotation.layer)) {
                this.showToast('Ungültige Annotation. Bitte löschen und neu erstellen.');
                return;
            }
            
            let center;
            try {
                if (annotation.layer instanceof L.Marker) {
                    center = annotation.layer.getLatLng();
                } else if (annotation.layer instanceof L.Circle) {
                    center = annotation.layer.getLatLng();
                } else {
                    const bounds = annotation.layer.getBounds();
                    if (bounds && bounds.isValid()) {
                        center = bounds.getCenter();
                    } else {
                        // Fallback to map center
                        center = this.map.getCenter();
                    }
                }
            } catch (err) {
                console.error('Error getting center for edit:', err);
                center = this.map.getCenter();
            }
            
            const type = annotation.type === 'marker' ? 'marker' : annotation.type === 'interest-point' ? 'interest-point' : 'polygon';
            this.showShapePopup(center, type, annotation.layer);
        }
    }
    
    toggleSearchedStatus(id) {
        const annotation = this.annotations.find(a => a.id === id);
        if (annotation && annotation.type !== 'marker' && annotation.type !== 'interest-point') {
            annotation.searchStatus = annotation.searchStatus === 'searched' ? 'not-searched' : 'searched';
            this.updateLayerStyle(annotation.layer, annotation);
            this.updateLayerPopup(annotation.layer, annotation);
            this.updateAnnotation(annotation);
            this.updateAnnotationsList();
            this.showToast(annotation.searchStatus === 'searched' ? 'Bereich als durchsucht markiert' : 'Bereich als nicht durchsucht markiert');
        }
    }
    
    focusAnnotation(id) {
        const annotation = this.annotations.find(a => a.id === id);
        if (annotation && annotation.layer) {
            if (annotation.layer instanceof L.Marker) {
                this.map.setView(annotation.latlng, 15);
            } else {
                this.map.fitBounds(annotation.layer.getBounds());
            }
        }
    }
    
    clearAll() {
        if (confirm('Möchten Sie wirklich alle Anmerkungen löschen?')) {
            this.annotations.forEach(ann => {
                this.map.removeLayer(ann.layer);
            });
            this.annotations = [];
            this.clearAllAnnotations();
            this.updateAnnotationsList();
            this.showToast('Alle Anmerkungen gelöscht');
        }
    }
    
    
    // IndexedDB for offline storage (ADR-0004)
    async initIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('FindMyPetDB', 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Annotations store
                if (!db.objectStoreNames.contains('annotations')) {
                    const annotationStore = db.createObjectStore('annotations', { keyPath: 'id' });
                    annotationStore.createIndex('createdAt', 'createdAt', { unique: false });
                }
                
                // Tracking points store
                if (!db.objectStoreNames.contains('trackingPoints')) {
                    const trackingStore = db.createObjectStore('trackingPoints', { keyPath: 'id', autoIncrement: true });
                    trackingStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        });
    }
    
    async saveAnnotation(annotation) {
        if (!this.db) return;
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['annotations'], 'readwrite');
            const store = transaction.objectStore('annotations');
            
            // Convert layer to GeoJSON for storage
            const geoJson = this.layerToGeoJSON(annotation.layer);
            const data = {
                id: annotation.id,
                type: annotation.type,
                name: annotation.name,
                description: annotation.description || '',
                color: annotation.color || this.currentColor,
                priority: annotation.priority || 'normal',
                searchStatus: annotation.searchStatus || 'not-searched',
                assignedTo: annotation.assignedTo || '',
                assignedType: annotation.assignedType || 'user',
                geoJson: geoJson,
                area: annotation.area,
                length: annotation.length,
                createdAt: annotation.createdAt
            };
            
            const request = store.put(data);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
            transaction.onerror = () => reject(transaction.error);
        });
    }
    
    async loadAnnotations() {
        if (!this.db) {
            await this.initIndexedDB();
        }
        
        const transaction = this.db.transaction(['annotations'], 'readonly');
        const store = transaction.objectStore('annotations');
        const request = store.getAll();
        
        request.onsuccess = () => {
            const savedAnnotations = request.result;
            savedAnnotations.forEach(data => {
                const layer = this.geoJSONToLayer(data.geoJson, data.type);
                if (layer) {
                    layer.addTo(this.map);
                    
                    const annotation = {
                        id: data.id,
                        type: data.type,
                        layer: layer,
                        name: data.name,
                        description: data.description || '',
                        priority: data.priority || 'normal',
                        searchStatus: data.searchStatus || 'not-searched',
                        assignedTo: data.assignedTo || '',
                        assignedType: data.assignedType || 'user',
                        area: data.area,
                        length: data.length,
                        createdAt: data.createdAt
                    };
                    
                    // Handle interest points
                    if (data.type === 'interest-point') {
                        layer.setIcon(L.divIcon({
                            className: 'interest-point-marker',
                            html: '<div style="background: #FFD700; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 18px;">⭐</div>',
                            iconSize: [32, 32]
                        }));
                    }
                    
                    this.annotations.push(annotation);
                    
                    // Update style and popup
                    this.updateLayerStyle(layer, annotation);
                    this.updateLayerPopup(layer, annotation);
                    
                    // Add edit listener
                    layer.on('dblclick', () => {
                        let center;
                        if (layer instanceof L.Marker) {
                            center = layer.getLatLng();
                        } else if (layer instanceof L.Circle) {
                            center = layer.getLatLng();
                        } else {
                            const bounds = layer.getBounds();
                            center = bounds.getCenter();
                        }
                        this.showShapePopup(center, data.type === 'marker' ? 'marker' : 'polygon', layer);
                    });
                }
            });
            this.updateAnnotationsList();
        };
    }
    
    async deleteAnnotation(id) {
        const annotation = this.annotations.find(a => a.id === id);
        if (annotation) {
            this.map.removeLayer(annotation.layer);
            this.annotations = this.annotations.filter(a => a.id !== id);
            
            // Delete from IndexedDB
            if (this.db) {
                try {
                    await new Promise((resolve, reject) => {
                        const transaction = this.db.transaction(['annotations'], 'readwrite');
                        const store = transaction.objectStore('annotations');
                        const request = store.delete(id);
                        request.onsuccess = () => resolve(request.result);
                        request.onerror = () => reject(request.error);
                        transaction.onerror = () => reject(transaction.error);
                    });
                } catch (error) {
                    console.error('Error deleting annotation from IndexedDB:', error);
                }
            }
            
            this.updateAnnotationsList();
            this.showToast('Anmerkung gelöscht');
        }
    }
    
    async updateAnnotation(annotation) {
        await this.saveAnnotation(annotation);
    }
    
    async clearAllAnnotations() {
        if (!this.db) return;
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['annotations'], 'readwrite');
            const store = transaction.objectStore('annotations');
            const request = store.clear();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
            transaction.onerror = () => reject(transaction.error);
        });
    }
    
    async saveTrackingPoint(point) {
        if (!this.db) return;
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['trackingPoints'], 'readwrite');
            const store = transaction.objectStore('trackingPoints');
            const request = store.add(point);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
            transaction.onerror = () => reject(transaction.error);
        });
    }
    
    async clearAllTrackingPoints() {
        if (!this.db) return;
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['trackingPoints'], 'readwrite');
            const store = transaction.objectStore('trackingPoints');
            const request = store.clear();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
            transaction.onerror = () => reject(transaction.error);
        });
    }
    
    async loadTrackingPoints() {
        if (!this.db) {
            await this.initIndexedDB();
        }
        
        const transaction = this.db.transaction(['trackingPoints'], 'readonly');
        const store = transaction.objectStore('trackingPoints');
        const request = store.getAll();
        
        request.onsuccess = () => {
            this.trackingPoints = request.result || [];
            document.getElementById('trail-points').textContent = this.trackingPoints.length;
        };
    }
    
    // Convert Leaflet layer to GeoJSON
    layerToGeoJSON(layer) {
        if (layer instanceof L.Marker) {
            return {
                type: 'Point',
                coordinates: [layer.getLatLng().lng, layer.getLatLng().lat]
            };
        } else if (layer instanceof L.Polyline) {
            return {
                type: 'LineString',
                coordinates: layer.getLatLngs().map(ll => [ll.lng, ll.lat])
            };
        } else if (layer instanceof L.Polygon) {
            return {
                type: 'Polygon',
                coordinates: [layer.getLatLngs()[0].map(ll => [ll.lng, ll.lat])]
            };
        } else if (layer instanceof L.Circle) {
            const center = layer.getLatLng();
            const radius = layer.getRadius();
            return {
                type: 'Circle',
                center: [center.lng, center.lat],
                radius: radius
            };
        }
        return null;
    }
    
    // Convert GeoJSON to Leaflet layer
    geoJSONToLayer(geoJson, type) {
        if (geoJson.type === 'Point') {
            return L.marker([geoJson.coordinates[1], geoJson.coordinates[0]], {
                draggable: true,
                pmIgnore: false
            });
        } else if (geoJson.type === 'LineString') {
            const latlngs = geoJson.coordinates.map(coord => [coord[1], coord[0]]);
            return L.polyline(latlngs, { pmIgnore: false });
        } else if (geoJson.type === 'Polygon') {
            const latlngs = geoJson.coordinates[0].map(coord => [coord[1], coord[0]]);
            return L.polygon(latlngs, { pmIgnore: false });
        } else if (geoJson.type === 'Circle') {
            return L.circle([geoJson.center[1], geoJson.center[0]], {
                radius: geoJson.radius,
                pmIgnore: false
            });
        }
        return null;
    }
    
    // Offline detection (ADR-0004)
    setupOfflineDetection() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.updateOfflineStatus();
            this.showToast('Verbindung wiederhergestellt');
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.updateOfflineStatus();
            this.showToast('Offline-Modus aktiv');
        });
        
        this.updateOfflineStatus();
    }
    
    updateOfflineStatus() {
        const statusEl = document.getElementById('offline-status');
        const textEl = document.getElementById('offline-text');
        const indicator = statusEl.querySelector('.status-indicator');
        
        if (this.isOnline) {
            indicator.className = 'status-indicator online';
            textEl.textContent = 'Online';
        } else {
            indicator.className = 'status-indicator offline';
            textEl.textContent = 'Offline';
        }
    }
    
    // Utility functions
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MapApp();
});
