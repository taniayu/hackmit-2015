var app = angular.module('MyApp', ['ngMaterial']);

app.controller('AppCtrl', function($scope) {
	// Hide map permanently
	$scope.show_map = false;

	// Default values
	// Uploading images
	$scope.image = {
		url: ''
	}
	$scope.show_image_form = true;
	$scope.show_image = false;
	$scope.image_src = "";
	// Travel details form
	$scope.origin = '';
	$scope.date_start = null;
	$scope.date_end = null;
	$scope.duration = 0;

	// Upload image
	$scope.uploadImage = function() {
		$scope.image_src = $scope.image.url;
		$scope.show_image_form = false;
		$scope.show_image = true;
	}

	// Show travel details form
	$scope.showDetailsForm = function() {
		
	}

	$scope.callback = function() {
		console.log('--------');
	}

	// Send image to Clarifai
	$scope.sendImage = function() {
		console.log('Send Image Requested...')
		makePrediction($scope.image_src);
		$scope.callback()
	}

	// Reset image upload form
	$scope.reset = function() {
		$scope.image.url = '';
		$scope.image_src = '';
		// Reset src of image (it doesn't get cleared automatically)
		$('#image').attr('src', '');
		$scope.show_image_form = true;
		$scope.show_image = false;
	}




});