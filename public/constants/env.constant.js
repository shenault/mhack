(function(angular) {
	var applicationBaseUri = '/omnimed/static/';
	var componentsUri = applicationBaseUri + 'components/';

	angular
		.module('collaboratio.app')

		.constant('ENV', {
			appUrl: 'https://collaboratiohack.firebaseapp.com',
			dbHost: 'https://collaboratiohack.firebaseio.com',
			imgMaxSize: 600,
		});

})(angular);
