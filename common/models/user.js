var matching = require('../../lib/matching');

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
        where: {id: {neq: userProfile.userId}}, // except the user himself
        include: 'prefers', // include the prefers
        fields: {id: true, prefers: true}, // select id and prefer and location
      }, (err, users) => {
        // console.log(users);
        // if (err) {
        //   return cb(err);
        // }
        // var suggestion = matching.matchProfile(userProfile, users);
        // console.log(suggestion);
        // cb(null, suggestion);
        cb(null, users);
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
