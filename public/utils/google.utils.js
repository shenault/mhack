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

						refGroup.orderByKey().on("value", function(snapshot) {
							snapshot.forEach(function(data) {

							});
						});
						return returnValue;
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
