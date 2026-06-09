// 1. Set up a simple coordinate system (non-geographical, just for images)
const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -4, // Lowered to allow zooming out further
    maxZoom: 3,
    zoomSnap: 0.25, // Enables smooth fractional zooming
    zoomDelta: 0.5
});
window._leafletMap = map;

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
  .bindPopup("<b>B1 - Billy & Heather</b>");

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
L.marker([419, 1187], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">POND</div>', iconSize: [150,60], iconAnchor: [75,30] }) }).addTo(map);

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

// --- SITE S24 ---
const s24AreaCoords = [
    [983.8, 978.4], [1009.5, 1010.8], [1036, 1041.4], [1110.4, 956.5], [1063.3, 904.4]
];
L.polygon(s24AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S24</b>");
L.marker([1047, 973], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S24</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S25 ---
const s25AreaCoords = [
    [941.4, 932.5], [962.8, 954.4], [983.8, 978.4], [1063.3, 904.4], [1020.3, 858.4]
];
L.polygon(s25AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S25</b>");
L.marker([1002, 918], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S25</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S28 ---
const s28AreaCoords = [
    [886.7, 882.5], [914.9, 906.9], [941.4, 932.5], [1019.6, 856.9], [970.9, 809.1], [927.9, 845.5]
];
L.polygon(s28AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S28</b>");
L.marker([953, 871], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S28</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S26 ---
const s26AreaCoords = [
    [1201.2, 914], [1218, 929], [1267.7, 960.7], [1317.7, 879.2], [1288.7, 859.4],
    [1273.5, 850.1], [1266, 844.3], [1258.8, 843], [1251.3, 848.9], [1243.7, 857.3], [1229, 875.8]
];
L.polygon(s26AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S26</b>");
L.marker([1259, 902], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S26</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S27 ---
const s27AreaCoords = [
    [1201.2, 914], [1185.7, 931.7], [1170.9, 950.6], [1147, 991], [1216.4, 1034.3],
    [1224.8, 1015.4], [1235.3, 998.1], [1247.5, 991.4], [1267.7, 960.7]
];
L.polygon(s27AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S27</b>");
L.marker([1207, 974], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S27</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S23 ---
const s23AreaCoords = [
    [1147, 991], [1082.7, 1080.5], [1098.6, 1091.5], [1114.6, 1098.2], [1132.7, 1100.7],
    [1150.8, 1099.5], [1169.3, 1089], [1186.9, 1071.7], [1216.4, 1034.3]
];
L.polygon(s23AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S23</b>");
L.marker([1150, 1046], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S23</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P1 ---
const p1AreaCoords = [
    [1508.1, 949], [1485, 982.2], [1465.7, 1015.8], [1553.1, 1075.9], [1590.6, 1038.9]
];
L.polygon(p1AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P1</b>");
L.marker([1528.1, 1012.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P1</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P2 ---
const p2AreaCoords = [
    [1465.7, 1015.8], [1443.4, 1056.2], [1422.4, 1097], [1518.2, 1144], [1522.9, 1126], [1530.9, 1108.3], [1540.5, 1091.1], [1553.1, 1075.9]
];
L.polygon(p2AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P2</b>");
L.marker([1487.8, 1079.9], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P2</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P3 ---
const p3AreaCoords = [
    [1422.4, 1097], [1386.7, 1170.5], [1492.2, 1219.3], [1518.2, 1144]
];
L.polygon(p3AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P3</b>");
L.marker([1452.4, 1158.1], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P3</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P4 ---
const p4AreaCoords = [
    [1386.7, 1170.5], [1373.2, 1194.5], [1362.3, 1220.2], [1477.9, 1270.6], [1492.2, 1219.3]
];
L.polygon(p4AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P4</b>");
L.marker([1427.2, 1220.6], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P4</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P5 ---
const p5AreaCoords = [
    [1362.3, 1220.2], [1352.2, 1247.5], [1346.7, 1274], [1464, 1323.6], [1477.9, 1270.6]
];
L.polygon(p5AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P5</b>");
L.marker([1412.3, 1271.9], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P5</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P6 ---
const p6AreaCoords = [
    [1346.7, 1274], [1343.3, 1291.2], [1340.4, 1307.6], [1336.6, 1341.2], [1449.3, 1382.4], [1464, 1323.6]
];
L.polygon(p6AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P6</b>");
L.marker([1400.3, 1328.2], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P6</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P7 ---
const p7AreaCoords = [
    [1336.6, 1341.2], [1330.7, 1375.7], [1323.2, 1408.9], [1434.2, 1442.2], [1449.3, 1382.4]
];
L.polygon(p7AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P7</b>");
L.marker([1386.2, 1391.7], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P7</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P8 ---
const p8AreaCoords = [
    [1323.2, 1408.9], [1305.1, 1464.9], [1393.8, 1489.6], [1399.3, 1485.4], [1406.4, 1484.2], [1414.3, 1484.1], [1422.8, 1485.4], [1434.2, 1442.2]
];
L.polygon(p8AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P8</b>");
L.marker([1369.6, 1449.3], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P8</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P9 ---
const p9AreaCoords = [
    [1305.1, 1464.9], [1284.1, 1521.6], [1376.8, 1544.8], [1384.2, 1516.8], [1393.8, 1489.6]
];
L.polygon(p9AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P9</b>");
L.marker([1338.9, 1504.8], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P9</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- UNKNOWN SITE (Top Left of P12) ---
const pBlankAreaCoords = [
    [1426.9, 1491.3], [1423.4, 1507.6], [1417.4, 1522.4], [1410.7, 1538.7], [1402.6, 1552.8], [1486.3, 1575.1], [1509, 1515.3]
];
L.polygon(pBlankAreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Unknown</b>");
L.marker([1455.8, 1533.2], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">?</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P12 ---
const p12AreaCoords = [
    [1402.6, 1552.8], [1387.3, 1581.8], [1373.9, 1611.9], [1463, 1632.4], [1486.3, 1575.1]
];
L.polygon(p12AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P12</b>");
L.marker([1430.1, 1592.6], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P12</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P11 ---
const p11AreaCoords = [
    [1329.2, 1532.9], [1282.7, 1640.5], [1296.8, 1641.9], [1311, 1640.5], [1325.8, 1638.7], [1339.6, 1634.8], [1351.1, 1613.3], [1360.2, 1591], [1369.5, 1567.8], [1376.8, 1544.8]
];
L.polygon(p11AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P11</b>");
L.marker([1329.8, 1587.4], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P11</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P10 ---
const p10AreaCoords = [
    [1284.1, 1521.6], [1270.7, 1550], [1256, 1576.2], [1240.3, 1602.5], [1232.3, 1615.5], [1228.3, 1622.2], [1226, 1628.7], [1231.3, 1633.5], [1236.8, 1636.5], [1251.8, 1639.2], [1282.7, 1640.5], [1329.2, 1532.9]
];
L.polygon(p10AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P10</b>");
L.marker([1277.6, 1581], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P10</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE T1 ---
const t1AreaCoords = [
    [1173.2, 1678.6], [1135.1, 1731.5], [1259.9, 1742.8], [1265.9, 1689.9]
];
L.polygon(t1AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site T1</b>");
L.marker([1200.5, 1710.7], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">T1</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P13 ---
const p13AreaCoords = [
    [1380.6, 933.3], [1350, 987], [1424.7, 1028.1], [1440.4, 1004.9], [1447.3, 992.7],
    [1452.6, 979.3], [1449.9, 974.6], [1445.2, 971.3], [1436, 965], [1416.9, 954.9]
];
L.polygon(p13AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P13</b>");
L.marker([1401, 981], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P13</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

const p14AreaCoords = [
    [1350, 987], [1316.5, 1042.7], [1398.8, 1081.6], [1424.7, 1028.1]
];
L.polygon(p14AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P14</b>");
L.marker([1371, 1034], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P14</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

const p15AreaCoords = [
    [1316.5, 1042.7], [1302.5, 1067.6], [1290.6, 1093.5], [1371.5, 1134.2], [1398.8, 1081.6]
];
L.polygon(p15AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P15</b>");
L.marker([1345, 1088], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P15</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

const p16AreaCoords = [
    [1290.6, 1093.5], [1264.1, 1145.8], [1342, 1195.5], [1371.5, 1134.2]
];
L.polygon(p16AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P16</b>");
L.marker([1318, 1144], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P16</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P17 ---
const p17AreaCoords = [
    [1187.5, 1234.5], [1147, 1262], [1264.2, 1310.7], [1290.5, 1319.5], [1307, 1314], [1307.5, 1300], [1305.5, 1286], [1300, 1272.5], [1292, 1259.5], [1267, 1229.5], [1238, 1199.5]
];
L.polygon(p17AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P17</b>");
L.marker([1227.3, 1259.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P17</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P18 ---
const p18AreaCoords = [
    [1206.6, 1286.8], [1177.5, 1356], [1256.5, 1392.5], [1290.5, 1319.5]
];
L.polygon(p18AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P18</b>");
L.marker([1234, 1339.6], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P18</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P19 ---
const p19AreaCoords = [
    [1177.5, 1356], [1145, 1421.5], [1225.5, 1459.5], [1256.2, 1393.3]
];
L.polygon(p19AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P19</b>");
L.marker([1200.6, 1407.8], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P19</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P20 ---
const p20AreaCoords = [
    [1145, 1421.5], [1120, 1485.5], [1187.5, 1540.5], [1225.5, 1459.5]
];
L.polygon(p20AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P20</b>");
L.marker([1172.8, 1481], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P20</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P21 ---
const p21AreaCoords = [
    [1120, 1485.5], [1094, 1546], [1171.5, 1635.5], [1194.5, 1603.5], [1206.5, 1586.5], [1216.5, 1569]
];
L.polygon(p21AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P21</b>");
L.marker([1155.2, 1560.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P21</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P22 ---
const p22AreaCoords = [
    [1094, 1546], [1052, 1585], [1117.5, 1699], [1145, 1668.5], [1171.5, 1635.5]
];
L.polygon(p22AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P22</b>");
L.marker([1111.8, 1622.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P22</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P23 ---
const p23AreaCoords = [
    [1022, 1588.5], [1043, 1766.5], [1062, 1753.5], [1081, 1737.5], [1100.5, 1719], [1117.5, 1699], [1052, 1585]
];
L.polygon(p23AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P23</b>");
L.marker([1069.8, 1675.8], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P23</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P24 ---
const p24AreaCoords = [
    [971, 1590], [977, 1701], [1034.7, 1696.5], [1022, 1588.5]
];
L.polygon(p24AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P24</b>");
L.marker([1002.9, 1644.8], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P24</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P25 ---
const p25AreaCoords = [
    [895, 1536], [989.5, 1536.5], [997, 1589.2], [895.5, 1591]
];
L.polygon(p25AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P25</b>");
L.marker([943.7, 1563.8], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P25</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE P26 ---
const p26AreaCoords = [
    [817.5, 1501.5], [894.5, 1499.5], [895.2, 1559.5], [790.5, 1561.5]
];
L.polygon(p26AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P26</b>");
L.marker([856.3, 1530.8], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P26</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE S19 ---
const s19AreaCoords = [
    [1131.5, 1142.5], [1088, 1237], [1147, 1262], [1238, 1199.5], [1212.5, 1182], [1186, 1166.5], [1159, 1153.5]
];
L.polygon(s19AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S19</b>");
L.marker([1163, 1202.3], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S19</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S20 ---
const s20AreaCoords = [
    [1015, 1086.5], [1014, 1115.5], [1019.5, 1145.5], [1031, 1204.5], [1059.5, 1223.5], [1088, 1237], [1131.5, 1142.5], [1072, 1120], [1044, 1102.5], [1030.5, 1093.5]
];
L.polygon(s20AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S20</b>");
L.marker([1072.7, 1161.8], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S20</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- TEMP COOKIE CUTTERS (L5, L6, L7, L8) ---
const l5AreaCoords = [
    [1595.9, 729.6], [1609.6, 831.8], [1628.6, 828.9], [1646.5, 828.9],
    [1710.1, 780.1], [1699.4, 765.3], [1686.9, 758.1], [1653, 746.2]
];
L.polygon(l5AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site L5</b>");
L.marker([1645, 780], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">L5</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

const l6AreaCoords = [
    [1513.6, 750.1], [1575, 849.3], [1591.4, 839.6], [1609.6, 831.8], [1595.9, 729.6], [1552.7, 737.5]
];
L.polygon(l6AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site L6</b>");
L.marker([1569, 784], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">L6</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

const l7AreaCoords = [
    [1456.4, 802.6], [1538, 882.1], [1555.2, 866.1], [1575, 849.3], [1513.6, 750.1], [1483.8, 775.7]
];
L.polygon(l7AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site L7</b>");
L.marker([1516, 816], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">L7</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE L8 ---
const l8AreaCoords = [
    [1456.4, 802.6], [1423.6, 872.4], [1490.5, 926.2], [1502.3, 917], [1514, 905.6], [1538, 882.1]
];
L.polygon(l8AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site L8</b>");
L.marker([1479, 870], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">L8</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE L4 ---
const l4AreaCoords = [
    [1646.5, 828.9], [1660.8, 837.1], [1672.5, 851], [1716.3, 922], [1758.7, 880.4], [1710.1, 780.1]
];
L.polygon(l4AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site L4</b>");
L.marker([1702.6, 851.1], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">L4</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE L3 ---
const l3AreaCoords = [
    [1617, 859], [1670.4, 975.8], [1692.7, 948.1], [1716.3, 922], [1672.5, 851], [1659.1, 862.8], [1648.6, 861.9], [1638.1, 858.6], [1627.1, 856.5]
];
L.polygon(l3AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site L3</b>");
L.marker([1666.7, 913.4], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">L3</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE L2 ---
const l2AreaCoords = [
    [1559.4, 896.8], [1631.8, 1011.6], [1651.9, 997.3], [1670.4, 975.8], [1617, 859], [1599.8, 863.2], [1584.7, 870.8], [1570.4, 882.5]
];
L.polygon(l2AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site L2</b>");
L.marker([1614.9, 935.3], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">L2</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE L1 ---
const l1AreaCoords = [
    [1508.1, 949], [1590.6, 1038.9], [1631.8, 1011.6], [1559.4, 896.8], [1546.4, 907.7], [1533.4, 922]
];
L.polygon(l1AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site L1</b>");
L.marker([1570, 967.9], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">L1</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- COSMETIC PATCHES ---
// User requested patching over a painted "G" on the image without leaving a mess
L.circle([1399.7, 1737.7], {
    radius: 17,
    fillColor: '#c2bca7', 
    fillOpacity: 1,
    color: '#c2bca7',
    weight: 1,
    interactive: false
}).addTo(map);

// --- NEW DOG AREA OVERLAY ---
const tempDogArea = L.marker([1399.7, 1737.7], { 
    icon: L.divIcon({ 
        className: 'naked-site-label', 
        html: '<div class="scalable-label" style="font-size: 30px; cursor: move; filter: drop-shadow(1px 1px 0px rgba(0,0,0,1)) drop-shadow(-1px -1px 0px rgba(0,0,0,1)) drop-shadow(1px -1px 0px rgba(0,0,0,1)) drop-shadow(-1px 1px 0px rgba(0,0,0,1));">🐕</div>', 
        iconSize: [60,60], 
        iconAnchor: [30,30] 
    }),
    draggable: true
}).addTo(map).bindPopup("<b>Dog Area</b>");

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

// --- GARBAGE AND RECYCLING ---
L.marker([112, 858], { 
    icon: L.divIcon({ 
        className: 'naked-site-label', 
        html: '<div class="scalable-label" style="font-size: 32px; filter: drop-shadow(1px 1px 0px rgba(0,0,0,1)) drop-shadow(-1px -1px 0px rgba(0,0,0,1)) drop-shadow(1px -1px 0px rgba(0,0,0,1)) drop-shadow(-1px 1px 0px rgba(0,0,0,1));">🗑️</div>', 
        iconSize: [60,60], 
        iconAnchor: [30,30] 
    })
}).addTo(map).bindPopup("<b>Garbage</b>");

L.marker([114, 912], { 
    icon: L.divIcon({ 
        className: 'naked-site-label', 
        html: '<div class="scalable-label" style="font-size: 32px; filter: drop-shadow(1px 1px 0px rgba(0,0,0,1)) drop-shadow(-1px -1px 0px rgba(0,0,0,1)) drop-shadow(1px -1px 0px rgba(0,0,0,1)) drop-shadow(-1px 1px 0px rgba(0,0,0,1));">♻️</div>', 
        iconSize: [60,60], 
        iconAnchor: [30,30] 
    })
}).addTo(map).bindPopup("<b>Recycling</b>");

// --- SITE P47 ---
const p47AreaCoords = [
    [888.3, 1344.8], [895, 1328], [910.5, 1320], [939, 1314.5], [979.5, 1381], [902.5, 1444.5], [895.5, 1425], [892.5, 1396]
];
L.polygon(p47AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P47</b>");
L.marker([926, 1371.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P47</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P49 ---
const p49AreaCoords = [
    [1010.5, 1430], [1027.5, 1430.5], [1044.5, 1425], [1099, 1473.5], [1084, 1486], [1068, 1490.5], [1034, 1500], [998.5, 1510], [983, 1511], [969, 1504]
];
L.polygon(p49AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P49</b>");
L.marker([1031, 1468.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P49</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P51 ---
const p51AreaCoords = [
    [1041.5, 1384], [1100, 1349.5], [1099, 1473.5], [1044.5, 1425], [1047.5, 1405]
];
L.polygon(p51AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P51</b>");
L.marker([1073.5, 1409.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P51</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P50 ---
const p50AreaCoords = [
    [1008.5, 1289.5], [1056, 1313.5], [1080, 1329], [1092, 1338], [1100, 1349.5], [1041.5, 1384], [1014.5, 1361], [983, 1339], [973.5, 1325], [965.5, 1308.5], [956, 1273.5]
];
L.polygon(p50AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P50</b>");
L.marker([1026, 1330], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">P50</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S21 ---
const s21AreaCoords = [
    [927.5, 978], [932.5, 977], [937.5, 982], [947.5, 993], [966.5, 1015], [985, 1036], 
    [994.5, 1050], [1000, 1065.5], [1000.5, 1082], [998.5, 1099], [992, 1132.5], 
    [951, 1100.5], [919.5, 1073], [917.5, 1050], [918, 1022.5], [921, 996], [923.5, 984]
];
L.polygon(s21AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S21</b>");
L.marker([951, 1051], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S21</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S22 ---
const s22AreaCoords = [
    [919.5, 1073], [992, 1132.5], [992.5, 1175], [995, 1219], 
    [936, 1188], [929.5, 1159], [926, 1130.5], [921, 1101.5]
];
L.polygon(s22AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S22</b>");
L.marker([960.1, 1155.9], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">S22</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE S30 ---
const s30AreaCoords = [
    [827, 1033.5], [894.5, 1084], [902.5, 1139], [913.5, 1194], 
    [821, 1130], [820, 1076.5], [823.5, 1053]
];
L.polygon(s30AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S30</b>");
L.marker([858.2, 1104], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">S30</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE S31 ---
const s31AreaCoords = [
    [823.5, 1166], [821, 1130], [913.5, 1194], [916, 1212], 
    [915.5, 1229], [889.5, 1267], [860, 1299]
];
L.polygon(s31AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S31</b>");
L.marker([874.2, 1211.9], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">S31</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE S36 ---
const s36AreaCoords = [
    [748.5, 1058.5], [791, 1065], [791.5, 1104], [794.5, 1141.5], 
    [798, 1180], [798.5, 1199], [795.5, 1218.5], [721.5, 1174.5]
];
L.polygon(s36AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S36</b>");
L.marker([764, 1127.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S36</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S35 ---
const s35AreaCoords = [
    [721.5, 1174.5], [795.5, 1218.5], [790.5, 1235], [783, 1251], 
    [773, 1264.5], [759.5, 1275.5], [746, 1280], [727, 1282], 
    [695, 1276.5], [681.5, 1275], [669, 1276], [637, 1254], [683, 1216.5]
];
L.polygon(s35AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S35</b>");
L.marker([725.5, 1235], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S35</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S34 ---
const s34AreaCoords = [
    [637, 1254], [669, 1276], [661.5, 1283.5], [661.5, 1293], 
    [664.5, 1302], [670.5, 1309], [641.1, 1329.9], [610, 1357.5], [537, 1328]
];
L.polygon(s34AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S34</b>");
L.marker([614, 1308.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S34</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S33 ---
const s33AreaCoords = [
    [670.5, 1309], [724, 1311.5], [751, 1310], [777.5, 1304.5], 
    [723, 1383.5], [666.5, 1373], [610, 1357.5]
];
L.polygon(s33AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S33</b>");
L.marker([701.1, 1345.9], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S33</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S32 ---
const s32AreaCoords = [
    [777.5, 1304.5], [797, 1294.5], [805.5, 1285.5], [811.5, 1274.5], 
    [860, 1299], [850, 1323], [843.5, 1349], [831, 1401], [723, 1383.5]
];
L.polygon(s32AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S32</b>");
L.marker([805, 1340.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S32</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE S29 ---
const s29AreaCoords = [
    [794, 916], [808, 923], [836, 917], [852, 914], [868, 919], [870, 929],
    [865, 938], [851, 955], [840.1, 991], [794, 1011], [755, 1017], [746, 1011],
    [743, 995], [756, 965]
];
L.polygon(s29AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S29</b>");
L.marker([801, 966], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S29</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- SITE P27 ---
const p27AreaCoords = [
    [740, 1429], [780, 1440], [819.5, 1452.5], [767, 1527], [728.5, 1518]
];
L.polygon(p27AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P27</b>");
L.marker([763, 1479.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P27</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE P28 ---
const p28AreaCoords = [
    [683.5, 1420.5], [740, 1429], [728.5, 1518], [702.5, 1513], [676.5, 1508]
];
L.polygon(p28AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P28</b>");
L.marker([705.5, 1469.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P28</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE P29 ---
const p29AreaCoords = [
    [625.5, 1409], [683.5, 1420.5], [676.5, 1508], [620.5, 1494.5]
];
L.polygon(p29AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P29</b>");
L.marker([652, 1459], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P29</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE P30 ---
const p30AreaCoords = [
    [569, 1396.5], [625.5, 1409], [620.5, 1494.5], [589.5, 1487], [557, 1481.5]
];
L.polygon(p30AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P30</b>");
L.marker([594, 1446.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P30</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE P31 ---
const p31AreaCoords = [
    [509, 1377], [569, 1396.5], [557, 1481.5], [533, 1481.5], [510, 1483.5]
];
L.polygon(p31AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P31</b>");
L.marker([534, 1430.4], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P31</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE P32 ---
const p32AreaCoords = [
    [457, 1357], [509, 1377], [510, 1483.5], [495.5, 1478.5], [481.5, 1468.5], [468.5, 1455], [458, 1440.5]
];
L.polygon(p32AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P32</b>");
L.marker([482.5, 1413.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P32</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE P33 ---
const p33AreaCoords = [
    [401.5, 1350], [457, 1357], [458, 1440.5], [445, 1430], [431.5, 1423.5], [416.5, 1425], [406, 1432]
];
L.polygon(p33AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P33</b>");
L.marker([430, 1389.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P33</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE P34 ---
const p34AreaCoords = [
    [503.5, 1513], [527.5, 1509], [549, 1508.5], [569.5, 1511], [593.5, 1516], [594.5, 1571.5], [505, 1573]
];
L.polygon(p34AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P34</b>");
L.marker([549, 1540.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P34</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE P35 ---
const p35AreaCoords = [
    [472.5, 1541], [485.5, 1523], [503.5, 1513], [506.5, 1670.5], [442, 1676], [453.5, 1607.5], [462.5, 1573.5]
];
L.polygon(p35AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P35</b>");
L.marker([479.5, 1609.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P35</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE P36 ---
const p36AreaCoords = [
    [517.5, 1684], [577, 1683.5], [580.5, 1804.5], [550.5, 1807.5], [519.5, 1808.5]
];
L.polygon(p36AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P36</b>");
L.marker([549, 1747.5], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P36</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE P37 ---
const p37AreaCoords = [
    [386.4, 1503.9], [450.7, 1533.4], [443.2, 1552.7], [437.3, 1572.5], [428, 1616.2], [375.9, 1593.5]
];
L.polygon(p37AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P37</b>");
L.marker([413, 1560], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P37</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- SITE P38 ---
const p38AreaCoords = [
    [375.9, 1593.5], [428, 1616.2], [407.8, 1724.7], [360.7, 1708.3]
];
L.polygon(p38AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site P38</b>");
L.marker([394, 1659], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label" style="cursor: move;">P38</div>', iconSize: [60,60], iconAnchor: [30,30] }), draggable: true }).addTo(map);

// --- PARKING (near P37/P38 area) ---
L.marker([462, 1752], {
    icon: L.divIcon({
        className: 'naked-site-label',
        html: '<div class="scalable-label" style="font-size: 28px; cursor: move; filter: drop-shadow(1px 1px 0px rgba(0,0,0,1)) drop-shadow(-1px -1px 0px rgba(0,0,0,1)) drop-shadow(1px -1px 0px rgba(0,0,0,1)) drop-shadow(-1px 1px 0px rgba(0,0,0,1));">🅿️</div>',
        iconSize: [60,60],
        iconAnchor: [30,30]
    }),
    draggable: true
}).addTo(map);

// --- TEMPORARY PARKING SPOT ---
const blankAreaCoords = [
    [979.5, 1381], [991.5, 1411], [1000.5, 1422], [1010.5, 1430], [969, 1504], [933.5, 1476.5], [902.5, 1444.5]
];
L.polygon(blankAreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map);

// Provide a draggable parking emoji for the user over the blank spot
L.marker([959.5, 1443.5], { 
    icon: L.divIcon({ 
        className: 'naked-site-label', 
        html: '<div class="scalable-label" style="font-size: 28px; filter: drop-shadow(1px 1px 0px rgba(0,0,0,1)) drop-shadow(-1px -1px 0px rgba(0,0,0,1)) drop-shadow(1px -1px 0px rgba(0,0,0,1)) drop-shadow(-1px 1px 0px rgba(0,0,0,1));">🅿️</div>', 
        iconSize: [60,60], 
        iconAnchor: [30,30] 
    }),
    interactive: false
}).addTo(map);

// --- PARKING ---
/*
L.marker([1356, 693], { 
    icon: L.divIcon({ 
        className: 'naked-site-label', 
        html: '<div class="scalable-label" style="font-size: 28px; filter: drop-shadow(1px 1px 0px rgba(0,0,0,1)) drop-shadow(-1px -1px 0px rgba(0,0,0,1)) drop-shadow(1px -1px 0px rgba(0,0,0,1)) drop-shadow(-1px 1px 0px rgba(0,0,0,1));">🅿️</div>', 
        iconSize: [60,60], 
        iconAnchor: [30,30] 
    }),
    draggable: true
}).addTo(map).bindPopup("<b>Parking</b>");

L.marker([1076, 1491], { 
    icon: L.divIcon({ 
        className: 'naked-site-label', 
        html: '<div class="scalable-label" style="font-size: 28px; filter: drop-shadow(1px 1px 0px rgba(0,0,0,1)) drop-shadow(-1px -1px 0px rgba(0,0,0,1)) drop-shadow(1px -1px 0px rgba(0,0,0,1)) drop-shadow(-1px 1px 0px rgba(0,0,0,1));">🅿️</div>', 
        iconSize: [60,60], 
        iconAnchor: [30,30] 
    }),
    draggable: true
}).addTo(map).bindPopup("<b>Parking</b>");
*/

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
    <div class="embedded-legend-item" style="display:flex; align-items:center; gap: 8px;">
        <span style="font-size: 28px; filter: drop-shadow(1px 1px 0px #000) drop-shadow(-1px -1px 0px #000) drop-shadow(1px -1px 0px #000) drop-shadow(-1px 1px 0px #000);">🗑️</span> Garbage
    </div>
    <div class="embedded-legend-item" style="display:flex; align-items:center; gap: 8px;">
        <span style="font-size: 28px; filter: drop-shadow(1px 1px 0px #000) drop-shadow(-1px -1px 0px #000) drop-shadow(1px -1px 0px #000) drop-shadow(-1px 1px 0px #000);">♻️</span> Recycling
    </div>
    <div class="embedded-legend-item" style="display:flex; align-items:center; gap: 8px;">
        <span style="font-size: 28px; filter: drop-shadow(1px 1px 0px #000) drop-shadow(-1px -1px 0px #000) drop-shadow(1px -1px 0px #000) drop-shadow(-1px 1px 0px #000);">🅿️</span> Parking
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
