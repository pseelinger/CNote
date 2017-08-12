//Controls the map via the Cordova Google Maps plugin
const MAPCENTER = {"lat":35.910408, "lng": -79.051873};

//Create the map
var map;
document.addEventListener("deviceready", function() {
  var div = document.getElementById("map_canvas");

  // Initialize the map view
  map = plugin.google.maps.Map.getMap(div, {
    'camera': {
      'latLng': MAPCENTER,
      'zoom': 7
    }
  });

  // Wait until the map is ready status.
  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
}, false);

function onMapReady() {
  var button = document.getElementById("button");
  button.addEventListener("click", onBtnClicked, false);

  //Add markers to the map from your JSON file. Just replace 'js/markers.json' with your file's location.
  var markers;
  $.getJSON("js/markers.json", function(result){
    markers = result;
    console.log(markers);

    //To make it easier we geocode locations from an address, rather than needing to input latitude and longitude for each headline
    var result;
    var position;
    var request;
    $.each(markers, function(i, marker){
      //Make address readable to Google's geocoding API
      request = {
        'address': marker.position
      }

      //Get the latitutde and longitude from the address
      plugin.google.maps.Geocoder.geocode(request, function(results){
        if(results.length){
          result = results[0];
          position = result.position;
          map.addMarker({
            'title': marker.title,
            'position': position,
            'snippet': marker.position,
            'animation': plugin.google.maps.Animation.BOUNCE
          }
        );
        //Display an error in the JS console if geocoding fails
      }else{
        console.error("Geocode unsuccessful for " + marker.title + " (" + marker.position + ")");
      }
    }
  );

});
});
};

function onBtnClicked() {
  map.showDialog();
}
