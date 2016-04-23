/**
 * Event manager Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('AddEventController', [
			'$scope',
			'$mdSidenav',
			function($scope, $mdSidenav) {
				$scope.close = function() {
					$mdSidenav('addEventSideNav').close();
				};

				$scope.setupScope = function() {
				};

				$scope.setupScope();
			}]);
})(angular);
