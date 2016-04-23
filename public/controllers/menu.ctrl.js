/**
 * Menu Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('MenuController', [
			'$auth',
			'$scope',
			'$state',
			function($auth, $scope, $state) {
				$scope.authenticate = function(provider) {
					$auth.authenticate(provider).then(function(boo) {
						console.log(boo);
					})
				};

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
