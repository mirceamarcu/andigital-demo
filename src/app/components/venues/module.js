(function() {
	'use strict';
	
	angular
		.module('venues', [])
		.service('venuesModel', VenuesModel);
		
		VenuesModel.$inject = ['$http', 'API', '$q'];
	
		function VenuesModel($http, API, promise) { 
			
			this.getList = function(near) {
				return $http.get(concatCredentials(API)+'&near='+near);
			}
			
			this.getVenueItems = function(near) {
				var self = this,
						venueList;
				return promise(function(resolve){
					self.getList(near).success(function(result) {
						venueList = result.response.groups[0].items;
						return resolve(self.getVenueData(venueList));
					});
				});
			}
			
			this.getVenueData = function(venueItems) {
				var venueNames = [];
				for (var i = 0; i < venueItems.length; i++) {
					venueNames.push({
						name : venueItems[i].venue.name
					});
				}
				return venueNames;
			}
			
		};

		function concatCredentials(API) {
			return API.url+'&client_id='+API.clientID+'&client_secret='+API.clientSecret;
		};
	
})();