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

// --- MAP PATCHES (Covering up old printed data) ---
const dropDWPatchCoords = [
    [46.7, 110.1], [108.9, 110.1], [108.9, 200.6], [46.7, 200.6]
];
L.polygon(dropDWPatchCoords, { 
    stroke: false, 
    fillColor: '#f4e4c9', // Sampled from the adjacent background
    fillOpacity: 1,
    className: 'map-patch'
}).addTo(map);

const dogAreaPatchCoords = [
    [264.5, 56.5], [321, 56.5], [321, 134.2], [264.5, 134.2]
];
L.polygon(dogAreaPatchCoords, { 
    stroke: false, 
    fillColor: '#778554', // Sampled from adjacent grass/dirt
    fillOpacity: 1,
    className: 'map-patch'
}).addTo(map);

L.marker([293, 95], { 
    icon: L.divIcon({ 
        className: 'naked-site-label', 
        html: '<div class="scalable-label" style="font-size: 40px; filter: drop-shadow(1px 1px 0px rgba(0,0,0,1)) drop-shadow(-1px -1px 0px rgba(0,0,0,1)) drop-shadow(1px -1px 0px rgba(0,0,0,1)) drop-shadow(-1px 1px 0px rgba(0,0,0,1));">🐕</div>', 
        iconSize: [60,60], 
        iconAnchor: [30,30] 
    }),
    interactive: false
}).addTo(map).bindPopup("<b>Dog Area</b>");

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

// --- SITE B4 ---
const b4AreaCoords = [
    [767.5, 636],
    [687.4, 706.8],
    [642, 660],
    [726, 590.5]
];
L.polygon(b4AreaCoords, {
    className: 'organic-polygon', 
    fillColor: '#b5c898',  
    fillOpacity: 1         
}).addTo(map).bindPopup("<b>Site B4</b>");

const b4Center = [706, 648];
const b4Label = L.divIcon({
    className: 'naked-site-label',
    html: '<div class="scalable-label">B4</div>',
    iconSize: [60, 60],
    iconAnchor: [30, 30]
});
L.marker(b4Center, { icon: b4Label, interactive: false }).addTo(map);

// --- SITE B5 ---
const b5AreaCoords = [
    [725.5, 590],
    [642.5, 662],
    [593.5, 605.5],
    [675, 533]
];
L.polygon(b5AreaCoords, {
    className: 'organic-polygon', 
    fillColor: '#b5c898',  
    fillOpacity: 1         
}).addTo(map).bindPopup("<b>Site B5</b>");

const b5Center = [659, 598];
const b5Label = L.divIcon({
    className: 'naked-site-label',
    html: '<div class="scalable-label">B5</div>',
    iconSize: [60, 60],
    iconAnchor: [30, 30]
});
L.marker(b5Center, { icon: b5Label, interactive: false }).addTo(map);

// --- SITE B6 ---
const b6AreaCoords = [
    [565.5, 626], [609, 673], [516.5, 757], [472, 708.5]
];
L.polygon(b6AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site B6</b>");
L.marker([541, 691], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">B6</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE B7 ---
const b7AreaCoords = [
    [623, 783.5], [613.8, 797.8], [604.5, 812], [588.5, 833.5], [516.5, 757], [562.9, 714.8]
];
L.polygon(b7AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site B7</b>");
L.marker([570, 774], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">B7</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE B8 ---
const b8AreaCoords = [
    [619.5, 962], [659.5, 1009.5], [638.5, 1036.5], [617, 1059.5], [559.5, 989], [607.5, 949]
];
L.polygon(b8AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site B8</b>");
L.marker([617, 1001], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">B8</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE B9 ---
const b9AreaCoords = [
    [530.5, 845], [530.8, 850.1], [529.3, 854.5], [525, 862.5], [513.5, 877], [489.5, 899], [410.5, 818.5], [459.5, 773.9]
];
L.polygon(b9AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site B9</b>");
L.marker([471, 836], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">B9</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE B10 ---
const b10AreaCoords = [
    [533.5, 1008.3], [463, 1073.5], [418.5, 1037], [487.5, 961]
];
L.polygon(b10AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site B10</b>");
L.marker([476, 1020], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">B10</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE B11 ---
const b11AreaCoords = [
    [520.5, 1182.5], [491.5, 1206.5], [521, 1261.5], [602, 1197.5], [566.5, 1150]
];
L.polygon(b11AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site B11</b>");
L.marker([547, 1206], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">B11</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE B12 ---
const b12AreaCoords = [
    [592.5, 1124], [566.5, 1150], [581.3, 1169.9], [602, 1197.5], [636, 1168], [670, 1134], [630.5, 1084]
];
L.polygon(b12AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site B12</b>");
L.marker([618, 1141], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">B12</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE B13 ---
const b13AreaCoords = [
    [655, 1058.5], [630.5, 1084], [646, 1102], [670, 1134], [737, 1056.5], [697.5, 1015]
];
L.polygon(b13AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site B13</b>");
L.marker([684, 1075], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">B13</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- JOHN MILLER PARK ---
const johnMillerAreaCoords = [
    [259.2, 311.9], [239, 339.5], [224.5, 360.3], [207.2, 386.8], [190.9, 411.5],
    [177.8, 437.3], [210.5, 448.6], [245.3, 455.7], [269.7, 454.3], [295.2, 448.3],
    [380.8, 374], [344.6, 317.8], [327.9, 291.4], [318.1, 278.9], [306.5, 273.5],
    [292.2, 274.4], [279.5, 283.9]
];
L.polygon(johnMillerAreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>John Miller Park</b>");
L.marker([278, 386], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">JOHN MILLER<br>PARK</div>', iconSize: [150,60], iconAnchor: [75,30] }), interactive: false }).addTo(map);

// --- POND ---
L.marker([416, 1186], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">POND</div>', iconSize: [150,60], iconAnchor: [75,30] }), draggable: true }).addTo(map);

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

// --- SITE B14 ---
const b14AreaCoords = [
    [412.8, 422.3],
    [443.6, 466.7],
    [354.4, 541.1],
    [322.3, 495.6]
];
L.polygon(b14AreaCoords, {
    className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1
}).addTo(map).bindPopup("<b>Site B14</b>");
const b14Label = L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">B14</div>', iconSize: [60,60], iconAnchor: [30,30] });
L.marker([383, 481], { icon: b14Label, interactive: false }).addTo(map);

// --- SITE B15 ---
const b15AreaCoords = [
    [443.5, 467.0],
    [473.4, 510.0],
    [386.4, 580.6],
    [354.4, 541.1]
];
L.polygon(b15AreaCoords, {
    className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1
}).addTo(map).bindPopup("<b>Site B15</b>");
const b15Label = L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">B15</div>', iconSize: [60,60], iconAnchor: [30,30] });
L.marker([414, 524], { icon: b15Label, interactive: false }).addTo(map);

// --- SITE B16 ---
const b16AreaCoords = [
    [473.3, 510.8],
    [510.8, 560.0],
    [429.3, 629.8],
    [386.4, 580.6]
];
L.polygon(b16AreaCoords, {
    className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1
}).addTo(map).bindPopup("<b>Site B16</b>");
const b16Label = L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">B16</div>', iconSize: [60,60], iconAnchor: [30,30] });
L.marker([449, 570], { icon: b16Label, interactive: false }).addTo(map);

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

// --- DOG POOP DISPOSALS ---
L.marker([1015, 1760], { 
    icon: L.divIcon({ 
        className: 'naked-site-label', 
        html: '<div class="scalable-label" style="font-size: 32px; filter: drop-shadow(1px 1px 0px rgba(0,0,0,1)) drop-shadow(-1px -1px 0px rgba(0,0,0,1)) drop-shadow(1px -1px 0px rgba(0,0,0,1)) drop-shadow(-1px 1px 0px rgba(0,0,0,1));">💩</div>', 
        iconSize: [60,60], 
        iconAnchor: [30,30] 
    }) 
}).addTo(map).bindPopup("<b>Dog Poop Disposal</b>");

L.marker([287, 311], { 
    icon: L.divIcon({ 
        className: 'naked-site-label', 
        html: '<div class="scalable-label" style="font-size: 32px; filter: drop-shadow(1px 1px 0px rgba(0,0,0,1)) drop-shadow(-1px -1px 0px rgba(0,0,0,1)) drop-shadow(1px -1px 0px rgba(0,0,0,1)) drop-shadow(-1px 1px 0px rgba(0,0,0,1));">💩</div>', 
        iconSize: [60,60], 
        iconAnchor: [30,30] 
    }) 
}).addTo(map).bindPopup("<b>Dog Poop Disposal</b>");

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
    <div class="embedded-legend-item" style="display:flex; align-items:center; gap: 8px;">
        <span style="font-size: 28px; filter: drop-shadow(1px 1px 0px #000) drop-shadow(-1px -1px 0px #000) drop-shadow(1px -1px 0px #000) drop-shadow(-1px 1px 0px #000);">🐕</span> Dog Area
    </div>
    <div class="embedded-legend-item"><strong>CH</strong> Club House / Office</div>
    <div class="embedded-legend-item" style="display:flex; align-items:center; gap: 8px;">
        <span style="font-size: 28px; filter: drop-shadow(1px 1px 0px #000) drop-shadow(-1px -1px 0px #000) drop-shadow(1px -1px 0px #000) drop-shadow(-1px 1px 0px #000);">💩</span> Dog Poop Disposal
    </div>
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
    // Don't drop a pin if we are just clicking randomly around the map 
    // Console log coordinates for developers internally, but don't drop dots!
    const y = Math.round(e.latlng.lat);
    const x = Math.round(e.latlng.lng);
    console.log(`Clicked Coordinates: [${y}, ${x}]`);
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