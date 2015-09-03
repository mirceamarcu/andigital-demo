(function() {
  'use strict';

  angular
    .module('venues', ['maps'])
    .service('venuesModel', VenuesModel);

    VenuesModel.$inject = ['$http', 'API', '$q', 'mapManager'];

    VenuesModel($http, API, promise, mapManager) { 

      this.getList = function(near) {
      var venueList;
      return promise(function(resolve){
        $http.get(concatCredentials(API)+'&near='+near).success(function(result) {
          venueList = result.response.groups[0].items;
          return resolve(proccesRawVenueData(venueList));
        });
      });
    }

  };

  function concatCredentials(API) {
    return API.url+'&client_id='+API.clientID+'&client_secret='+API.clientSecret;
  };

  function proccesRawVenueData(venueItems) {
    var venuesList = [];
    for (var i = 0; i < venueItems.length; i++) {
      venuesList.push({
        name : venueItems[i].venue.name,
        address: venueItems[i].venue.location.address,
        city: venueItems[i].venue.location.city,
        country: venueItems[i].venue.location.country,
        lat: venueItems[i].venue.location.lat,
        lng: venueItems[i].venue.location.lng
      });
    }
    return venuesList;
  }

})();
