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
					confirm : 'Confirm',
					description : 'Description',
					location : 'Location',
					menu : 'Menu',
					'menu.eventReporter' : 'Report an event',
					'menu.eventManager' : 'Resolve an event',
					'menu.groupManager' : 'Manage groups',
					missionStatement : 'Together for an improved city',
					resolve : 'Resolve',
					save : 'Save',
					title: 'Hello',
					type: 'Type',
					uploadImage: 'Upload an image',
					Emplacement: 'Location name'
				});
				$translateProvider.translations('fr', {
					add : 'Ajouter',
					addEvent : 'Rapporter un événement',
					back : 'Retour',
					close : 'Fermer',
					confirm : 'Confirmer',
					description : 'Description',
					location : 'Localisation',
					menu : 'Menu',
					'menu.eventReporter' : 'Rapporter un événement',
					'menu.eventManager' : 'Résoudre un événement',
					'menu.groupManager' : 'Gérer les groupes',
					missionStatement : 'Ensemble pour une ville améliorée',
					resolve : 'Résoudre',
					save : 'Sauvegarder',
					title: 'Allo',
					type: 'Type',
					uploadImage: 'Téléverser une image',
					Emplacement: 'Emplacement'
				});

				$translateProvider.preferredLanguage(locale.substring(0, 2));
			}
		]);
})(angular);
