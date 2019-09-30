
//Data Set: Significant earthquakes for the past 30 days 
var jsonUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

d3.json(jsonUrl, function(data) {
    createFeatures(data.features);
}); 

function createFeatures(earthquakeData) {
    //conduct on each feature
    function onEachFeature(feature, layer) {

        //Pop up message
        layer.bindPopup("<h3>Location: " + feature.properties.place +
          "</h3><hr><p>Magnitude:" + feature.properties.mag + "</p>");

        var magData = [];
        for (var i = 0; i < earthquakeData.length; i++) {
            console.log("loop",feature.properties.mag);
            magData.push(feature.properties.mag);

        };

        console.log("magData",magData);

    }// onEachFeature ending 

    //GeoJSON structure to host features array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    
    }) ;// GeoJSON earthquakes ending


    var geojsonMarkerOptions = {
        radius:12,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    var earthquakeCircles = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    });

    createMap(earthquakes,earthquakeCircles);


} //createFeatures ending 

//-----------------------------------------//
//Map Code 

function createMap(earthquakes, earthquakeCircles) {
  

    // Map Layer
    var basicLayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets-basic",
        accessToken: API_KEY
    })//.addTo(myMap);


    //Base Map - Layer holder 
    var baseMap = {
        "Base Map": basicLayer
    };

    //Overlay Object - hold overlay layer 
    var overlayMap = {
        Earthquakes: earthquakes
    };

      //Map Object
      var myMap = L.map("map", {
        center: [15.5994, -28.6731],
        zoom: 3,
        layers: [basicLayer, earthquakes]
    });

    L.control.layers(baseMap, overlayMap, {
        collapsed: false
      }).addTo(myMap);
    

    //Circle Markers addition to map
    earthquakeCircles.addTo(myMap);
   
    
} //createMap ending



//----------------------------------------------------//
//Research - Testing 
    // //NE Sample: display a circle - not on GeoJSON guide 
    // var circle = L.circle([51.508, -0.11], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 500
    // }).addTo(myMap);






