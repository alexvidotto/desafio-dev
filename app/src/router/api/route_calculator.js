'use strict';

const
  express          = require('express'),
  router           = express.Router(),
  service          = require('../../modules/route_calculator'),
  response         = require('../../modules/core/response'),

  CALC_ROUTE  = '/route/calculate',
  GEOCODE     = '/address/geocode',
  GEOCODEALL  = '/address/geocodeall'
;

router.post(CALC_ROUTE, function (req, res) {
  response.respond(res, function () {
    return service.calc({'nome': 'alex'});
  });
});

router.get(GEOCODE, function (req, res) {
  response.respond(res, function () {
    let query = req.query.q;
    return service.geocode(query);
  });
});

router.post(GEOCODEALL, function (req, res) {
  response.respond(res, function () {
    let addresses = req.body.addresses;
    return service.geocode(addresses);
  });
});

module.exports = router;
