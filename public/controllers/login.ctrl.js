/**
 * Login Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('LoginController', [
			'$auth',
			'$rootScope',
			'$scope',
			'$state',
			function($auth, $rootScope, $scope, $state) {
				$scope.authenticate = function(provider) {
					$auth.authenticate(provider).then(function(accessToken) {
						$state.go('eventReporter');
					})
				};
			}]);
})(angular);
