/**
 * Created by Alex on 26/02/16.
 */

function GoogleMap() {

    /**
     * Instance of the Map.
     *
     * @type {Object}
     */
    this.map = {};

    /**
     * Instance represents a rectangle in geographical coordinates.
     *
     * @type {Object}
     */
    this.markerBounds = {};

    /**
     * Marker label color.
     *
     *  @type {String}
     */
    this.markerLabelColor = '#fff';

    /**
     * Marker icon by default with the picture path.
     *
     *  @type {String}
     */
    this.markerIcon = null;

    /**
     * Custom marker icon with the picture path.
     *
     *  @type {String}
     */
    this.markerIconCustom = null;

    /**
     * Define location by default.
     * example = {'lat': int, 'lon': int}
     *
     * @type {Array}
     */
    this.positionDefault = [];

    /**
     * Define collection of markers.
     *
     * @type {Array}
     */
    this.markers = [];

    /**
     * Define the zoom by default.
     *
     * @type {Number}
     */
    this.zoom = 4;

    /**
     * The initial enabled/disabled state of the Map type control.
     *
     * @type {Boolean}
     */
    this.mapTypeControl = false;

    /**
     * If false, disables scrollwheel zooming on the map.
     *
     * @type {Boolean}
     */
    this.scrollwheel = false;

    /**
     * The initial enabled/disabled state of the Street View Pegman control.
     *
     * @type {Boolean}
     */
    this.streetViewControl = true;

    /**
     * The enabled/disabled state of the Zoom control.
     *
     * @type {Boolean}
     */
    this.zoomControl = true;

    /**
     * Initialization of the google map.
     * @param data {Object}
     *
     * data = {
     *    'positionDefault' : {'lat': int, 'lon': int},
     *    'dataList': [{
     *       'keyOrder': int,
     *       'localization': {'lat': int, 'lon': int}
     *    }]
     * }
     *
     */
    this.initialize = function (data) {
        var me = this;

        // Define a position for the map
        me.positionDefault = {
            lat: data['positionDefault']['lat'],
            lng: data['positionDefault']['lon']
        };

        // Create instance of google map
        me.map = new google.maps.Map(document.getElementById('google-map'), {
            zoom: me.zoom,
            zoomControl: me.zoomControl,
            scrollwheel: me.scrollwheel,
            mapTypeControl: me.mapTypeControl,
            streetViewControl: me.streetViewControl,
            center: me.positionDefault
        });

        me.markerBounds = new google.maps.LatLngBounds();

        // Create Markers
        me.createMarkers(data['dataList']);

        // Add events on the map
        me.addMapEvents();
    };

    /**
     * Add events on map.
     */
    this.addMapEvents = function () {
        var me = this;
        // Got to center of the map
        me.map.addListener('goToCenter', function () {
            me.map.panTo(me.markerBounds.getCenter());
        });
    };

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
    this.createMarkers = function (markers, resetMarkers) {
        var me = this,
            markersTotal = markers.length,
            marker = null;

        // Clear All Markers in markers collection
        if(resetMarkers || false){
            me.clearAllMarkers();
        }

        for (var i = 0; i < markersTotal; i++) {

            // Create instance of marker
            marker = new google.maps.Marker({
                position: {
                    lat: markers[i]['localization']['lat'],
                    lng: markers[i]['localization']['lon']
                },
                icon: me.markerIcon,
                label: {
                    text: '' + markers[i]['keyOrder'],
                    color: me.markerLabelColor
                },
                ZIndex: markers[i]['keyOrder'],
                keyOrder: markers[i]['keyOrder']
            });

            me.pushMarker(marker, markersTotal);
        }
    };

    /**
     * Add a marker on the map and in the markers collection.
     * Add Event on this marker.
     *
     * @param marker {Object}
     * @param markersTotal {Number}
     */
    this.pushMarker = function (marker, markersTotal) {
        var me = this;

        // Add Marker to map
        marker.setMap(me.map);

        if(markersTotal > 1){
            // Update Position map on marker
            me.mapCenterPosition(marker);
        }
        // Add Marker to collection
        me.markers[marker['keyOrder']] = marker;

        // Add event on marker
        marker.addListener('click', function () {
            me.resetAllIcons();
            marker.setIcon(me.markerIconCustom);
            me.map.panTo(marker.position);
            marker.setZIndex(100000);
        });

        marker.addListener('mouseover', function () {
            marker.setIcon(me.markerIconCustom);
        });

        marker.addListener('mouseout', function () {
            marker.setIcon(me.markerIcon);
        });

        marker.addListener('goToMarker', function () {
            me.map.panTo(marker.position);
        });

        marker.addListener('changeIcon', function () {
            marker.setIcon(me.markerIconCustom);
            marker.setZIndex(100000);
        });

        marker.addListener('resetIcon', function () {
            marker.setIcon(me.markerIcon);
            marker.setZIndex(marker['keyOrder']);
        });
    };

    /**
     * Update position of the map following one or many markers.
     *
     * @param marker {Object}
     */
    this.mapCenterPosition = function (marker) {
        var me = this;

        // Center on a marker
        if(marker || false){
            me.markerBounds.extend(marker.position);
            me.map.fitBounds(me.markerBounds);
        }
        // Center on many marker
        else {
            Object.keys(me.markers).forEach(function (key, index) {
                me.markerBounds.extend(me.markers[key].position);
                me.map.fitBounds(me.markerBounds);
            });
        }
    };

    /**
     * Reset all markers icons.
     */
    this.resetAllIcons = function () {
        var me = this;

        Object.keys(me.markers).forEach(function (key, index) {
            me.markers[key].setIcon(me.markerIcon);
            me.markers[key].setZIndex(0);
        });
    };

    /**
     * Define opacity for a marker or many markers.
     *
     * @param value {Number}
     * @param marker {Object}
     */
    this.opacityMarker = function (value, marker) {
        var me = this;

        // Manage opacity of a marker
        if(marker || false){
            marker.setOpacity(value);
        }
        // Manage opacity of many markers
        else {
            Object.keys(me.markers).forEach(function (key, index) {
                me.markers[key].setOpacity(value);
            });
        }
    };

    /**
     * Delete all markers in the array collection.
     */
    this.clearAllMarkers = function () {
        var me = this;

        // Clear Marker Collection
        me.removeMarkerOnTheMap();
        me.markers = [];
    };

    /**
     * Remove one or many markers on the map.
     *
     * @param marker {Object}*
     */
    this.removeMarkerOnTheMap = function (marker) {
        var me = this;

        // Remove a marker on the map
        if(marker || false){
            marker.setMap(null);
        }
        // Remove many markers on the map
        else {
            Object.keys(me.markers).forEach(function (key, index) {
                me.markers[key].setMap(null);
            });
        }
    };
}