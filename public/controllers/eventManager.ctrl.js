/**
 * Event manager Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('EventManagerController', [
			'$scope',
			function($scope) {
				$scope.setupScope = function() {
					$scope.label = "Event manager";
				};

				$scope.setupScope();
			}]);
})(angular);
