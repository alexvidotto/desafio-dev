'use strict';

const
  express           = require('express')
  ,router           = express.Router()
  ,service          = require('../../../modules/api/route')
  ,response         = require('../../../modules/core/response')

  , CALCULATE_ACTION = '/calculate'
;

router.post(CALCULATE_ACTION, function (req, res) {
  response.respond(res, function () {
    let parameters = req.body;
    return service.summarize(parameters);
  });
});

module.exports = router;
