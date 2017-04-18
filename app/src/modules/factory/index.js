//
// Applies DI at strategic modules
//

'use strict';

const
  wagner                  = require('wagner-core'),

  mapLinkRouteAPI         = require('../core/api/maplink/route'),
  mapLinkGeocodeAPI       = require('../core/api/maplink/geocode'),
  winstonLog              = require('../core/logger/winston');

module.exports = {
  register: function() {

    wagner.factory('routeAPI', function() {
      return mapLinkRouteAPI;
    });
    wagner.factory('geocodeAPI', function() {
      return mapLinkGeocodeAPI;
    });
    wagner.factory('serviceAPI', function (geocodeAPI, routeAPI) {
      return {
        'geocode': geocodeAPI,
        'route'  : routeAPI
      }
    })
    wagner.factory('logger', function() {
      return winstonLog;
    });
  }
};
