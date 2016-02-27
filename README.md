## Class Google Map - Javascript

######Quick started !

```
<body>

...

<div id="google-map" style="width:100%; height:400px;">
  Please enable javascript in your browser
</div>

<script type="text/javascript" src="class-google-map.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js"></script>
<script type="text/javascript">

  var data = {
    'positionDefault' : {'lat': 37.331002, 'lon': -122.029663}, // Default position
    // Array of markers
     'dataList': [{
        'keyOrder': 1, // Unique id
        'localization': {'lat': 37.331002, 'lon': -122.029663}
      }]
  };

  var googleMap = new GoogleMap();
  googleMap.initialize(data);
  
</script>
</body>
```


#### Methods availables

    /**
     * Add events on map.
     */
    ## addMapEvents()

    /**
     * Create Markers.
     * Add marker on the map and in markers collection.
     *
     * @param markers {Array} to create Markers
     * @param resetMarkers {Boolean} Force reset of all markers
     *
     * markers = [{
     *   'keyOrder': int,
     *   'localization': {'lat': int, 'lon': int}
     * }]
     *
     */
    ## createMarkers(markers, resetMarkers)

    /**
     * Add a marker on the map and in the markers collection.
     * Add Event on this marker.
     *
     * @param marker {Object}
     * @param markersTotal {Number}
     */
    ## pushMarker(marker, markersTotal)

    /**
     * Update position of the map following one or many markers.
     *
     * @param marker {Object}
     */
    ## mapCenterPosition(marker)

    /**
     * Reset all markers icons.
     */
    ## resetAllIcons()

    /**
     * Define opacity for a marker or many markers.
     *
     * @param value {Number}
     * @param marker {Object}
     */
    ## opacityMarker(value, marker);

    /**
     * Delete all markers in the array collection.
     */
    ## clearAllMarkers()

    /**
     * Remove one or many markers on the map.
     *
     * @param marker {Object}
     */
    ## removeMarkerOnTheMap(marker)