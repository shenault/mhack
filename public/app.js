(function(angular) {
	angular
		.module('collaboratio.app', [
			'firebase',
			'ngFileUpload',
			'ngMap',
			'ngMaterial',
			'pageslide-directive',
			'pascalprecht.translate',
			'ui.router'
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

		.config(function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/eventReporter');

			$stateProvider
				.state('eventReporter', {
					controller: "EventReporterController",
					url: "/eventReporter",
					templateUrl: "templates/eventReporter.html"
				})
				.state('eventManager', {
					controller: "EventManagerController",
					url: "/eventManager",
					templateUrl: "templates/eventManager.html"
				})
				.state('groupManager', {
					controller: "GroupManagerController",
					url: "/groupManager",
					templateUrl: "templates/groupManager.html"
				})
		});

})(angular);
