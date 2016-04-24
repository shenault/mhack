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
			'$q',
			'$window',
			'$mdSidenav',
			function($auth, $scope, $state, $q, $window, $mdSidenav) {
				$scope.goToState = function(state) {
					$scope.state = state;
					$state.go(state);
					$scope.menuOpened = false;
				};

				$scope.setupScope = function() {
					$scope.state = 'eventReporter';
					$scope.menuOpened = false;
					$scope.isOpened = false;
				};

				$scope.toggleSideNav = function(menuId) {
					$mdSidenav(menuId).toggle();
				};

				angular.element($window).bind('resize', function() {
					setTimeout(function(){
						if((window.innerHeight <= 700)  && ($window.innerWidth / $window.innerHeight) > 1) {
							$scope.direction ="right";
						} else {
							$scope.direction = "up";
						}
						$scope.$digest();
					},100)
				});


				$scope.setupScope();
			}]);
})(angular);
