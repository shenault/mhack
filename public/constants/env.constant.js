(function(angular) {
	var applicationBaseUri = '/omnimed/static/';
	var componentsUri = applicationBaseUri + 'components/';

	angular
		.module('collaboratio.app')

		.constant('ENV', {
			dbHost: 'https://collaboratiohack.firebaseio.com',
			appUrl: 'https://collaboratiohack.firebaseapp.com'
		});

})(angular);
