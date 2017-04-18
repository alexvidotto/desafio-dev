'use strict';

const
  util     = require('util')
  ,request = require('../request')
  ,baseURL = 'http://api.maplink.com.br/v0/search?%s';

module.exports.geocode = function (query) {
  return Promise.resolve().then(function () {

    let searchURL = util.format(baseURL, query);
    return request.get(searchURL);
  });
}
