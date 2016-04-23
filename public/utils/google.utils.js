/**
 * Util offering some google util function.
 * Reference :
 * http://stackoverflow.com/questions/16429562/find-a-point-in-a-polyline-which-is-closest-to-a-latlng
 * http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
 */
(function(angular) {

	angular
		.module('google.utils', [])

		.factory('GoogleUtils', [
			'$filter',
			'$rootScope',
			'$translate',
			'$window',
			'$firebaseArray',
			function( $filter, $rootScope, $translate, $window,$firebaseArray) {
				return {

					getTypeList: function(lat, lng) {
						var refGroup = new Firebase("https://mhack-ghislain.firebaseio.com/group");
						var self = this;
						var returnValue = [];
						var returnValueKey = [];

						refGroup.orderByKey().on("value", function(snapshot) {
							snapshot.forEach(function(data) {
								angular.forEach(data.val().zone,function(zone, key){
									var refZone = new Firebase("https://mhack-ghislain.firebaseio.com/zone");
									refZone.orderByKey().equalTo(zone).on("value", function(snapshot){
										snapshot.forEach(function(zone) {
											console.log(data.val().name + " " +  zone.val().desc + " " + zone.val().path.length);
											var amIinZone = false;
											for (var i=0; i < zone.val().path.length; i++ ) {
												if (zone.val().path[i].type = "polygone") {
													//create polygone
													var paths = [];

													for (var j=0; j< zone.val().path[i].coordinates.length;j++) {
														var lat = zone.val().path[i].coordinates[j][0];
														var lng = zone.val().path[i].coordinates[j][1];

														paths.push(new google.maps.LatLng(lat, lng));
													}

													var polygon = new google.maps.Polygon({paths});
													if (self.isInPolygon(lat, lng,polygon)) {
														amIinZone = true;
														break;
													}
												} else if (zone.val().path[i].type = "LineString") {
													//creer la structure
													//comparer avec le treshold
													if (true) {
														amIinZone = true;
														break;
													}
												}
											};

											if (amIinZone) {
												//return all type of the group
												for (var i=0; i < data.val().type.length; i++){
													console.log(data.val().type[i]);
													returnValueKey.push(data.val().type[i]);
												}

											}

										});
									});
								});
							});
						});

						//get unique
						returnValueKey =  returnValueKey.filter(function(item, i, ar){ return ar.indexOf(item) === i; });

						//get type
						var refType = new Firebase("https://mhack-ghislain.firebaseio.com/type");

						for (var i = 0; i<returnValueKey.length;i++) {
							refType.orderByKey().equalTo(returnValueKey[i]).on("value", function (snapshot) {
								returnValue.push(snapshot.val());
							});
						}
						console.log(returnValue);
						return returnValue
					},

					isInPolygon: function(lat, lng, p) {
						return google.maps.geometry.poly.containsLocation(new google.maps.LatLng({lat: lat, lng: lng}), p);
					},

					isInPolygons: function(lat, lng, pl) {

						return returnValue;
					},

					getItemListNearMe: function(lat, lng, meters) {
						var ref = new Firebase("https://mhack-ghislain.firebaseio.com/item");
						var self = this;
						var returnValue = [];

						ref.orderByKey().on("value", function(snapshot) {
							snapshot.forEach(function(data) {
								if (meters >= self.getDistanceFromLatLonInMeter(lat,lng, data.val().lat,data.val().lng)) {
									returnValue.push(data.val());
								}
							});
						});
						return returnValue;
					},

					getItemListInViewPort: function(minLat, minLng, maxLat, maxLng) {

					},

					getDistanceFromLatLonInMeter: function(lat1,lon1,lat2,lon2) {
						var self = this;
						var R = 6371; // Radius of the earth in km
						var dLat = self.deg2rad(lat2-lat1);  // deg2rad below
						var dLon = self.deg2rad(lon2-lon1);
						var a =
								Math.sin(dLat/2) * Math.sin(dLat/2) +
								Math.cos(self.deg2rad(lat1)) * Math.cos(self.deg2rad(lat2)) *
								Math.sin(dLon/2) * Math.sin(dLon/2)
							;
						var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
						var d = R * c; // Distance in km
						return d * 1000;
					},

					deg2rad : function(deg) {
						return deg * (Math.PI/180)
					}

				};
			}]);

})(angular);
