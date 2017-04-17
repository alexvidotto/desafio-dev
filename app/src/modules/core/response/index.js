//
// Normalize response API
//

'use strict';

const
  wagner       = require('wagner-core');

module.exports = (function (){
  return wagner.invoke(function (logger) {

    let
      logErrors = process.env.LOG_REQ_ERRORS || true,
      logAll    = process.env.LOG_REQ_ALL    || false;

    function respond(res, promiseChain) {
      Promise.resolve().then(function (){
          return promiseChain()
      })
      .then(function (result) {
        withOk(res, result);
      })
      .catch(function (error) {
        withError(res, error);
      });
    }

    function withOk(res, result) {
      if (logAll) {
        logger.log(result);
      }
      res.json({
        code  : 200,
        status: 'OK',
        result: result || []
      });
    };

    function withError(res, e) {
      if (logAll || logErrors) {
        logger.error(e);
      }
      let msg = e.message || e;
      res.status(500).json({
        code  : 500,
        status: 'ERROR',
        error : msg
      });
    };

    function withNotFound(res) {
      res.status(404).json({
        code  : 404,
        status: 'NOT FOUND'
      });
    };

    return {
      'respond'     : respond,
      'withError'   : withError,
      'withOk'      : withOk,
      'withNotFound': withNotFound
    }
  });

})();
