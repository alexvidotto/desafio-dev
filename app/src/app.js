const
 factory = require('./modules/factory');

factory.register();

const
  express      = require('express'),
  morgan       = require('morgan'),
  bodyParser   = require('body-parser'),
  router       = require('./router'),
  logger       = require('./modules/logger/'),
  response     = require('./modules/core/response'),
  app          = express()
;

logger.initialize(app, {
  transportFileParams: {
    filename: __dirname + '/app_log.log'
  }
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// initialize routes
router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  response.withNotFound(res)
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  response.withError(res, res.locals.error);
});

module.exports = app;
