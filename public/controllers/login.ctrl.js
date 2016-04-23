/**
 * Login Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('LoginController', [
			'$auth',
			'$http',
			'$scope',
			'$state',
			function($auth, $http, $scope, $state) {
				$scope.authenticate = function(provider) {
					$auth.authenticate(provider).then(function(accessToken) {
						$http({
							method: 'GET',
							url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + accessToken
						}).then(function successCallback(response) {
							console.log(response);
						}, function errorCallback(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
						});
						$state.go('eventReporter');
					})
				};
			}]);
})(angular);
