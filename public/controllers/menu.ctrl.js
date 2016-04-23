/**
 * Menu Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('MenuController', [
			'$scope',
			function($scope) {
				$scope.setupScope = function() {
					$scope.menuOpened = false;
				};

				$scope.toggleMenu = function() {
					$scope.menuOpened = !$scope.menuOpened;
				}

				$scope.setupScope();
			}]);
})(angular);