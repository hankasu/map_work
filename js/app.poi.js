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

app.poi = (function () {

   //---------------- BEGIN MODULE SCOPE VARIABLES --------------
   var
       stateMap  = { $container : null },
       jqueryMap = {},

       setJqueryMap, configModule, initModule, onCategoryClick;
   //----------------- END MODULE SCOPE VARIABLES ---------------

   //------------------- BEGIN UTILITY METHODS ------------------
   // example : getTrimmedString
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
   onCategoryClick = function ( event ){
      //set the check box to checked
      var $element = $(event.target),
          unchecked = 'list-group-item glyphicon glyphicon-unchecked',
          checked = 'list-group-item glyphicon glyphicon-check',
          eventData = {
             category : $element.attr('id'),
             on:false
          };
      //layer is turned on
      if($element.hasClass(unchecked)){
         $element.removeClass(unchecked);
         $element.addClass(checked);
         eventData.on = true;
      }
      //is turned off
      else {

         $element.removeClass(checked);
         $element.addClass(unchecked);
         eventData.on = false;

      }

      $.gevent.publish('app-category-clicked', eventData)
   };

   //-------------------- END EVENT HANDLERS --------------------



   //------------------- BEGIN PUBLIC METHODS -------------------
   // Begin public method /configModule/
   // Purpose    : Adjust configuration of allowed keys
   // Arguments  : A map of settable keys and values
   //   * color_name - color to use
   // Settings   :
   //   * configMap.settable_map declares allowed keys
   // Returns    : true
   // Throws     : none
   //
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

      //bind click to onCategoryClick
      jqueryMap.$container.on('click','.list-group-item', onCategoryClick);

      return true;
   };
   // End public method /initModule/

   // return public methods
   return {
      configModule : configModule,
      initModule   : initModule
   };
   //------------------- END PUBLIC METHODS ---------------------
}());