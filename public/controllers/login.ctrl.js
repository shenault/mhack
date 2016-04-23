/**
 * Login Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('LoginController', [
			'$auth',
			'$http',
			'$rootScope',
			'$scope',
			'$state',
			function($auth, $http, $rootScope, $scope, $state) {
				$scope.authenticate = function(provider) {
					$auth.authenticate(provider).then(function(accessToken) {
						$state.go('eventReporter');
						$http({
							method: 'GET',
							url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + accessToken
						}).then(function successCallback(response) {
							$rootScope.$broadcast('profile:refresh', response.data);
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});

					})
				};
			}]);
})(angular);
