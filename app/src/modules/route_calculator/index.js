'use strict';

const
  wagner       = require('wagner-core');

module.exports = (function () {

  function getTotalRouteTime(output) {
  }

  function getTotalDistance(output) {
  }

  function getTotalFuelPrice(output) {
  }

  function getTollsPrice(output) {
  }

  return wagner.invoke(function(serviceAPI, logger) {
    return {
      calc: function() {
        logger.log('trying calculate route');
        return serviceAPI.route.calc(arguments);
      },
      geocode: function(address) {
        logger.log('trying geocode');
        if (Object.prototype.toString.call(address) === '[object Array]') {
          let tasks = [];
          for (let i = 0; i < address.length; i++) {
            tasks.push(address[i]);
          }
          return Promise.all(tasks);
        } else {
          return serviceAPI.geocode.geocode(address);
        }
      }
    };
  });

})();
