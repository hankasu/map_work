/*
 * module_template.js
 * Template for browser feature modules
 *
 * Michael S. Mikowski - mike.mikowski@gmail.com
 * Copyright (c) 2011-2012 Manning Publications Co.
 */

/*jslint         browser : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */

/*global $, app */

app.geomap = (function () {

   //---------------- BEGIN MODULE SCOPE VARIABLES --------------
   var
       configMap = {
          url    : 'https://a.tiles.mapbox.com/v3/hankasu.h4307hg3/{z}/{x}/{y}.png',
          center : [40.712, -74.007],
          zoom   : 14
       },
       settings = {
          baseDataUrl: 'http://www.fodors.com/maps/geojson.cfm?entity_id=474684&dest=1128&class_id=',
          'sites'      : '20001',
          'restaurants': '20002',
          'hotels'     : '20003',
          'nightlife'  : '20004',
          'shopping'   : '20005'
       },
       stateMap  = { $container : null },
       jqueryMap = {},
       mapLayers = {},
       geoMap,
       restaurantsLyr,
       sitesLyr,
       hotelsLyr,
       nightlifeLyr,
       shoppingLyr,
       hotelIcon,

       setJqueryMap, configModule, initModule, togglePois;
   //----------------- END MODULE SCOPE VARIABLES ---------------

   //------------------- BEGIN UTILITY METHODS ------------------
   // example : getTrimmedString
   onEachFeature = function(feature, layer){
      layer.bindPopup(feature.properties.title);
   }
   //-------------------- END UTILITY METHODS -------------------

   //--------------------- BEGIN DOM METHODS --------------------
   // Begin DOM method /setJqueryMap/
   setJqueryMap = function () {
      var $container = stateMap.$container;

      jqueryMap = { $container : $container };
   };
   // End DOM method /setJqueryMap/
   //---------------------- END DOM METHODS ---------------------

   //------------------- BEGIN EVENT HANDLERS -------------------
   // example: onClickButton = ...
   //-------------------- END EVENT HANDLERS --------------------



   //------------------- BEGIN PUBLIC METHODS -------------------
   // Begin method add POI
   // Purpose   : add pois to the map from a geoJson url
   // Arguments : url of the geojson data points
   // Returns   : layer name

   togglePois = function ( objData ){
      var dataUrl,
          category = objData.category,
          markerLyrGroup = mapLayers[category];

      if(objData.on){

         dataUrl = settings.baseDataUrl + settings[category];

         $.ajax({
            url:dataUrl,
            crossDomain:true,
            dataType:"json",
            success : function(data){
               markerLyrGroup.addLayer(
                   L.geoJson(data, {
                      pointToLayer : function(feature, latlng){
                         return L.marker(latlng, {icon: hotelIcon});
                      },
                      onEachFeature: onEachFeature
                   })
               );
            },
            error : function(xhr, status, err){
               console.log(err);
            }
         });
      }
      else{
         markerLyrGroup.clearLayers();
      }
   };

   configModule = function ( input_map ) {
      return true;
   };
   // End public method /configModule/

   // Begin public method /initModule/
   // Purpose    : Initializes module
   // Arguments  :
   //  * $container the jquery element used by this feature
   // Returns    : true
   // Throws     : none
   //
   initModule = function ( $container ) {

      stateMap.$container = $container;
      setJqueryMap();

      restaurantsLyr = L.layerGroup();
      sitesLyr       = L.layerGroup();
      hotelsLyr      = L.layerGroup();
      nightlifeLyr   = L.layerGroup();
      shoppingLyr    = L.layerGroup();

      mapLayers = {
         "restaurants" : restaurantsLyr,
         "sites"       : sitesLyr,
         "hotels"      : hotelsLyr,
         "nightlife"   : nightlifeLyr,
         "shopping"    : shoppingLyr
      }

      geoMap = L.map(jqueryMap.$container.attr('id'), {
         center : configMap.center,
         zoom: configMap.zoom,
         layers : [restaurantsLyr, sitesLyr, hotelsLyr, nightlifeLyr, shoppingLyr]
      });

      //add tms layer to map
      L.tileLayer(configMap.url).addTo(geoMap);

      hotelIcon = new app.icons.hotelIcon({iconUrl:'img/hotel.png'});

      //add category layers
      return true;
   };
   // End public method /initModule/

   // return public methods
   return {
      configModule : configModule,
      initModule   : initModule,
      togglePois   : togglePois
   };
   //------------------- END PUBLIC METHODS ---------------------
}());