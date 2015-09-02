(function() {
	'use strict';
	
	var venues = angular.module('venues');
	
	var foursquare = {
		clientID: '0CMDIT00GXURSBD2SWMVHSSBACW3MJABN1J0JBFJMBW2WZYP',
		clientSecret: 'PTYFW3TNUZKQQNSZQ0FSV4WTESSVIDDAON3EE4T5WSOQOHP3',
		url: 'https://api.foursquare.com/v2/venues/explore?v=20140806'
	}
	
	venues.constant('API', foursquare);
	
	venues.directive('venues', venuesDirective);
		
	venuesDirective.$inject = ['venuesModel'];
	
	function venuesDirective(venuesModel) {
		return {
			templateUrl: 'app/components/venues/venues.html',
			restrict: 'E',
			link: function(scope) {
				scope.getNearVenues = function(near) {
					venuesModel.getVenueItems(near).then(function(venues){
						scope.venueData = venues;
					});
				}
				
			}
		}
	}
		
})();