(function() {
  'use strict';
  angular
    .module('maps', [])
    .service('mapManager', MapManager);

    MapManager.$inject = ['$rootScope'];

    function MapManager($rootScope) {
      this.addPointers = function(venuesList) {
      $rootScope.$broadcast('map:add:pointers', venuesList);
    };
  };

})();
