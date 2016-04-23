/**
 * Event reporter Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('EventReporterController', [
			'$scope',
			'$mdSidenav',
			function($scope, $mdSidenav) {


				$scope.toggleSidenav = function(menuId) {
					$mdSidenav(menuId).toggle();
				};

				/**
				 * https://snazzymaps.com/style/1/pale-dawn
				 * */
				$scope.styles = [
					{
						"featureType": "administrative",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "on"
							},
							{
								"lightness": 33
							}
						]
					},
					{
						"featureType": "landscape",
						"elementType": "all",
						"stylers": [
							{
								"color": "#f2e5d4"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#c5dac6"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "labels",
						"stylers": [
							{
								"visibility": "on"
							},
							{
								"lightness": 20
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "all",
						"stylers": [
							{
								"lightness": 20
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#c5c6c6"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#e4d7c6"
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#fbfaf7"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "on"
							},
							{
								"color": "#acbcc9"
							}
						]
					}
				];

				$scope.addEvent = function() {
					$mdSidenav('addEventSideNav').toggle();
				};

				$scope.setupScope = function() {
					$scope.label = "Event reporter";
				};

				$scope.setupScope();

				$scope.showPosition = function (position) {
					$scope.lat = position.coords.latitude;
					$scope.lng = position.coords.longitude;
					$scope.accuracy = position.coords.accuracy;
					$scope.$apply();
				};

				$scope.showError = function (error) {
					switch (error.code) {
						case error.PERMISSION_DENIED:
							$scope.error = "User denied the request for Geolocation.";
							break;
						case error.POSITION_UNAVAILABLE:
							$scope.error = "Location information is unavailable.";
							break;
						case error.TIMEOUT:
							$scope.error = "The request to get user location timed out.";
							break;
						case error.UNKNOWN_ERROR:
							$scope.error = "An unknown error occurred.";
							break;
					}
					$scope.$apply();
				};

				$scope.getLocation = function () {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
					}
					else {
						$scope.error = "Geolocation is not supported by this browser.";
					}
				};

				$scope.getLocation();
			}]);

})(angular);
