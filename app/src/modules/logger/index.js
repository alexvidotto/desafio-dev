'use strict';

const
  wagner       = require('wagner-core');

module.exports = (function () {

  // create component with injected modules

  return wagner.invoke(function (logger) {

    return {
      initialize: function (app, params) {
        logger.initialize(app, params);
      },
      log: function(level, message) {
        logger.log(level, message);
      },
      error: function(e) {
        logger.error(e);
      }
    }
  });

})();
