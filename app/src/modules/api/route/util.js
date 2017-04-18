'use strict';

const
  util = require('util');

function extractWaypoints (geocodeResult) {
  let waypoints = [];
  for (let i = 0, result; result = geocodeResult[i]; i++) {
    if (!result.results.length) {
      throw Error("Some address was not found");
    }
    let adrs = result.results[0];
    result.results
    waypoints.push(stringifyWaypoint(adrs.location, i));
  }
  return waypoints.join('&');
}

function stringifyWaypoint (location, index) {
  return util.format("waypoint.%s.latlng=%s,%s", index, location.lat, location.lng);
};

exports.extractWaypoints  = extractWaypoints;
exports.stringifyWaypoint = stringifyWaypoint
