module.exports = function (app) {

  const
    ROUTE_API_PATH    = '/api/routes'
    ,GEOCODE_API_PATH = '/api/geocoder';

  app.use(ROUTE_API_PATH,
    require('./api/route'));

  app.use(GEOCODE_API_PATH,
    require('./api/geocode'));
};
