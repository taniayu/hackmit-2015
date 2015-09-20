var app = angular.module('MyApp', ['ngMaterial']);

$(document).ready(function() {
	$('#datepicker_start').datepicker();
	$('#datepicker_end').datepicker();
});

app.controller('AppCtrl', function($scope) {
	// Hide map permanently
	$scope.show_map = false;

	// Default values
	// Uploading images
	$scope.image = {
		url: ''
	}
	$scope.show_image_form = true;
	$scope.show_uploated_image = false;
	$scope.show_image_location = false;
	$scope.show_trip_form = false;
	$scope.show_canvas = false;
	$scope.image_src = "";
	// Travel details form
	$scope.trip = {};
	$scope.trip.origin = '';
	$scope.trip.date_start = 'MM/DD/YYYY';
	$scope.trip.date_end = 'MM/DD/YYYY'; // last possible start date
	$scope.trip.duration = 0;
	// $scope.location_label = "Loading...";


	// Upload image
	$scope.uploadImage = function() {
		$scope.image_src = $scope.image.url;
		$scope.show_image_form = false;
		$scope.show_uploaded_image = true;
	}

	// Show travel details form
	$scope.showDetailsForm = function() {
		$scope.show_image_location = false;
		$scope.show_trip_form = true;
	}

	// Send image to Clarifai
	$scope.sendImage = function() {
		$scope.show_uploaded_image = false;
		$scope.show_image_location = true;
		// return;
		console.log('Send Image Requested...');
		makePrediction($scope.image_src);
		// Wait for results
		function repeat() {
			if(! RETURN_TO_APP) {
				setTimeout(repeat, 500);
			}
			else {
				$scope.location = {'name': location_name, 'lat': g_targetLat, 'lng': g_targetLng}
				// $scope.location_label = $scope.location.name

				var str = $scope.location.name;
				str = str.replace(/_/g, ' ');
    			str = str.replace(/\w\S*/g, function(txt) {
    				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    			});
				// $scope.location_label = str;
				$("#location_name_label").text(str);
				
			}
		}

		repeat();
	}

	// Get travel info
	$scope.getTravelInfo = function() {
		$scope.show_trip_form = false;
		$scope.show_canvas = true;
		console.log($scope.trip.origin);
		console.log($scope.trip.duration);
		$scope.trip.date_start = $('#datepicker_start').val();
		$scope.trip.date_end = $('#datepicker_end').val();
		console.log($scope.trip.date_start);
		console.log($scope.trip.date_end);

		var paramsObjectTemp = {
		  		'origin': 'BOS',
		  		'longitude':36.1,
		  		'latitude':-115.2,
		  		'departure_date': '2016-01-16--2016-01-26',
		  		'duration': 15,
		  	}

		function getFormattedDepartureDate() {
			var start_list = ($scope.trip.date_start).split('/');
			var end_list = ($scope.trip.date_end).split('/');
			return start_list[2] + '-' + start_list[0] + '-' + start_list[1] + '--' + end_list[2] + '-' + end_list[0] + '-' + end_list[1];
		}

		$scope.paramsObject = {
			'origin': ($scope.trip.origin).toUpperCase(),
			'longitude': $scope.location.lng,
			'latitude': $scope.location.lat,
			'departure_date': getFormattedDepartureDate(),
			'duration': $scope.trip.duration

		}
		beginTravelSearch($scope.paramsObject);
	}

	// Reset image upload form
	$scope.reset = function() {
		$scope.image.url = '';
		$scope.image_src = '';
		// Reset src of image (it doesn't get cleared automatically)
		$('#image').attr('src', '');
		$scope.show_image_form = true;
		$scope.show_uploaded_image = false;
		$scope.show_image_location = false;
		$scope.show_trip_form = false;
		$scope.show_canvas = false	;
		$scope.trip.origin = '';
		$scope.trip.date_start = 'MM/DD/YYYY';
		$scope.trip.date_end = 'MM/DD/YYYY'; // last possible start date
		$scope.trip.duration = 0;
		// $scope.location_label = "Loading...";
	}




});