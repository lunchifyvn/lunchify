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
function suggestion(origin, group) {
  return group;
}

module.exports = function(User) {
  User.prototype.suggestion = function(cb) {
    // get the profile of this user
    this.prefers((err, instances) => {
      var userProfile = {
        prefers: instances,
        userId: this.id,
        location: {long: 0, lat: 0},
      };

      // get the profile of other users
      User.find({
        where: {id: {inq: userProfile.id}}, // except the user himself
        include: 'prefers', // include the prefers
        fields: {id: true, prefers: true}, // select id and prefer and location
      }, (err, instances) => {
        if (err) {
          return cb(err);
        }
        console.log('userProfile', userProfile);
        console.log('instances', instances);
        cb(null, []);
      });
    });
  };

  User.remoteMethod('suggestion',
    {
      http: {path: '/suggestion', verb: 'get'},
      description: 'Get all user devices',
      accepts: [],
      isStatic: false,
      returns: {type: 'array', root: true},
    }
  );
};
