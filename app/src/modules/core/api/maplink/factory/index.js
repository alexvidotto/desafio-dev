//
// Applies DI at strategic modules
//

'use strict';

const
  wagner            = require('wagner-core')
  ,Request          = require('../request')
  ,util             = require('util')
;

module.exports = {
  register: function() {

    let hostConfig = {
      hostAPI     : 'http://api.maplink.com.br'
      ,apiVersion : 'v0'
    };

    wagner.factory('maplinkRequest', function() {
      return new Request();
    });
    wagner.factory('maplinkHostParams', function() {
      return hostConfig;
    });
    wagner.factory('maplinkAPIBaseURL', function(maplinkHostParams) {
      return util.format('%s/%s', maplinkHostParams.hostAPI, maplinkHostParams.apiVersion);
    });
  }
};
