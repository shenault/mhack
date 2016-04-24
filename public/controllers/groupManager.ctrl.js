/**
 * Group manager Controller
 */
(function(angular) {
	angular
		.module('collaboratio.app')

		.controller('GroupManagerController', [
			'$firebaseArray',
			'$scope',
			'ENV',
			'GoogleUtils',
			'user',
			'$q',
			function($firebaseArray ,$scope, ENV, GoogleUtils, user, $q) {
				$scope.getItemListNearMe = function() {
					GoogleUtils.getItemListNearMe(-71.920 , 45.385);
				};

				$scope.setupScope = function() {
					$scope.label = "Group manager";

					$scope.getUserGroupsWithDetails(user).then(function(groups){
						console.log(groups);
					});
				};

				$scope.getUserGroupsWithDetails = function(user) {
					var deferred = $q.defer();
					var groups = [];
					var ref = new Firebase(ENV.dbHost + "/group");

					if (user.groups) {
						user.groups.forEach(function (group, idx, array) {
							ref.orderByKey().equalTo(Object.keys(group)[0]).on('value', function (snapshot) {
								var dbGroups = snapshot.val();
								for (var dbGroup in dbGroups) {
									if (dbGroups.hasOwnProperty(dbGroup)) {
										groups.push(dbGroups[dbGroup]);
									}
								}
								if (idx === array.length - 1) {
									deferred.resolve(groups);
								}
							});
						});
					} else {
						deferred.resolve([]);
					}

					return deferred.promise;
				};

				$scope.setupScope();
			}]);
})(angular);
