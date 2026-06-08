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
// We use localStorage to remember the zoom and center so it doesn't reset on refresh
map.fitBounds(bounds);
map.zoomOut(0.5);

const savedZoom = localStorage.getItem('mapZoom');
const savedLat = localStorage.getItem('mapLat');
const savedLng = localStorage.getItem('mapLng');

if (savedZoom && savedLat && savedLng) {
    map.setView([parseFloat(savedLat), parseFloat(savedLng)], parseFloat(savedZoom));
}

// Save position whenever user halts moving or zooming
map.on('moveend', function() {
    const center = map.getCenter();
    localStorage.setItem('mapZoom', map.getZoom());
    localStorage.setItem('mapLat', center.lat);
    localStorage.setItem('mapLng', center.lng);
});

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

// --- SITE B2 ---
const b2AreaCoords = [
    [836, 714],
    [758, 782],
    [724, 746],
    [803, 675]
];
L.polygon(b2AreaCoords, {
    className: 'organic-polygon', 
    fillColor: '#b5c898',  
    fillOpacity: 1         
}).addTo(map)
  .bindPopup("<b>Site B2</b>");

const b2Center = [780, 729]; 
const b2Label = L.divIcon({
    className: 'naked-site-label',
    html: '<div class="scalable-label">B2</div>',
    iconSize: [60, 60],
    iconAnchor: [30, 30]
});
L.marker(b2Center, { icon: b2Label, interactive: false }).addTo(map);

// --- SITE B3 ---
const b3AreaCoords = [
    [803, 675],
    [724, 746],
    [687.4, 706.8],
    [768.6, 636.6]
];
L.polygon(b3AreaCoords, {
    className: 'organic-polygon', 
    fillColor: '#b5c898',  
    fillOpacity: 1         
}).addTo(map)
  .bindPopup("<b>Site B3</b>");

const b3Center = [746, 691]; 
const b3Label = L.divIcon({
    className: 'naked-site-label',
    html: '<div class="scalable-label">B3</div>',
    iconSize: [60, 60],
    iconAnchor: [30, 30]
});
L.marker(b3Center, { icon: b3Label, interactive: false }).addTo(map);

// --- SITE B17 ---
const b17AreaCoords = [
    [412.2, 420.4],
    [380.8, 374.0],
    [295.2, 448.3],
    [322.3, 495.6]
];
L.polygon(b17AreaCoords, {
    className: 'organic-polygon',
    fillColor: '#b5c898',
    fillOpacity: 1
}).addTo(map)
  .bindPopup("<b>Site B17</b>");

// Add the label "B17" to the center of the site
const b17Center = [353, 435];
const b17Label = L.divIcon({
    className: 'naked-site-label',
    html: '<div class="scalable-label">B17</div>',
    iconSize: [60, 60],
    iconAnchor: [30, 30] // Anchor exactly in the center
});
L.marker(b17Center, { icon: b17Label, interactive: false }).addTo(map);

// --- SITE S29 ---
const s29AreaCoords = [
    [870, 925], [869, 931], [866, 937], [858, 945], [832, 974],
    [812, 998], [797, 1007], [774, 1013], [754, 1016], [750, 1017],
    [747, 1014], [744, 1008], [744, 1001], [746, 990], [749, 979],
    [752, 972], [757, 966], [765, 954], [776, 940], [787, 926],
    [794, 916], [805, 923], [816, 924], [832, 919], [849, 917],
    [861, 916], [866, 920]
];
L.polygon(s29AreaCoords, {
    className: 'organic-polygon',
    fillColor: '#b5c898',
    fillOpacity: 1
}).addTo(map)
  .bindPopup("<b>Site S29</b>");

// Add the label "S29" to the center of the site
const s29Center = [807, 966];
const s29Label = L.divIcon({
    className: 'naked-site-label',
    html: '<div class="scalable-label">S29</div>',
    iconSize: [60, 60],
    iconAnchor: [30, 30] // Anchor exactly in the center
});
L.marker(s29Center, { icon: s29Label, interactive: false }).addTo(map);

// --- IN-MAP LEGEND ---
// The bounds you drew for the legend box
const legendBounds = [[1126, 42], [1750, 536]];
L.rectangle(legendBounds, {
    className: 'organic-polygon', // Using the organic blur effect!
    color: '#4a3b32',
    weight: 3,
    fillColor: '#f4f1e1', // Slight parchment/paper color to match organic vibe
    fillOpacity: 1 // 100% solid so nothing bleeds through
}).addTo(map);

// Adding the scaled HTML text inside the bounds
const legendCenter = [1438, 289]; // Center of the legend rectangle
const legendHtml = `
<div class="embedded-legend-text">
    <h2>Legend</h2>
    <div class="embedded-legend-item"><strong>DW</strong> Dog Walking</div>
    <div class="embedded-legend-item"><strong>CH</strong> Club House / Office</div>
</div>`;
const legendIcon = L.divIcon({
    className: 'naked-site-label',
    html: legendHtml,
    iconSize: [400, 500],
    iconAnchor: [200, 250] // Anchors directly to the center coordinates
});
L.marker(legendCenter, { icon: legendIcon, interactive: false }).addTo(map);

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