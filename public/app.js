(function(angular) {
	angular
		.module('collaboratio.app', [
			'firebase',
			'ngFileUpload',
			'ngMap',
			'ngMaterial',
			'pageslide-directive',
			'pascalprecht.translate',
			'satellizer',
			'ui.router',
			'google.utils',
			'user.svc'
		])

		.config(function($mdIconProvider) {
			$mdIconProvider
				.iconSet('action', 'assets/icons/svg-sprite-action.svg')
				.iconSet('alert', 'assets/icons/svg-sprite-alert.svg')
				.iconSet('av', 'assets/icons/svg-sprite-av.svg')
				.iconSet('communication', 'assets/icons/svg-sprite-communication.svg')
				.iconSet('content', 'assets/icons/svg-sprite-content.svg')
				.iconSet('device', 'assets/icons/svg-sprite-device.svg')
				.iconSet('editor', 'assets/icons/svg-sprite-editor.svg')
				.iconSet('file', 'assets/icons/svg-sprite-file.svg')
				.iconSet('hardware', 'assets/icons/svg-sprite-hardware.svg')
				.iconSet('image', 'assets/icons/svg-sprite-image.svg')
				.iconSet('maps', 'assets/icons/svg-sprite-maps.svg')
				.iconSet('navigation', 'assets/icons/svg-sprite-navigation.svg')
				.iconSet('notification', 'assets/icons/svg-sprite-notification.svg')
				.iconSet('places', 'assets/icons/svg-sprite-places.svg')
				.iconSet('social', 'assets/icons/svg-sprite-social.svg')
				.iconSet('toggle', 'assets/icons/svg-sprite-toggle.svg')
		})

		.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
			$urlRouterProvider.otherwise('/eventReporter');

			$stateProvider
				.state('login', {
					controller: "LoginController",
					url: "/login",
					resolve: {
						skipIfLoggedIn: skipIfLoggedIn
					},
					templateUrl: "templates/login.html"
				})
				.state('eventReporter', {
					controller: "EventReporterController",
					url: "/eventReporter",
					resolve: {
						loginRequired: loginRequired,
						user: ['UserService', function(UserService) {
							return UserService.resolveUser();
						}]
					},
					templateUrl: "templates/eventReporter.html"
				})
				.state('eventManager', {
					controller: "EventManagerController",
					url: "/eventManager",
					resolve: {
						loginRequired: loginRequired,
						user: ['UserService', function(UserService) {
							return UserService.resolveUser();
						}]
					},
					templateUrl: "templates/eventManager.html"
				})
				.state('groupManager', {
					controller: "GroupManagerController",
					url: "/groupManager",
					resolve: {
						loginRequired: loginRequired,
						user: ['UserService', function(UserService) {
							return UserService.resolveUser();
						}]
					},
					templateUrl: "templates/groupManager.html"
				});

			function skipIfLoggedIn($q, $auth) {
				var deferred = $q.defer();
				if ($auth.isAuthenticated()) {
					deferred.reject();
					$location.path('/eventReporter');
				} else {
					deferred.resolve();
				}
				return deferred.promise;
			}

			function loginRequired($q, $location, $auth) {
				var deferred = $q.defer();
				if ($auth.isAuthenticated()) {
					deferred.resolve();
				} else {
					$location.path('/login');
				}
				return deferred.promise;
			}
		})

		.config(function($authProvider) {
			$authProvider.google({
				clientId: '626928516259-ucigbju2t1n5qj8sa6qf8vcsdo5bhpqg.apps.googleusercontent.com',
				redirectUri: 'https://mhack-nmichaud.firebaseapp.com/eventReporter',
				responseType: 'token'
			});
		});

})(angular);
