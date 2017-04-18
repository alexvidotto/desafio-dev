'use strict';

const
  _      = require('lodash')
  ,util  = require('util');

module.exports = function (parameters) {

  let self = this;

  self.defaultParameters = {
    fuelPrice: 4,
    kmL      : 10,
    vehicle  : 'car'
  };

  self.routeInfo = {
    distance: 0,
    fuelPrice: 0,
    duration:  0,
    tolls: { qtt: 0, price: 0 },
    settings: null
  };

  _.assign(self.defaultParameters, parameters);

  self.collectRouteInfo = function (result) {
    for (let i = 0, route; route = result.routes[i]; i++) {
      self.routeInfo.distance += route.summary.distance;
      self.routeInfo.duration += route.summary.duration;
      if (route.summary.tollFees && route.summary.tollFees.length) {
        self.routeInfo.tolls.qtt += route.summary.tollFees.length;
        for (let z = 0, fee; fee = route.summary.tollFees[z]; z++) {
          if (self.defaultParameters.vehicle in fee.prices) {
            self.routeInfo.tolls.price += fee.prices[self.defaultParameters.vehicle];
          }
        }
      }
    }
    self.routeInfo.fuelPrice = (self.routeInfo.distance / self.defaultParameters.kmL) * self.defaultParameters.fuelPrice
    self.routeInfo.settings  = self.defaultParameters;
  };

  self.extractWaypoints = function (geocodeResult) {
    let waypoints = [];
    for (let i = 0, result; result = geocodeResult[i]; i++) {
      if (!result.results.length) {
        throw Error("Some address was not found");
      }
      let adrs = result.results[0];
      result.results
      waypoints.push(self.stringifyWaypoint(adrs.location, i));
    }
    return waypoints.join('&');
  };

  self.stringifyWaypoint = function (location, index) {
    return util.format("waypoint.%s.latlng=%s,%s", index, location.lat, location.lng);
  };

  self.summarize = function (routes) {
    self.collectRouteInfo(routes);
    return self.routeInfo;
  }
};
