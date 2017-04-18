'use strict';

const
   wagner        = require('wagner-core')
   ,geocoder     = require('../geocode')
   ,Summarizer   = require('./Summarizer')
   ,util         = require('./util')
 ;

module.exports = (function () {

  return wagner.invoke(function(serviceAPI, logger) {

    return {
      summarize: function(parameters) {
        logger.log('trying calculate route');

        let summarizer = new Summarizer(parameters);

        return geocoder
                .geocode(parameters.addresses)
                .then(util.extractWaypoints)
                .then(function (waypoints) {
                  // restrict summary result
                  let query = waypoints + '&result=summary.tolls,summary.distance,summary.duration';
                  return serviceAPI.route.calculate(query);
                })
                .then(summarizer.summarize);
      }
    };
  });

})();
