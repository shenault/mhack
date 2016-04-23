/**
 * Event manager Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('AddEventController', [
			'$firebaseArray',
			'$scope',
			'$mdSidenav',
			function($firebaseArray, $scope, $mdSidenav) {
				$scope.close = function() {
					$mdSidenav('addEventSideNav').close();
				};

				$scope.save = function() {
					$scope.close();
				}

				$scope.setupScope = function() {
					var ref = new Firebase("https://mhack-gaubey.firebaseio.com/item");
					$scope.images = $firebaseArray(ref);
				};

				$scope.uploadFile = function(file, errFile) {
					$scope.file = file;
					$scope.errFile = errFile;

					if (file) {
						EXIF.getData($scope.file, function() {
							$scope.getLocation();
							$scope.latGpsRef = EXIF.getTag(this, "GPSLatitudeRef");
							$scope.latGps = EXIF.getTag(this, "GPSLatitude");
							$scope.lngGpsRef = EXIF.getTag(this, "GPSLongitudeRef");
							$scope.lngGps = EXIF.getTag(this, "GPSLongitude");
							var createdDate = EXIF.getTag(this, "DateTime");
							if (!createdDate) createdDate = new Date();

							var reader = new FileReader();
							reader.onload = function(theFile) {
								$scope.images.$add({picture: theFile.target.result,
									lat: $scope.getLat(),
									lng: $scope.getLng(),
									createdDate: createdDate});
							};

							reader.readAsDataURL(file);
						});
					}
				};

				$scope.getLat = function() {
					$scope.latGps = $scope.getGPSDecimal($scope.latGps, $scope.latGpsRef);
					if ($scope.latGps) $scope.lat = $scope.latGps;
					return $scope.lat;
				};

				$scope.getLng = function() {
					$scope.lngGps = $scope.getGPSDecimal($scope.lngGps, $scope.lngGpsRef);
					if ($scope.lngGps) $scope.lng = $scope.lngGps;
					return $scope.lng;
				};

				$scope.getGPSDecimal = function(coordinate, ref) {
					if (coordinate) {
						var decimal = 0;
						var multiplier = 1;
						if (ref == "S" || ref == "W")  multiplier = -1;
						decimal = coordinate[1] + (coordinate[2] / 60);
						decimal = multiplier * (coordinate[0] + (decimal / 60));
						return decimal;
					} else {
						return null;
					}
				};

				$scope.setPosition = function (position) {
					$scope.lat = position.coords.latitude;
					$scope.lng = position.coords.longitude;
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
					$scope.lat = null;
					$scope.lng = null;
					$scope.$apply();
				};

				$scope.getLocation = function () {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition($scope.setPosition, $scope.showError);
					}
					else {
						$scope.error = "Geolocation is not supported by this browser.";
						$scope.lat = null;
						$scope.lng = null;
					}
				};

				$scope.setupScope();
			}]);
})(angular);
