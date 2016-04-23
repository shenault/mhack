/**
 * Login Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('LoginController', [
			'$auth',
			'$scope',
			'$state',
			function($auth, $scope, $state) {
				$scope.authenticate = function(provider) {
					$auth.authenticate(provider).then(function(accessToken) {
						$state.go('eventReporter');
					})
				};
			}]);
})(angular);
