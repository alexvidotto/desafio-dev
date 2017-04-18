//
// Applies DI at strategic modules
//

'use strict';

const
  wagner                   = require('wagner-core')

  ,mapLinkFactory          = require('../core/api/maplink/factory')
  ,MapLinkRouteAPI         = require('../core/api/maplink/route')
  ,MapLinkGeocodeAPI       = require('../core/api/maplink/geocode')
  ,winstonLog              = require('../core/logger/winston')
;

module.exports = {
  register: function() {

    mapLinkFactory.register();

    wagner.factory('routeAPI', function() {
      return new MapLinkRouteAPI();
    });
    wagner.factory('geocodeAPI', function() {
      return new MapLinkGeocodeAPI();
    });
    wagner.factory('serviceAPI', function (geocodeAPI, routeAPI) {
      return {
        'geocoder': geocodeAPI,
        'route'   : routeAPI
      }
    })
    wagner.factory('logger', function() {
      return winstonLog;
    });
  }
};
