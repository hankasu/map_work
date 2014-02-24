/*
 * app.shell.js
 * Shell module for app
 */

/*jslint         browser : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global $, app */

app.shell = (function () {
   //---------------- BEGIN MODULE SCOPE VARIABLES --------------
   var
       jqueryMap = {},
       stateMap = { $container : null },
       setJqueryMap, initModule, onCategoryClick;
   //----------------- END MODULE SCOPE VARIABLES ---------------

   //------------------- BEGIN UTILITY METHODS ------------------
   // Returns copy of stored anchor map; minimizes overhead
   //-------------------- END UTILITY METHODS -------------------

   //--------------------- BEGIN DOM METHODS --------------------
   // Begin DOM method /setJqueryMap/
   setJqueryMap = function () {
      var $container = stateMap.$container;
      jqueryMap = {
         $container : $container,
         $geomap    : $container.find('#geomap'),
         $poi       : $container.find('#poi')
      };
   };
   // End DOM method /setJqueryMap/

   //--------------------- END DOM METHODS ----------------------

   //------------------- BEGIN EVENT HANDLERS -------------------
   onCategoryClick = function(event, dataObj){
      console.log('Called', dataObj);
      app.geomap.togglePois(dataObj);
   };
   //-------------------- END EVENT HANDLERS --------------------

   //---------------------- BEGIN CALLBACKS ---------------------
   //----------------------- END CALLBACKS ----------------------

   //------------------- BEGIN PUBLIC METHODS -------------------

   initModule = function ( $container ) {
      //load html and jquery
      stateMap.$container = $container;
      setJqueryMap();

      $.gevent.subscribe(jqueryMap.$container, 'app-category-clicked', onCategoryClick );

      //configure and initialize feature modules
      app.geomap.initModule( jqueryMap.$geomap );

      //poi category section
      app.poi.initModule( jqueryMap.$poi );

   };
   // End PUBLIC method /initModule/

   return { initModule : initModule };
   //------------------- END PUBLIC METHODS ---------------------
}());