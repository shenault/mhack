/**
 * Image Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('ImageUploadController', [
			'$firebaseArray','$scope', '$timeout', 'Upload',
			function($firebaseArray, $scope, $timeout, Upload) {

				$scope.setupScope = function() {
					var ref = new Firebase("https://mhack-gaubey.firebaseio.com/item");
					$scope.images = $firebaseArray(ref);
				};

				$scope.uploadFile = function(file, errFile) {
					$scope.file = file;
					$scope.errFile = errFile;

					if (file) {
						EXIF.getData($scope.file, function() {
							var latitudeRef = EXIF.getTag(this, "GPSLatitudeRef");
							var latitude = EXIF.getTag(this, "GPSLatitude");
							var longitudeRef = EXIF.getTag(this, "GPSLongitudeRef");
							var longitude = EXIF.getTag(this, "GPSLongitude");
							var createdDate = EXIF.getTag(this, "DateTime");

							var reader = new FileReader();
							reader.onload = function(theFile) {
								$scope.images.$add({picture: theFile.target.result,
									lat: $scope.getGPSDecimal(latitude, latitudeRef),
									lng: $scope.getGPSDecimal(longitude, longitudeRef),
									createdDate: createdDate});
							};

							reader.readAsDataURL(file);
						});
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
			}]);
})(angular);