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
					GoogleUtils.getItemListNearMe( -71.920 , 45.385);
				};
				
				$scope.setupScope = function() {
					$scope.label = "Group manager";
				};
				
				$scope.setupScope();
			}]);
})(angular);
