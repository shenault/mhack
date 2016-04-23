/**
 * Menu Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('MenuController', [
			'$scope',
			'$state',
			function($scope, $state) {
				$scope.goToState = function(state) {
					$scope.state = state;
					$state.go(state);
					$scope.menuOpened = false;
				};

				$scope.setupScope = function() {
					$scope.state = 'eventReporter';
					$scope.menuOpened = false;
				};

				$scope.toggleMenu = function() {
					$scope.menuOpened = !$scope.menuOpened;
				};

				$scope.setupScope();
			}]);
})(angular);