(function(){
	'use strict';
	
	var maps = angular.module('maps');
	
	maps
		.directive('map', mapDirective);
	
	var map, 
			markers = [];
	
	function mapDirective() {
		return {
			template: '<div class="map"><div style="height:100%;"></div></div>',
			restrict: 'E',
			replace: true,
			link: function(scope, element) {
				google.maps.event.addDomListener(window, 'load', initialize.bind(null, element[0].childNodes[0]));
				
				scope.$on('add-pointers', function(e, venuesList){
					clearMarkers();
					
					var centerLat = venuesList[0].lat,
							centerLng = venuesList[0].lng,
							myLatLng = new google.maps.LatLng(centerLat, centerLng),
							bounds = new google.maps.LatLngBounds();
					
					var infowindow = new google.maps.InfoWindow();
					
					for (var i = 0; i < venuesList.length; i++) {
						var venue = venuesList[i];
						var marker = new google.maps.Marker({
							title: venue.name+', '+venue.address+', '+venue.city+', '+venue.country,
							label: venue.name,
							position: {lat: venue.lat, lng: venue.lng},
							map: map
						});
						
						markers.push(marker);
						bounds.extend(myLatLng);
					}
					
					map.fitBounds(bounds);
					map.setZoom(13);
				});
				
			}
		}
	}
	
	function initialize(mapCanvas) {
		getCurrentPosition(function(currentPosition) {
			var mapOptions = {
				center: new google.maps.LatLng(currentPosition.lat, currentPosition.lng),
				zoom: 8,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			map = new google.maps.Map(mapCanvas, mapOptions);
			
		});
	}
	
	function getCurrentPosition(callback) {
		navigator.geolocation.getCurrentPosition(function(geoposition){ 
			callback.call(null, {
				lat: geoposition.coords.latitude,
				lng: geoposition.coords.longitude
			});
		});
	}
	
	// Sets the map on all markers in the array.
	function setMapOnAll(map) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}
	
	function clearMarkers() {
		setMapOnAll(null);
	}
	
})();