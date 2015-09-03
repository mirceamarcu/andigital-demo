(function() {
  'use strict';

  var venues = angular.module('venues');

  var foursquare = {
    clientID: '0CMDIT00GXURSBD2SWMVHSSBACW3MJABN1J0JBFJMBW2WZYP',
    clientSecret: 'PTYFW3TNUZKQQNSZQ0FSV4WTESSVIDDAON3EE4T5WSOQOHP3',
    url: 'https://api.foursquare.com/v2/venues/explore?v=20140806'
  }

  venues.constant('API', foursquare);

  venues.controller('VenuesController', VenuesController);

  VenuesController.$inject = ['venuesModel', 'mapManager'];

  function VenuesController(venuesModel, mapManager) {
    var self = this;
    self.getNearVenues = function(near) {
      venuesModel.getList(near).then(function(venues){
        self.venueData = venues;
        mapManager.addPointers(venues);
      });
    }
  }

})();
