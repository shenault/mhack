/**
 * Event manager Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('EventManagerController', [
			'$scope',
			'user',
			function($scope, user) {
				console.log(user);

				$scope.setupScope = function() {
					$scope.label = "Event manager";
				};

				$scope.setupScope();
			}]);
})(angular);
