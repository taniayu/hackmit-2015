var map;
var service;
var infowindow;

var cambridge;

var g_targetLat = "1";
var g_targetLng = "2";

function initialize() {
	cambridge = {lat:42.371352, lng:-71.111193};
 	map = new google.maps.Map(document.getElementById('map'), {
    	center: cambridge,
    	zoom: 15
    });

    //infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
}

function makeRequest(placeName) {
	console.log(placeName);
	var request = {
 		query: placeName
 	};
 	service.textSearch(request, callback);
}

function callback(results, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		var place = results[0];
		g_targetLat = place.geometry.location.lat();
		g_targetLng = place.geometry.location.lng();
		console.log(g_targetLat + "," + g_targetLng);
	}
}
