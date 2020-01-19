M.AutoInit();

var mymap = L.map('mapid').setView([22, 77], 4);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>' +
    ' | Aaditya Mankar, AgainstTheCurrent',
  id: 'mapbox/dark-v10'
}).addTo(mymap);

var layerControl = L.control.layers();
layerControl.addTo(mymap);

//add controls for geoman
mymap.pm.addControls({
  position: 'topleft',
  color: 'orange',
  fillColor: 'green',
  fillOpacity: 0.4,
});

mymap.pm.setPathOptions({
  color: '#900000',
  fillColor: '#a00',
  fillOpacity: 0.1,
});

L.control.fullscreen({
  position: 'topright', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
  title: 'Enter Fullscreen mode.', // change the title of the button, default Full Screen
  titleCancel: 'Exit fullscreen mode.', // change the title of the button when fullscreen is on, default Exit Full Screen
  content: null, // change the content of the button, can be HTML, default null
  forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
  forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
  fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
}).addTo(mymap);


L.control.mouseCoordinate({
  gpsLong: true,
  gps: true
}).addTo(mymap);

var optionsForPolyLineMeasure = {
  position: 'topleft', // Position to show the control. Values: 'topright', 'topleft', 'bottomright', 'bottomleft'
  unit: 'metres', // Show imperial or metric distances. Values: 'metres', 'landmiles', 'nauticalmiles'
  clearMeasurementsOnStop: false, // Clear all the measurements when the control is unselected
  showBearings: true, // Whether bearings are displayed within the tooltips
  bearingTextIn: 'In', // language dependend label for inbound bearings
  bearingTextOut: 'Out', // language dependend label for outbound bearings
  tooltipTextFinish: 'Click to <b>finish line</b><br>',
  tooltipTextDelete: 'Press SHIFT-key and click to <b>delete point</b>',
  tooltipTextMove: 'Click and drag to <b>move point</b><br>',
  tooltipTextResume: '<br>Press CTRL-key and click to <b>resume line</b>',
  tooltipTextAdd: 'Press CTRL-key and click to <b>add point</b>',
  // language dependend labels for point's tooltips
  measureControlTitleOn: 'Turn on PolylineMeasure', // Title for the control going to be switched on
  measureControlTitleOff: 'Turn off PolylineMeasure', // Title for the control going to be switched off
  measureControlLabel: '&#8614;', // Label of the Measure control (maybe a unicode symbol)
  measureControlClasses: [], // Classes to apply to the Measure control
  showClearControl: true, // Show a control to clear all the measurements
  clearControlTitle: 'Clear Measurements', // Title text to show on the clear measurements control button
  clearControlLabel: '&times', // Label of the Clear control (maybe a unicode symbol)
  clearControlClasses: [], // Classes to apply to clear control button
  showUnitControl: true, // Show a control to change the units of measurements
  distanceShowSameUnit: true, // Keep same unit in tooltips in case of distance less then 1 km/mi/nm
  unitControlTitle: { // Title texts to show on the Unit Control button
    text: 'Change Units',
    metres: 'metres',
    landmiles: 'land miles',
    nauticalmiles: 'nautical miles'
  },
  unitControlLabel: {
    nauticalmiles: 'nm', // Unit symbols to show in the Unit Control button and measurement labels
    metres: 'm',
    kilometres: 'km',
    feet: 'ft',
    landmiles: 'mi'
  },
  tempLine: { // Styling settings for the temporary dashed line
    color: '#D01', // Dashed line color
    weight: 2 // Dashed line weight
  },
  fixedLine: { // Styling for the solid line
    color: '#0AA', // Solid line color
    weight: 2 // Solid line weight
  },
  startCircle: { // Style settings for circle marker indicating the starting point of the polyline
    color: '#000', // Color of the border of the circle
    weight: 1, // Weight of the circle
    fillColor: '#0f0', // Fill color of the circle
    fillOpacity: 1, // Fill opacity of the circle
    radius: 3 // Radius of the circle
  },
  intermedCircle: { // Style settings for all circle markers between startCircle and endCircle
    color: '#000', // Color of the border of the circle
    weight: 1, // Weight of the circle
    fillColor: '#fff', // Fill color of the circle
    fillOpacity: 1, // Fill opacity of the circle
    radius: 3 // Radius of the circle
  },
  currentCircle: { // Style settings for circle marker indicating the latest point of the polyline during drawing a line
    color: '#000', // Color of the border of the circle
    weight: 1, // Weight of the circle
    fillColor: '#f0f', // Fill color of the circle
    fillOpacity: 1, // Fill opacity of the circle
    radius: 3 // Radius of the circle
  },
  endCircle: { // Style settings for circle marker indicating the last point of the polyline
    color: '#000', // Color of the border of the circle
    weight: 1, // Weight of the circle
    fillColor: '#f00', // Fill color of the circle
    fillOpacity: 1, // Fill opacity of the circle
    radius: 3 // Radius of the circle
  },
};

let polylineMeasure = L.control.polylineMeasure(optionsForPolyLineMeasure);
polylineMeasure.addTo(mymap), {
  fixedLine: {
    color: '#A00'
  }
};

function debugevent(e) {
  console.debug(e.type, e, polylineMeasure._currentLine)
}

mymap.on('polylinemeasure:toggle', debugevent);
mymap.on('polylinemeasure:start', debugevent);
mymap.on('polylinemeasure:resume', debugevent);
mymap.on('polylinemeasure:finish', debugevent);
mymap.on('polylinemeasure:clear', debugevent);
mymap.on('polylinemeasure:add', debugevent);
mymap.on('polylinemeasure:insert', debugevent);
mymap.on('polylinemeasure:move', debugevent);
mymap.on('polylinemeasure:remove', debugevent);

function addCircle(lat, lon, radiusOfCircle = 5000) {
  var circle = L.circle([lat, lon], {
    color: '#A00',
    stroke: 1,
    fillColor: '#111',
    fillOpacity: 0.4,
    radius: radiusOfCircle
  }).addTo(mymap);
}

var html = "AirCraft Selection Page";

var resizabletopright = new L.ResizableControl({
  position: 'topright',
  minimizedHeight: 30,
  minimizedWidth: 0.05,
  enlargedHeight: 0.5,
  enlargedWidth: 0.1945,
  enlargeCallback: function(e) {},
  minimizeCallback: function(e) {},
  contentClassName: "resizable-control-content",
  scrollPaneClassName: "resizable-control-scrollpane",
  className: "resizable-control-container",
  jscrollpane: true,
  appendOnAdd: function(divElement) {}
});
mymap.addControl(resizabletopright);
resizabletopright.setContent(html);

$.getJSON('wind_demo.json', function(data) {
  var velocityLayer = L.velocityLayer({
    displayValues: true,
    displayOptions: {
      velocityType: 'Global Wind',
      displayPosition: 'bottomleft',
      displayEmptyString: 'No wind data',
      speedUnit: 'nm',
    },
    data: data,
    maxVelocity: 18,
    minVelocity: 0,
  });
  layerControl.addOverlay(velocityLayer, 'Wind - Global');
});

$.getJSON('wind-2020-jan-13.json', function(data) {
  var velocityLayer = L.velocityLayer({
    displayValues: true,
    displayOptions: {
      velocityType: 'Global Wind',
      displayPosition: 'bottomleft',
      displayEmptyString: 'No wind data',
      speedUnit: 'nm',
    },
    data: data,
    maxVelocity: 18,
    minVelocity: 0,
  });
  layerControl.addOverlay(velocityLayer, 'Wind - Global - Recent');
});

// addCircle(22, 77, 500000);

var inputButton = document.getElementById('inputButton');

function inititateInput() {
  var startCourseLong = document.getElementById("icon_start_x").value;
  var startCourseLat = document.getElementById("icon_start_y").value;

  var endCourseLong = document.getElementById("icon_destination_x").value;
  var endCourseLat = document.getElementById("icon_destination_y").value;

  var lastKnownLong = document.getElementById("icon_lkp_x").value;
  var lastKnownLat = document.getElementById("icon_lkp_y").value;

  var corner1 = L.latLng(startCourseLat, startCourseLong);
  var corner2 = L.latLng(endCourseLat, endCourseLong);

  var bounds = L.latLngBounds(corner1, corner2);
  var lkpPopUp, startPopUp, endPopUp;

  var flightLandIcon = L.icon({
    iconUrl: 'img/flight_land.png',

    iconSize: [25, 25], // size of the icon
    iconAnchor: [10, 30],
    popupAnchor: [0, -30]
  });
  var flightTakeOffIcon = L.icon({
    iconUrl: 'img/flight_takeoff.png',

    iconSize: [25, 25], // size of the icon
    iconAnchor: [10, 30],
    popupAnchor: [0, -30]
  });

  mymap.flyTo([startCourseLong, startCourseLat], 5);
  addCircle(startCourseLong, startCourseLat, 5000);
  startPopUp = L.marker([startCourseLong, startCourseLat], {
    icon: flightTakeOffIcon
  }).addTo(mymap).bindPopup("Take off location");

  setTimeout(() => {
    mymap.flyTo([endCourseLong, endCourseLat], 5);
    addCircle(endCourseLong, endCourseLat, 5000);
    endPopUp = L.marker([endCourseLong, endCourseLat], {
      icon: flightLandIcon
    }).addTo(mymap).bindPopup("Landing location");
  }, 2000);

  setTimeout(() => {
    mymap.fitBounds(bounds);
    mymap.zoomOut();
  }, 4000);

  setTimeout(() => {
    mymap.zoomOut();
  }, 4500);

  setTimeout(() => {
    mymap.zoomOut();
  }, 5000);

  setTimeout(() => {
    mymap.flyTo([lastKnownLong, lastKnownLat], 5);
  }, 6000);

  setTimeout(() => {
    lkpPopUp = L.marker([lastKnownLong, lastKnownLat]).addTo(mymap).bindPopup("Last known Position.");
    mymap.zoomIn();
  }, 7500);
  setTimeout(() => {
    mymap.zoomIn();
  }, 8000);
  setTimeout(() => {
    mymap.zoomIn();
    addCircle(lastKnownLong, lastKnownLat, 500);
  }, 8500);

  setTimeout(() => {
    lkpPopUp.openPopup();
  }, 9000);

  setTimeout(() => {
    mymap.flyTo([lastKnownLong, lastKnownLat], 3);
  }, 10000);

}
