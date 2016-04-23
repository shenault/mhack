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
				$scope.setupScope = function() {
					$scope.label = "Group manager";
				};
				$scope.getItemListNearMe = function(){
					GoogleUtils.getItemListNearMe( 45.411 , -71.887 , 100);
				}
				$scope.setupScope();
			}]);
})(angular);
