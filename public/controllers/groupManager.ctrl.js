/**
 * Group manager Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('GroupManagerController', [
            '$firebaseArray',
            '$scope',
			'GoogleUtils',
			function($firebaseArray,$scope,GoogleUtils) {
				$scope.getItemListNearMe = function() {
					GoogleUtils.getItemListNearMe( 45.411 , -71.887 , 100);
				};
				
				$scope.isInPolygon = function() {
					var polygon = new google.maps.Polygon({
						paths: [
							new google.maps.LatLng(25.774, -80.190),
							new google.maps.LatLng(18.466, -66.118),
							new google.maps.LatLng(32.321, -64.757)
						]
					});
					GoogleUtils.isInPolygon(24.886, -70.269, polygon);
					GoogleUtils.isInPolygon(0, 0, polygon);
				};
				
				$scope.setupScope = function() {
					$scope.label = "Group manager";
				};

				$scope.setupScope();
			}]);
})(angular);
