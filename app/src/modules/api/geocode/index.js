'use strict';

const
  wagner       = require('wagner-core');

module.exports = (function () {
  return wagner.invoke(function(serviceAPI, logger) {
    return {
      geocode: function(address) {
        logger.log('trying geocode');
        if (Object.prototype.toString.call(address) === '[object Array]') {
          let tasks = [];
          for (let i = 0, adrs; adrs = address[i]; i++) {
            // sometimes comma isn't encoded. just remove it
            adrs = adrs.replace(',', '');
            tasks.push( serviceAPI.geocoder.geocode('limit=1&q=' + encodeURIComponent(adrs)) );
          }
          return Promise.all(tasks);
        } else {
          // sometimes comma isn't encoded. just remove it
          address = address.replace(',', '');
          return serviceAPI.geocoder.geocode(address);
        }
      }
    };
  });

})();
