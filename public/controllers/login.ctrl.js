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
			'$firebaseAuth',
			'ENV',
			function($auth, $rootScope, $scope, $state, $firebaseAuth, ENV) {
				$scope.authenticate = function(provider) {
					var ref = new Firebase(ENV.dbHost);
					var auth = $firebaseAuth(ref);
					auth.$authWithOAuthPopup("google", {
						remember: "sessionOnly",
						scope: "email"
					}).then(function(){
						$state.go('eventReporter');
					});
				};
			}]);
})(angular);
