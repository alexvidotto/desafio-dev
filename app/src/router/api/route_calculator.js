'use strict';

const
  express          = require('express'),
  router           = express.Router(),
  service          = require('../../modules/route_calculator'),
  response         = require('../../modules/core/response'),
  url              = require('url'),

  CALC_ROUTE  = '/route/calculate',
  GEOCODE     = '/address/geocode'
;

router.get(GEOCODE, function (req, res) {
  response.respond(res, function () {
    let query = url.parse(req.originalUrl).query;
    return service.geocode(query);
  });
});

router.post(CALC_ROUTE, function (req, res) {
  response.respond(res, function () {
    let parameters = req.body;
    return service.geocode(parameters.addresses);
  });
});

module.exports = router;
