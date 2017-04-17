module.exports = function (app) {

  // map all API paths
  app.use('/api', require('./api/route_calculator'));
};
