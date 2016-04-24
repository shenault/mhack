(function(angular) {
	angular
		.module('collaboratio.app')
		.config([
			'$translateProvider',
			function($translateProvider) {
				var locale = navigator.languages ? navigator.languages[0] : navigator.language;

				$translateProvider.translations('en', {
					add : 'Ajouter',
					addEvent : 'Report an event',
					back : 'Back',
					close : 'Close',
					description : 'Description',
					location : 'Location',
					menu : 'Menu',
					'menu.eventReporter' : 'Report an event',
					'menu.eventManager' : 'Resolve an event',
					'menu.groupManager' : 'Manage groups',
					missionStatement : 'TOGETHER FOR AN IMPROVED CITY',
					save : 'Save',
					title: 'Hello',
					type: 'Type',
					uploadImage: 'Upload an image'
				});
				$translateProvider.translations('fr', {
					add : 'Ajouter',
					addEvent : 'Rapporter un événement',
					back : 'Retour',
					close : 'Fermer',
					description : 'Description',
					location : 'Localisation',
					menu : 'Menu',
					'menu.eventReporter' : 'Rapporter un événement',
					'menu.eventManager' : 'Résoudre un événement',
					'menu.groupManager' : 'Gérer les groupes',
					missionStatement : 'ENSEMBLE POUR UNE VILLE AMÉLIORÉE',
					save : 'Sauvegarder',
					title: 'Allo',
					type: 'Type',
					uploadImage: 'Téléverser une image'
				});

				$translateProvider.preferredLanguage(locale);
			}
		]);
})(angular);
