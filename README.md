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
