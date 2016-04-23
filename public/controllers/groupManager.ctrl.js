/**
 * Group manager Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('GroupManagerController', [
			'$scope',
			function($scope) {
				$scope.setupScope = function() {
					$scope.label = "Group manager";
				};

				$scope.setupScope();
			}]);
})(angular);
