'use strict';

const
  wagner       = require('wagner-core');

module.exports = (function () {

  // create component with injected modules

  return wagner.invoke(function(serviceAPI, logger) {
    return {
      calc: function() {
        logger.log('doing route calculator');
        return serviceAPI.route.calc(arguments);
      },
      geocode: function() {
        return serviceAPI.geocode.geocode(arguments);
      }
    };
  });

})();
