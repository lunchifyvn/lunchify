
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
  console.log('origin', origin);
  console.log('group', group);
  return group;
}

module.exports = {
  matchProfile: matchProfile,
};
