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
                .then(serviceAPI.route.calculate)
                .then(summarizer.summarize);
      }
    };
  });

})();
