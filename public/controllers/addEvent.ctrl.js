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
			function($firebaseArray, $scope, $rootScope, $mdSidenav, ENV, GoogleUtils, $translate) {

				$scope.imageLocation = {};
				$scope.gpsLocation = {};

				$scope.initImageLocation = function() {
					if ($scope.file) {
						var latGpsRef, latGps, lngGpsRef, lngGps;

						EXIF.getData($scope.file, function() {
							latGpsRef = EXIF.getTag(this, "GPSLatitudeRef");
							latGps = EXIF.getTag(this, "GPSLatitude");
							lngGpsRef = EXIF.getTag(this, "GPSLongitudeRef");
							lngGps = EXIF.getTag(this, "GPSLongitude");
							$scope.imageLocation.lat = $scope.getGPSDecimal(latGps, latGpsRef);
							$scope.imageLocation.lng = $scope.getGPSDecimal(lngGps, lngGpsRef);
							$scope.updateLocationName();
						});
					}
				};

				$scope.initGpsLocation = function() {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition($scope.setGpsPosition, $scope.showError);
					}
					else {
						$scope.error = "Geolocation is not supported by this browser.";
						$scope.gpsLocation.lat = null;
						$scope.gpsLocation.lng = null;
					}
				};

				$scope.showError = function(error) {
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
					$scope.gpsLocation.lat = null;
					$scope.gpsLocation.lng = null;
					$scope.$apply();
				};

				$scope.setGpsPosition = function(position) {
					$scope.gpsLocation.lat = position.coords.latitude;
					$scope.gpsLocation.lng = position.coords.longitude;
					$scope.updateLocationName();
				};

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
					$scope.initGpsLocation();
					$scope.uploadFile($scope.saveCallback);
					$scope.close(true);
				};

				$scope.saveCallback = function() {
					if (!$scope.createdDate) $scope.createdDate = new Date();
					if (!$scope.event.type) $scope.event.type = null;
					if (!$scope.event.description) $scope.event.description = null;
					var picture = $scope.refPicture.push($scope.picture);
					$scope.events.$add({
						picture: picture.key(),
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
					$scope.initGpsLocation();
					$scope.initImageLocation();
				};

				$scope.flushData = function() {
					$scope.createdDate = null;
					$scope.event = null;
					$scope.file = null;
					$scope.picture = null;
					$scope.imageLocation = {};
					$scope.gpsLocation = {};
					$scope.locationName = null;
				};

				$scope.updateLocationName = function() {
					var locationName = GoogleUtils.geocodeLatLng($scope.getLat(), $scope.getLng(), $scope.locationName);
				};

				$scope.uploadFile = function(callback) {
					if ($scope.file) {
						$scope.initImageLocation();
						EXIF.getData($scope.file, function() {
							$scope.picture = null;
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

					var width = document.getElementById('thumbImage').width;
					var height = document.getElementById('thumbImage').height;

					var finalWidth, finalHeight;

					if (width > height) {
						finalWidth = ENV.imgMaxSize;
						finalHeight = height / width * finalWidth
					} else {
						finalHeight = ENV.imgMaxSize;
						finalWidth = width / height * finalHeight;
					}

					canvas.width = finalWidth;
					canvas.height = finalHeight;

					context.drawImage(thumbImage, 0, 0, finalWidth, finalHeight);
					return canvas.toDataURL("image/jpeg");
				};

				$scope.getLat = function() {
					if ($scope.imageLocation.lat != null) {
						return $scope.imageLocation.lat;
					} else if ($scope.gpsLocation.lat != null) {
						return $scope.gpsLocation.lat;
					} else {
						return null;
					}
				};

				$scope.getLng = function() {
					if ($scope.imageLocation.lng != null) {
						return $scope.imageLocation.lng;
					} else if ($scope.gpsLocation.lng != null) {
						return $scope.gpsLocation.lng;
					} else {
						return null;
					}
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

				$scope.setupScope();

				/**
				 * SUBSCRIBERS
				 */
				$scope.$on('edit', function(event, arg) {
					$scope.event = arg;

					$scope.refPicture.child(arg.picture).on("value", function(snapshot) {
						$scope.file = snapshot.val();
					});

					$scope.initGpsLocation();
					$scope.initImageLocation();
					$scope.editMode = true;
				});

				$scope.$on('addEvent', function(event, arg) {
					$scope.flushData();
					$scope.event = {type: $scope.typeList[0]};
					$scope.initGpsLocation();
					$scope.initImageLocation();
				});

				$scope.$on('reverseGeocode', function(event, data) {
					$scope.locationName = data.locationName;
				});
			}]);
})(angular);
