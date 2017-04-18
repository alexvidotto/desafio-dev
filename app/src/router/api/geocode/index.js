'use strict';

const
  express           = require('express')
  ,router           = express.Router()
  ,service          = require('../../../modules/api/geocode')
  ,response         = require('../../../modules/core/response')
  ,url              = require('url')

  ,GEOCODE_ACTION     = '/geocode'
;

router.get(GEOCODE_ACTION, function (req, res) {
  response.respond(res, function () {
    let query = url.parse(req.originalUrl).query;
    return service.geocode(query);
  });
});

module.exports = router;
