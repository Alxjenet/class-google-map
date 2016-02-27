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
------
    
###### createMarkers(markers, resetMarkers)
------
```
  
 Create Markers.
 Add marker on the map and in markers collection.

 @param markers {Array} to create Markers
 @param resetMarkers {Boolean} Force reset of all markers

 markers = [{
   'keyOrder': int,
   'localization': {'lat': int, 'lon': int}
 }]

   
```     
  
###### pushMarker(marker, markersTotal)
------ 
``` 
 
Add a marker on the map and in the markers collection.
Add Event on this marker.

@param marker {Object}
@param markersTotal {Number}
  
```     
 
######  mapCenterPosition(marker)
------ 
```
   
Update position of the map following one or many markers.

@param marker {Object}
    
```    

###### resetAllIcons()
------
```
   
Reset all markers icons.
    
```    

###### opacityMarker(value, marker);
------ 
```
   
Define opacity for a marker or many markers.

@param value {Number}
@param marker {Object}
    
```   
 
###### clearAllMarkers()
------
```
   
Delete all markers in the array collection.
    

###### removeMarkerOnTheMap(marker)
------
```
  
Remove one or many markers on the map.

@param marker {Object}
   
```     
