(function(angular) {

	angular
		.module('user.svc', [])

		.factory('UserService', [
			'$auth',
			'$http',
			'$q',
			'$rootScope',
			'$firebaseArray',
			'$firebaseAuth',
			'ENV',
			function($auth, $http, $q, $rootScope, $firebaseArray, $firebaseAuth, ENV) {
				var currentUser = null;
				var ref = new Firebase("https://mhack-nmichaud.firebaseio.com");
				var auth = $firebaseAuth(ref);

				return {
					getCurrentUser : function() {
						return user;
					},

					getUserByEmail : function(email) {
						var deferred = $q.defer();
						var ref = new Firebase(ENV.dbHost + "/user");

						ref.orderByChild('email').equalTo(email).on('value', function(snapshot) {
							var users = snapshot.val();
							for (var currentUser in users) {
								if (users.hasOwnProperty(currentUser)) {
									deferred.resolve(users[currentUser]);
								}
							}
							deferred.resolve(null);
						});

						return deferred.promise;
					},

					resolveUser : function() {
						var deferred = $q.defer();
						var googleAuth = null;
						var ref = new Firebase(ENV.dbHost + "/user");
						var self = this;

						if (!currentUser) {
							googleAuth = auth.$getAuth().google;
							self.getUserByEmail(googleAuth.email).then(function (user) {
								currentUser = {
									email: googleAuth.email,
									picture:googleAuth.profileImageURL,
									userName: googleAuth.displayName
								};
								if (!user) {
									$firebaseArray(ref).$add(currentUser);
								}

								deferred.resolve(currentUser);
							});
						} else {
							deferred.resolve(currentUser);
						}

						return deferred.promise;
					}
				};
			}]);

})(angular);
