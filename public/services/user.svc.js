(function(angular) {

	angular
		.module('user.svc', [])

		.factory('UserService', [
			'$auth',
			'$http',
			'$q',
			'$rootScope',
			'$firebaseArray',
			'ENV',
			function($auth, $http, $q, $rootScope, $firebaseArray, ENV) {
				var currentUser = null;

				return {
					getCurrentUser : function() {
						return user;
					},

					getUserProfileByAccessToken : function(accessToken) {
						var deferred = $q.defer();

						$http({
							method: 'GET',
							url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + accessToken
						}).then(function successCallback(response) {
							deferred.resolve(response.data);
						}, function errorCallback(response) {
						});

						return deferred.promise;
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
						var ref = new Firebase(ENV.dbHost + "/user");
						var self = this;

						if (!currentUser) {
							self.getUserProfileByAccessToken($auth.getToken()).then(function (userProfile) {
								self.getUserByEmail(userProfile.email).then(function (user) {
									currentUser = {
										email: userProfile.email,
										picture: userProfile.picture,
										userName: userProfile.name
									};
									if (!user) {
										$firebaseArray(ref).$add(currentUser);
									}

									deferred.resolve(currentUser);
								});
							});
						} else {
							deferred.resolve(currentUser);
						}

						return deferred.promise;
					}
				};
			}]);

})(angular);
