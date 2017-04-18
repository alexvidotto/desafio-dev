'use strict';

const
  util     = require('util')
  ,request = require('../request')
  ,baseURL = 'https://api.maplink.com.br/v0/route?%s&result=summary.tolls,summary.distance,summary.duration'

module.exports.calculate = function (query) {
  return Promise.resolve().then(function () {

    let searchURL = util.format(baseURL, query);
    return request.get(searchURL);
  });
}
