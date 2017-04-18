'use strict';

const
  util    = require('util'),
  request = require('../request');

let
  baseURL = 'http://api.maplink.com.br/v0/search?q=%s'

module.exports.geocode = function (address) {
  return Promise.resolve().then(function () {

    let searchURL = util.format(baseURL, address);
    return request.get(searchURL);
  });
}
