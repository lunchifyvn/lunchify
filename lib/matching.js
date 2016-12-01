var _ = require('underscore');

var DEFAULT_DISTANCE = 500000000000;

/**
 * suggestion function
 * define a user as
 * {id: id, prefers: [], location: {}}
 * prefer: {type: field/topic, id: id}
 *
 * @param {any} origin user
 * @param {any} group [user]
 *
 * returns an array of user with metadata: [user]
 *  metadata { distance, [prefer] }
 */

function matchProfile(origin, group, maxDistance) {
  maxDistance = maxDistance | DEFAULT_DISTANCE;

  var groupByDistance = filterByDistance(origin, group, maxDistance);
  var matchedGroup = filterByPrefers(origin, groupByDistance);
  var result = matchedGroup.sort(compareUsers);
  return result;
}

function compareUsers(user, other) {
  console.log('compareUsers');
  var eventsResult = compareListOfEvents(user.events, other.events);
  if (eventsResult !== 0) {
    return eventsResult;
  } else {
    return compareMetadata(user.metadata, other.metadata);
  }
}

function compareListOfEvents(events, other) {
  if (!events && !other) {
    return 0;
  } else if (!other) {
    return 1;
  } else if (!events) {
    return -1;
  } else {
    return compareListOfEventsNonNull(events, other);
  }
}
function compareListOfEventsNonNull(events, other) {
  var max1 = getMaxEvent(events);
  var max2 = getMaxEvent(other);
  var compareMax = compareEvents(max1, max2);
  if (compareMax !== 0) {
    return compareMax;
  } else if (events.length - other.length !== 0) {
    return events.length - other.length;
  } else {
    return getNumberOfArchiveEvents(events) - getNumberOfArchiveEvents(other);
  }
}

function getMaxEvent(events) {
  return _.reduce(events, (max, event) => {
    if (compareEvents(max, event) < 0) {
      return event;
    } else {
      return max;
    }
  }, undefined);
}

function compareEvents(event, other) {
  if (!event && !other) {
    return 0;
  } else if (!other) {
    return 1;
  } else if (!event) {
    return -1;
  } else {
    return compareNonNullEvents(event, other);
  }
}

function compareNonNullEvents(event, other) {
  var statusResult = compareStatus(event.status, other.status);
  if (statusResult !== 0) {
    return statusResult;
  } else {
    return event.updatedAt.getTime() - other.updatedAt.getTime();
  }
}

function compareStatus(status, other) {
  if (status === other) {
    return 0;
  } else if (status === 'pending') {
    return 1;
  } else if (status === 'archive') {
    if (other === 'pending') {
      return -1;
    } else {
      return 1;
    }
  } else if (status === 'accept') {
    if (other === 'cancel') {
      return 1;
    } else {
      return -1;
    }
  } else if (status === 'cancel') {
    return -1;
  }
}

function getNumberOfArchiveEvents(events) {
  return events.filter((event) => {
    return event.status === 'archive';
  }).length;
}

function compareMetadata(meta, other) {
  var preferResult = meta.prefers.length - other.prefers.length;
  if (preferResult !== 0) {
    return preferResult;
  } else {
    return meta.distance - other.distance;
  }
  return 0;
}

function filterByDistance(origin, group, maxDistance) {
  return _.reduce(group, (result, user) => {
    var distance = distanceBetween2Users(user, origin);
    if (distance <= maxDistance) {
      if (user.metadata === undefined) {
        user.metadata = {};
      }
      user.metadata.distance = distance;
      result.push(user);
    }
    return result;
  }, []);
}

function filterByPrefers(origin, group) {
  var originPrefers = origin.prefers.map(prefer2Object);
  return _.reduce(group, (result, user) => {
    var commonPrefers = getCommonPrefers(user, originPrefers);
    if (commonPrefers.length > 0) {
      if (user.metadata === undefined) {
        user.metadata = {};
      }
      user.metadata.prefers = commonPrefers;
      result.push(user);
    }
    return result;
  }, []);
}

function prefer2Object(prefer) {
  return {type: prefer.type, ref: prefer.ref};
}

function prefer2Object(prefer) {
  return {type: prefer.type, ref: prefer.ref};
}

function getCommonPrefers(user, originPrefers) {
  if (user.prefers === undefined) {
    return [];
  }
  return user.prefers
    .map(prefer2Object)
    .filter(obj => {
      if (_.where(originPrefers, obj).length > 0) {
        return true;
      }
    });
}

function distanceBetween2Users(from, to) {
  return distanceBetween2Locations(from.location, to.location);
}
/***
 * Calculate distance between two location
 * location {lat, lon}
 */
function distanceBetween2Locations(origin, destination) {
  if (!origin || !destination) {
    return Number.POSITIVE_INFINITY;
  } else {
    return distanceFromLatLonInMeters(origin.lat, origin.long,
      destination.lat, destination.long);
  }
}

function distanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
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
