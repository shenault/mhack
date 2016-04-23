(function(angular) {
	angular
		.module('collaboratio.app')
		.config([
			'$translateProvider',
			function($translateProvider) {
				var locale = navigator.languages ? navigator.languages[0] : navigator.language;

				$translateProvider.translations('en', {
					title: 'Hello'
				});
				$translateProvider.translations('fr', {
					title: 'Allo'
				});

				$translateProvider.preferredLanguage(locale);
			}
		]);
})(angular);
