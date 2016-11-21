var _ = require('underscore');

/**
 * suggestion function
 * define a user as
 * {id: id, prefers: [], location: {}}
 * prefer: {type: field/topic, id: id}
 *
 * @param {any} origin user
 * @param {any} group [user]
 *
 * returns an array of user: [user]
 */
var DEFAULT_DISTANCE = 500;
function matchProfile(origin, group, maxDistance) {
  maxDistance = maxDistance | DEFAULT_DISTANCE;
  return group.filter(user => {
    return distanceBetween2Users(user, origin) <= maxDistance;
  })
  .filter(user => {
    var originPrefers = origin.prefers.map(prefer => {
      return {type: prefer.type, ref: prefer.ref};
    });

    var userPrefers = user.prefers
      .map(prefer => {
        return {type: prefer.type, ref: prefer.ref};
      })
      .filter(obj => {
        if (_.where(originPrefers, obj).length > 0) {
          return true;
        }
      });

    if (userPrefers.length > 0) {
      return true;
    }
  });
}

function distanceBetween2Users(user, other) {
  return distanceBetween2Locations(user.location, other.location);
}
/***
 * Calculate distance between two location
 * location {lat, lon}
 */
function distanceBetween2Locations(origin, destination) {
  return getDistanceFromLatLonInMeters(origin.lat, origin.long,
    destination.lat, destination.long);
}

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  var R = 6371000; // Radius of the earth in meter
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in meter
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = {
  matchProfile: matchProfile,
};
