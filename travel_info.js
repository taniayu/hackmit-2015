var datePriceObject = {'flight': [], 'hotel': [], 'car': []};
var paramsObjectTemp = {
	'origin': 'BOS',
	'longitude':36.1,
	'latitude':-115.2,
	'departure_date': '2016-01-16--2016-01-26',
	'duration': 15,
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function getAirportApiUrl(lat, long) {
	return "https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=5j79n1Agb8wGntymMrKyiPAsniLqpnub&latitude=" + lat + "&longitude=" + long;
}

// TODO: Only returns one flight per date?
function getFlightApiUrl(origin, destination, departure_date, duration) {
	return "https://api.sandbox.amadeus.com/v1.2/flights/extensive-search?apikey=5j79n1Agb8wGntymMrKyiPAsniLqpnub&origin=" + origin + "&destination=" + destination + "&departure_date=" + departure_date + "&duration=" + duration;
}

function getHotelApiUrl(destination, check_in_date, check_out_date) {
	return "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=5j79n1Agb8wGntymMrKyiPAsniLqpnub&location=" + destination + "&check_in=" + check_in_date + "&check_out=" + check_out_date + "&number_of_results=1&show_sold_out=false";
}

function getCarApiUrl(location, pick_up, drop_off) {
	return "https://api.sandbox.amadeus.com/v1.2/cars/search-airport?apikey=5j79n1Agb8wGntymMrKyiPAsniLqpnub&location=" + location + "&pick_up=" + pick_up + "&drop_off=" + drop_off;
}

function hotelCallbackFunction(response) {
	var obj = jQuery.parseJSON(response);
	if (obj.length == 0) {
		console.log("Sorry, no hotels found.");
		return;
	}
	var hotel = obj.results[0];
	var checkInIndex = hotel._links.more_rooms_at_this_hotel.href.indexOf("check_in=");
	var startDate = hotel._links.more_rooms_at_this_hotel.href.substring(checkInIndex + 9, checkInIndex + 19);

	datePriceObject['hotel'].push({'price': hotel.total_price.amount, 'date': startDate});

	if (datePriceObject['hotel'].length == datePriceObject['flight'].length) {
		drawGraph(datePriceObject);
	}
}

function carCallbackFunction(response) {
	var obj = jQuery.parseJSON(response);
	if (obj.length == 0) {
		console.log("Sorry, no cars found.");
		return;
	}
	var price = obj.results[0].cars[0].estimated_total.amount; // TODO: Improve
	datePriceObject['car'].push({'price': price, 'date': extraParams});

	/*var hotel = obj.results[0];
	var checkInIndex = hotel._links.more_rooms_at_this_hotel.href.indexOf("check_in=");
	var startDate = hotel._links.more_rooms_at_this_hotel.href.substring(checkInIndex + 9, checkInIndex + 19);

	datePriceObject['hotel'].push({'price': hotel.total_price, 'date': startDate});
	console.log(datePriceObject);*/
}

function airportCallbackFunction(response, extraParams) {
	var obj = jQuery.parseJSON(response);
	if (obj.length == 0) {
		console.log("Sorry, no airports found.");
		return;
	}
	var airportObj = obj[0]; // Most relevant airport

	httpGetAsync(getFlightApiUrl(paramsObjectTemp.origin, airportObj.airport, paramsObjectTemp.departure_date, paramsObjectTemp.duration), flightCallbackFunction);

	var dateSplit = paramsObjectTemp.departure_date.split('--');
	var firstStartDate = dateSplit[0].split('-');
	var lastStartDate = dateSplit[1].split('-');

	var currentStartDate = new Date(firstStartDate[0], firstStartDate[1] - 1, firstStartDate[2]);
	var lastStartDate = new Date(lastStartDate[0], lastStartDate[1] - 1, lastStartDate[2]);
	lastStartDate.setDate(lastStartDate.getDate() + 1);
	while (currentStartDate.getDate() != lastStartDate.getDate()) {
		var endDate = new Date(currentStartDate.getFullYear(), currentStartDate.getMonth(), currentStartDate.getDate());
		endDate.setDate(endDate.getDate() + paramsObjectTemp.duration);

		endDate = dateToString(endDate);
		var startDate = dateToString(currentStartDate);
		httpGetAsync(getHotelApiUrl(airportObj.airport, startDate, endDate), hotelCallbackFunction);
		//httpGetAsync(getCarApiUrl(airportObj.airport, startDate, endDate), carCallbackFunction, startDate);
		currentStartDate.setDate(currentStartDate.getDate() + 1);
	}
}

function dateToString(date) {
	var dateString = date.getFullYear() + '-';
	var month = date.getMonth() + 1;
	if (month < 10) {
		dateString += "0";
	}
	dateString += month + "-";
	var day = date.getDate();
	if (day < 10) {
		dateString += "0";
	}
	dateString += day;
	return dateString;
}

function flightCallbackFunction(response) {
	var obj = jQuery.parseJSON(response);
	if (obj.length == 0) {
		console.log("Sorry, no flights found.");
		return;
	}
	$.each(obj.results, function(flightKey, flightValue) {
		datePriceObject['flight'].push({'price': flightValue.price, 'date': flightValue.departure_date});
	});
}



function beginTravelSearch(paramsObject) {
	httpGetAsync(getAirportApiUrl(paramsObject.longitude, paramsObject.latitude), airportCallbackFunction);	
}

