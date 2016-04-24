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
			$urlRouterProvider.otherwise('/');
			$stateProvider
				.state('login', {
					controller: "LoginController",
					url: "/login",
					templateUrl: "templates/login.html"
				})
				.state('eventReporter', {
					controller: "EventReporterController",
					url: "/",
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
				});
		})

        .config(function($mdThemingProvider) {
            // Extend the red theme with a different color and make the contrast color black instead of white.
            // For example: raised button text will be black instead of white.
            $mdThemingProvider.definePalette('blueCollaboratio', {
                '50': 'E3F2FD',
                '100': 'E3F2FD',
                '200': '90CAF9',
                '300': '64B5F6',
                '400': '42A5F5',
                '500': '9ad9e7',
                '600': '1E88E5',
                '700': '1976D2',
                '800': '9ad9e7',
                '900': '0D47A1',
                'A100': '82B1FF',
                'A200': '448AFF',
                'A400': '2979FF',
                'A700': '2962FF',
                'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                    // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                    '200', '300', '400', 'A100'],
                'contrastLightColors': undefined
            });
            $mdThemingProvider.definePalette('orangeCollaboratio', {
                '50': 'ffebee',
                '100': 'ffcdd2',
                '200': 'ef9a9a',
                '300': 'e57373',
                '400': 'ef5350',
                '500': 'f15822',
                '600': 'e53935',
                '700': 'd32f2f',
                '800': 'c62828',
                '900': 'b71c1c',
                'A100': 'ff8a80',
                'A200': 'f15822',
                'A400': 'ff1744',
                'A700': 'd50000',
                'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                    // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                    '200', '300', '400', 'A100'],
                'contrastLightColors': undefined
            });
            // Use that theme for the primary intentions
            $mdThemingProvider.theme('default')
                .primaryPalette('blueCollaboratio')
                .accentPalette('orangeCollaboratio');
        });

})(angular);
