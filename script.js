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

// --- SITE S29 ---
const s29AreaCoords = [
    [1147, 991], [1082.7, 1080.5], [1098.6, 1091.5], [1114.6, 1098.2], [1132.7, 1100.7],
    [1150.8, 1099.5], [1169.3, 1089], [1186.9, 1071.7], [1216.4, 1034.3]
];
L.polygon(s29AreaCoords, { className: 'organic-polygon', fillColor: '#b5c898', fillOpacity: 1 }).addTo(map).bindPopup("<b>Site S29</b>");
L.marker([1150, 1046], { icon: L.divIcon({ className: 'naked-site-label', html: '<div class="scalable-label">S29</div>', iconSize: [60,60], iconAnchor: [30,30] }), interactive: false }).addTo(map);

// --- TEMP COOKIE CUTTERS (P13, P14, P15, P16) ---
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

// --- PARKING ---
L.marker([1356, 693], { 
    icon: L.divIcon({ 
        className: 'naked-site-label', 
        html: '<div class="scalable-label" style="font-size: 32px; filter: drop-shadow(1px 1px 0px rgba(0,0,0,1)) drop-shadow(-1px -1px 0px rgba(0,0,0,1)) drop-shadow(1px -1px 0px rgba(0,0,0,1)) drop-shadow(-1px 1px 0px rgba(0,0,0,1));">🅿️</div>', 
        iconSize: [60,60], 
        iconAnchor: [30,30] 
    }),
    draggable: true
}).addTo(map).bindPopup("<b>Parking</b>");

L.marker([1076, 1491], { 
    icon: L.divIcon({ 
        className: 'naked-site-label', 
        html: '<div class="scalable-label" style="font-size: 32px; filter: drop-shadow(1px 1px 0px rgba(0,0,0,1)) drop-shadow(-1px -1px 0px rgba(0,0,0,1)) drop-shadow(1px -1px 0px rgba(0,0,0,1)) drop-shadow(-1px 1px 0px rgba(0,0,0,1));">🅿️</div>', 
        iconSize: [60,60], 
        iconAnchor: [30,30] 
    }),
    draggable: true
}).addTo(map).bindPopup("<b>Parking</b>");

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