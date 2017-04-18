//
// Wrap maplink security requests
//

'use strict';

const
  request       = require('request')
  ,util         = require('util')
  ,urlSigner    = require('../security/urlsigner');

module.exports = function(applicationCode, secretToken) {

  let
    appCode    = applicationCode || process.env.MAPLINK_APP_CODE
    ,secretKey = secretToken     || process.env.MAPLINK_SECRET_KEY;

  function execute (operation, url, json) {
    return new Promise(function (resolve, reject) {

      if (!appCode || !secretKey) {
        reject('required env vars was not found');
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
          try {
            responseContent = responseContent.join('');
            let jsonResult = JSON.parse(responseContent);
            if ('status' in jsonResult) {
              let status = jsonResult['status'];
              if (status.code && status.code !== 'OK' || !status.code && status !== 'OK') {
                throw Error(responseContent);
              } else {
                resolve(jsonResult);
              }
            } else {
              throw Error(responseContent);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
  };

  return {

    get: function(url, json) {
      return execute(function(url, qs) {
        return request({ url:url, qs: qs});
      }, url, json);
    }

    ,post: function (url, json) {
      return execute(function(url, json) {
        return request.post({ url: url, form: json});
      }, url, json);
    }
  }
};
