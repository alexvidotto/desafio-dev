'use strict';

const
  express          = require('express'),
  router           = express.Router(),
  service          = require('../../modules/routes'),
  response         = require('../../modules/core/response'),

  CALC_ROUTE  = '/calc',
  GEOCODE     = '/geocode'
;

router.get(CALC_ROUTE, function (req, res) {
  response.respond(res, function () {
    return service.calc({'nome': 'alex'});
  });
});

router.get(GEOCODE, function (req, res) {
  response.respond(res, function () {
    return service.geocode({'sobrenome': 'vidotto'});
  });
});

module.exports = router;
