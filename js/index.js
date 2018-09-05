//var myPolygon;
function initialize() {
    var city = "pit";
    var centers = {
        "phx": new google.maps.LatLng(33.44505, -112.07248),
        "sfo": new google.maps.LatLng(37.7561733, -122.4059897),
        "pit": new google.maps.LatLng(40.4488167,-80.0576302)
    }
    // Visualize AVMM coverage here
    // https://code.int.uberatc.com/w/teams/mlp/map_releases/pit/v2018.073.0/
    var paths = {
        "phx": [
            new google.maps.LatLng(33.54941, -111.8543), new google.maps.LatLng(33.54462, -112.00107),
            new google.maps.LatLng(33.53739, -112.1087), new google.maps.LatLng(33.43145, -112.10647),
            new google.maps.LatLng(33.26819, -111.98656), new google.maps.LatLng(33.28965, -111.87181),
        ],
        "sfo": [
            new google.maps.LatLng(37.82319, -122.38367),
            new google.maps.LatLng(37.64494, -122.3629),
            new google.maps.LatLng(37.65031, -122.50906),
            new google.maps.LatLng(37.81207, -122.52716)
        ],
        "pit": [
            new google.maps.LatLng(40.41409,-79.99789), new google.maps.LatLng(40.45483,-80.06036),
            new google.maps.LatLng(40.51542,-79.8963), new google.maps.LatLng(40.44851,-79.86865),
            new google.maps.LatLng(40.3729,-79.92787)
        ]
    }
    // Map Center
    var myLatLng = centers[city]

    // General Options
    var mapOptions = {
        zoom: 12,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.RoadMap
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    // Polygon Coordinates
    var triangleCoords = paths[city];
    // Styling & Controls
    myPolygon = new google.maps.Polygon({
        paths: triangleCoords,
        draggable: true, // turn off if it gets annoying
        editable: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });

    myPolygon.setMap(map);
    //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
    google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
    //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
    google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);
}

//Display Coordinates below map
function getPolygonCoords() {
    var len = myPolygon.getPath().getLength();
    var htmlStr = "POLYGON((";
    var standardStr = "";
    for (var i = 0; i < len; i++) {
        htmlStr += myPolygon.getPath().getAt(i).lng() + " " + myPolygon.getPath().getAt(i).lat() + ", ";
        standardStr += "new google.maps.LatLng(" + myPolygon.getPath().getAt(i).toUrlValue(5) + "), ";
    }
    htmlStr += "))"
    document.getElementById('info').innerHTML = htmlStr + " " + standardStr;
}

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}