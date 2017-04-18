//
// Wrap maplink security requests
//

'use strict';

const
  request      = require('request'),
  urlSigner    = require('../security/urlsigner'),
  util         = require('util');

module.exports = (function() {

  let
    appCode   = process.env.MAPLINK_APP_CODE,
    secretKey = process.env.MAPLINK_SECRET_KEY;

  function execute (operation, url, json) {
    return new Promise(function (resolve, reject) {

      if (!appCode || !secretKey) {
        reject('required env var was not found');
        return;
      }

      url = util.format('%s&applicationCode=%s', url, appCode);
      url = urlSigner.getSignedURL(url, secretKey, json);

      let responseContent = [];
      operation(url, json)
        .on('error', function(err) {
          reject (err);
        })
        .on('data', function(data) {
          responseContent.push(data.toString());
        })
        .on('end', function() {
          responseContent = responseContent.join('');
          let jsonResult = JSON.parse(responseContent);
          if (jsonResult['status'] !== 'OK') {
            reject(Error(responseContent));
          } else {
            resolve(jsonResult);
          }
        });
      });
  };

  return {

    get: function(url, json) {
      return execute(function(url, qs) {
        return request({ url:url, qs: qs});
      }, url, json);
    },

    post: function (url, json) {
      return execute(function(url, json) {
        return request.post({ url: url, form: json});
      }, url, json);
    }
  }

})();
