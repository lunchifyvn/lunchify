var matching = require('../../lib/matching');

module.exports = function(User) {
  User.prototype.suggestion = function(cb) {
    // get the profile of this user
    this.prefers((err, instances) => {
      var userProfile = {
        prefers: instances,
        id: this.id,
        location: {long: 0, lat: 0},
      };

      // get the profile of other users
      User.find({
        where: {id: {neq: userProfile.id}}, // except the user himself
        include: ['prefers', 'locations'], // include the prefers
        fields: {
          id: true,
          prefers: true,
          locations: true,
        }, // select id and prefer and location
      }, (err, users) => {
        if (err) {
          return cb(err);
        }
        var suggestion = matching.matchProfile(userProfile, users);
        cb(null, suggestion);
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
