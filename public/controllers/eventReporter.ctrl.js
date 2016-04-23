/**
 * Event reporter Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('EventReporterController', [
			'$scope',
			function($scope) {
				$scope.setupScope = function() {
					$scope.label = "Event reporter";
				};

				$scope.setupScope();
			}]);
})(angular);
