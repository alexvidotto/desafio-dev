'use strict';

const
  wagner     = require('wagner-core')
  ,util      = require('util')
  ,ACTION    = 'route';

module.exports = function () {
  return wagner.invoke(function (maplinkRequest, maplinkAPIBaseURL) {
    return {
      calculate: function(query) {
        return Promise.resolve().then(function () {
          let searchURL = util.format("%s/%s?%s", maplinkAPIBaseURL, ACTION, query);
          return maplinkRequest.get(searchURL);
        });
      }
    }
  });
}
