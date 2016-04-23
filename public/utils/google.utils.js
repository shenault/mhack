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
			function(MedicationDosageUtils, MedicationPrescriptionLinkUtils, TermUtils, $filter, $rootScope, $translate, $window) {
				return {

					getTypeList: function(lat, lng) {

						return returnValue;
					},

					isInPolygon: function(lat, lng, p) {

						return returnValue;
					},

					isInPolygons: function(lat, lng, pl) {

						return returnValue;
					},

					getItemListNearMe: function(lat, lng, meters) {

					},

					getItemListInViewPort: function(minLat, minLng, maxLat, maxLng) {

					}

				};
			}]);

})(angular);
