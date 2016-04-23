/**
 * Event reporter Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('EventReporterController', [
			'$scope',
			function($scope) {
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
