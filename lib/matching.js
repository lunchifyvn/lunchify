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
function matchProfile(origin, group) {
  return group.filter(user => {
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

module.exports = {
  matchProfile: matchProfile,
};
