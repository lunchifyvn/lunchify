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
    var userPrefers = user.prefers.map(prefer => {
      return {type: prefer.type, ref: prefer.ref};
    });
    var originPrefers = origin.prefers.map(prefer => {
      return {type: prefer.type, ref: prefer.ref};
    });

    var inter = _.intersection(userPrefers, originPrefers)
    console.log(userPrefers);
    console.log(originPrefers);
    console.log(inter);
    if (inter.length > 0) {
      console.log('matched');
      return true;
    }
  });
}

module.exports = {
  matchProfile: matchProfile,
};
