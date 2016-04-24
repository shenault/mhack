/**
 * Event manager Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('AddEventController', [
			'$firebaseArray',
			'$scope',
			'$rootScope',
			'$mdSidenav',
			'ENV',
            'GoogleUtils',
			'$translate',
			function($firebaseArray, $scope, $rootScope, $mdSidenav,ENV, GoogleUtils, $translate) {
				$scope.close = function(inSaving) {
					$mdSidenav('addEventSideNav').close();
					$scope.editMode = false;
					if (!inSaving)
						$scope.flushData();
				};

				$scope.confirm = function() {
					$scope.event.reportCount++;
					$scope.events.$save($scope.event);
					$scope.close();
				};

				$scope.resolve = function() {
					$scope.events.$remove($scope.event);
					$scope.close();
				};

				$scope.save = function() {
					$scope.getLocation();
					$scope.uploadFile($scope.saveCallback);
					$scope.close(true);
				};

				$scope.saveCallback = function() {
					if (!$scope.createdDate) $scope.createdDate = new Date();
					if (!$scope.event.type) $scope.event.type = null;
					if (!$scope.event.description) $scope.event.description = null;
					var picture = $scope.refPicture.push($scope.picture);
					$scope.events.$add({picture: picture.key(),
						lat: $scope.getLat(),
						lng: $scope.getLng(),
						createdDate: $scope.createdDate,
						type: $scope.event.type,
						description: $scope.event.description,
						reportCount: 1
					});
					$scope.flushData();
				};

				$scope.setupScope = function() {
					$scope.editMode = false;
					$scope.flushData();
					$scope.getLocation();
				};

				$scope.flushData = function() {
					$scope.createdDate = null;
					$scope.event = null;
					$scope.file = null;
					$scope.picture = null;
					$scope.latGpsRef = null;
					$scope.latGps = null;
					$scope.lngGpsRef = null;
					$scope.lngGps = null;
					$scope.lat = null;
					$scope.lng = null;
				};

				$scope.updateLocationName = function() {
					var locationName = GoogleUtils.geocodeLatLng($scope.lat, $scope.lng, $scope.locationName);
				};

				$scope.uploadFile = function(callback) {
					if ($scope.file) {
						EXIF.getData($scope.file, function() {
							$scope.picture = null;
							$scope.latGpsRef = EXIF.getTag(this, "GPSLatitudeRef");
							$scope.latGps = EXIF.getTag(this, "GPSLatitude");
							$scope.lngGpsRef = EXIF.getTag(this, "GPSLongitudeRef");
							$scope.lngGps = EXIF.getTag(this, "GPSLongitude");
							$scope.createdDate = EXIF.getTag(this, "DateTime");
							$scope.picture = $scope.compressImage();
							callback();
						});
					} else {
						callback();
					}
				};

				$scope.compressImage = function() {
					var canvas = document.createElement('canvas');
					var context = canvas.getContext('2d');

					canvas.height = 280;
					canvas.width = 280;

					context.drawImage(document.getElementById('thumbImage'), 0, 0, 280, 280);
					return	canvas.toDataURL("image/jpeg");
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

					$scope.updateLocationName();
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
					if ($scope.file) {
						EXIF.getData($scope.file, function() {
							$scope.latGpsRef = EXIF.getTag(this, "GPSLatitudeRef");
							$scope.latGps = EXIF.getTag(this, "GPSLatitude");
							$scope.lngGpsRef = EXIF.getTag(this, "GPSLongitudeRef");
							$scope.lngGps = EXIF.getTag(this, "GPSLongitude");
						});
					}

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

				/**
				 * SUBSCRIBERS
				 */
				$scope.$on('edit', function (event, arg) {
					$scope.event = arg;

					$scope.refPicture.child(arg.picture).on("value", function (snapshot) {
						$scope.file = snapshot.val();
					});

					$scope.editMode = true;
				});

                $scope.$on('addEvent', function (event, arg) {
					$scope.event.type = $scope.typeList[0];
                });

				$scope.$on('reverseGeocode', function (event, data) {
					$scope.locationName = data.locationName;
				});
			}]);
})(angular);
