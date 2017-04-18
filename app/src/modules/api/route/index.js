'use strict';

const
   wagner        = require('wagner-core')
   ,geocoder     = require('../geocode')
   ,Summarizer   = require('./Summarizer');

module.exports = (function () {

  return wagner.invoke(function(serviceAPI, logger) {

    return {
      summarize: function(parameters) {
        logger.log('trying calculate route');

        let summarizer = new Summarizer(parameters);

        return geocoder
                .geocode(parameters.addresses)
                .then(summarizer.extractWaypoints)
                .then(serviceAPI.route.calculate)
                .then(summarizer.summarize);
      }
    };
  });

})();
