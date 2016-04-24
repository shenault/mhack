/**
 * Menu Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('KmlController', [
			'$scope',
			'$window',
			function($scope, $window) {
				$scope.setupScope = function() {
					$scope.isOpened = false;
				};

				$scope.toggleMenu = function() {
					$scope.menuOpened = !$scope.menuOpened;
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
