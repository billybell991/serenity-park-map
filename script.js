// 1. Set up a simple coordinate system (non-geographical, just for images)
const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -4, // Lowered to allow zooming out further
    maxZoom: 3,
    zoomSnap: 0.25, // Enables smooth fractional zooming
    zoomDelta: 0.5
});

// 2. Define the dimensions of your original image (Width x Height)
const imageWidth = 2400;
const imageHeight = 1790;

// Tell Leaflet the boundaries of our image
const bounds = [[0, 0], [imageHeight, imageWidth]];

// 3. Add the image to the map as an overlay
const imageOverlay = L.imageOverlay('park_map_naked.png', bounds).addTo(map);

// 4. Center the map on the image, zoomed out enough to see the whole thing
map.fitBounds(bounds);
map.zoomOut(0.5); // Add a little padding so it isn't squeezed to the edge

// ==========================================
// ADDING LABELS & POIS TO THE NAKED MAP
// ==========================================

// --- SITE B1 ---
const b1AreaCoords = [
    [871, 751],
    [798, 819],
    [782, 806],
    [772, 796],
    [758, 782],
    [836, 714]
];
L.polygon(b1AreaCoords, {
    className: 'organic-polygon', // Applies our new blur filter and dynamic line scaling
    fillColor: '#b5c898',  
    fillOpacity: 1         
}).addTo(map)
  .bindPopup("<b>Site B1</b>");

// Add the label "B1" to the center of the site
const b1Center = [815, 765]; 
const b1Label = L.divIcon({
    className: 'naked-site-label',
    html: '<div class="scalable-label">B1</div>',
    iconSize: [60, 60],
    iconAnchor: [30, 30] // Anchor exactly in the center
});
L.marker(b1Center, { icon: b1Label, interactive: false }).addTo(map);

// Example of a solitary line drawn on the map (like the edge of B1)
const b1EdgeLine = [
    [758, 782],
    [765, 789],
    [772, 796],
    [782, 806],
    [790.1, 812.6], // Adjusted by user manual edit
    [798, 819]
];
L.polyline(b1EdgeLine, {
    className: 'organic-line', // Dynamic line scaling and blur
    lineCap: 'round',          // Rounded caps so it looks hand-drawn
    lineJoin: 'round'
}).addTo(map);

// ----------------------------------------------------
// SCALING ENGINE (Makes text shrink/grow with the map)
// ----------------------------------------------------
function updateLabelScale() {
    // Leaflet's CRS.Simple scale doubles for every +1 zoom. 
    // If zoom is 0 (1:1), scale is 1. If we zoom out negative, scale becomes a fraction.
    const currentScale = Math.pow(2, map.getZoom()); 
    document.documentElement.style.setProperty('--map-zoom-scale', currentScale);
}
// Run on load and on every zoom change
updateLabelScale();
map.on('zoom', updateLabelScale);

// Example A: A clean, custom text label for a camp site (e.g., Site 1)
const site1Label = L.divIcon({
    className: 'site-label premium-site',
    html: '1'
});
L.marker([imageHeight * 0.5, imageWidth * 0.3], { icon: site1Label }).addTo(map)
    .bindPopup("<b>Premium Site 1</b><br>Full hookups.");

// Example B: A clickable popup on Mink Lake!
const lakeMarker = L.marker([imageHeight * 0.8, imageWidth * 0.5]).addTo(map);
lakeMarker.bindPopup("<b>Mink Lake</b><br>Enjoy the water.");

// Example C: A clickable marker with a popup at the Office/Clubhouse
const officeMarker = L.marker([imageHeight * 0.1, imageWidth * 0.8]).addTo(map);
officeMarker.bindPopup("<b>Office & Clubhouse</b><br>Check in here!");

// Removed B1 highlight per user request

// ----------------------------------------------------
// EDITOR MODE: Click map to get coordinates in console
// ----------------------------------------------------
const drawnItems = []; // Array to track drawn things for Undo button

// Handle clicking the Undo button
document.getElementById('undo-btn').addEventListener('click', function() {
    if (drawnItems.length > 0) {
        const lastItem = drawnItems.pop();
        map.removeLayer(lastItem);
        console.log("Undid last action.");
    }
});

// ----------------------------------------------------
// FREEHAND DRAWING TOOL (Click and Drag)
// ----------------------------------------------------
let isDrawingFreehand = false;
let currentFreehandLine = null;
const freehandBtn = document.getElementById('freehand-btn');

freehandBtn.addEventListener('click', function() {
    isDrawingFreehand = !isDrawingFreehand;
    if (isDrawingFreehand) {
        freehandBtn.style.background = "#2ecc71";
        freehandBtn.style.color = "white";
        freehandBtn.innerText = "🛑 Stop Freehand";
        map.dragging.disable(); // Prevent map panning while drawing
    } else {
        freehandBtn.style.background = "#fff";
        freehandBtn.style.color = "black";
        freehandBtn.innerText = "✏️ Freehand Draw";
        map.dragging.enable();
    }
});

map.on('mousedown', function(e) {
    if (!isDrawingFreehand) return;
    currentFreehandLine = L.polyline([e.latlng], {
        color: '#00ff00', 
        weight: 4,
        lineCap: 'round',
        lineJoin: 'round'
    }).addTo(map);
});

map.on('mousemove', function(e) {
    if (!isDrawingFreehand || !currentFreehandLine) return;
    currentFreehandLine.addLatLng(e.latlng);
});

map.on('mouseup', function() {
    if (!isDrawingFreehand || !currentFreehandLine) return;
    
    // Save to undo tracker
    drawnItems.push(currentFreehandLine);

    // Get coordinates list
    const coords = currentFreehandLine.getLatLngs().map(pos => [Math.round(pos.lat), Math.round(pos.lng)]);
    
    // Bind popup
    currentFreehandLine.bindPopup(`<div style="max-height:150px;overflow:auto;"><b>Freehand Coords:</b><br><pre>${JSON.stringify(coords)}</pre></div>`).openPopup();
    
    currentFreehandLine = null; // Reset for next line
});


map.on('click', function(e) {
    // If we're actively drawing a shape/line with Geoman, don't drop a regular click marker
    if (map.pm.Draw.getActiveShape()) return; 
    // Don't drop a pin if we are using the freehand tool
    if (isDrawingFreehand) return;

    const y = Math.round(e.latlng.lat);
    const x = Math.round(e.latlng.lng);
    console.log(`Clicked Coordinates: [${y}, ${x}]`);

    // Drop a permanent tiny dot marker on click so you can see exactly where you clicked
    const pointerMarker = L.circleMarker(e.latlng, {
        radius: 4,
        color: '#ff0000',
        fillColor: '#ff0000',
        fillOpacity: 1,
        weight: 1
    }).addTo(map);
    pointerMarker.bindPopup(`<b>Dot Coords:</b><br><pre>[${y}, ${x}]</pre>`).openPopup();
    
    // Add it to our array so we can undo it later!
    drawnItems.push(pointerMarker);
});

// ----------------------------------------------------
// ADMIN DRAWING TOOLS (Geoman)
// ----------------------------------------------------
// Add the drawing toolbar to the map
map.pm.addControls({
    position: 'topleft',
    drawCircleMarker: false,
    drawText: false,
    drawCircle: false,
    // Leaves Polygon (shapes), Rectangle, Line, and Marker tools
});

// Make the drawn shapes bright green so they stand out
map.pm.setPathOptions({
    color: '#00ff00',
    fillColor: '#00ff00',
    fillOpacity: 0.3,
    weight: 3
});

// Make the drawing vertex dots much smaller for precision
map.pm.setGlobalOptions({
    templineStyle: { color: '#00ff00', weight: 2 },
    hintlineStyle: { color: '#00ff00', weight: 2, dashArray: '5,5' },
    pathOptions: {
        color: '#00ff00',
        fillColor: '#00ff00',
        fillOpacity: 0.3,
        weight: 3
    }
});

// When you finish drawing a shape, attach a popup that shows its coordinates!
map.on('pm:create', function(e) {
    const layer = e.layer;
    let coordsText = "";
    
    // Add to our undo tracker
    drawnItems.push(layer);
    
    if (e.shape === 'Line' || e.shape === 'Polygon' || e.shape === 'Rectangle') {
        const coords = layer.getLatLngs();
        coordsText = JSON.stringify(coords, null, 2);
    } else if (e.shape === 'Marker') {
        coordsText = `[${Math.round(layer.getLatLng().lat)}, ${Math.round(layer.getLatLng().lng)}]`;
    }

    layer.bindPopup(`<div style="max-height:150px;overflow:auto;"><b>Shape Coords:</b><br><pre>${coordsText}</pre></div>`).openPopup();
});