var matching = require('../../lib/matching');

module.exports = function(User) {
  User.prototype.suggestion = function(cb) {
    // get the profile of this user
    this.locations.findOne({
      order: 'createdAt DESC',
    }, (err, location) => {
      if (err) {
        return cb(err);
      }
      this.prefers((err, perfers) => {
        var userProfile = {
          prefers: perfers,
          id: this.id,
          location: location,
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
          
          // finally, find the suggestion
          var suggestion = matching.matchProfile(userProfile, users);
          cb(null, suggestion);
        });
      });
    });
  };

  function getRecentLocation(locations) {
    return _.reduce(locations, (max, location) => {
      if(max === undefined) {
        return location;
      } else if (max.getTime() < location.createAt.getTime()) {
        return event;
      } else {
        return max;
      }
    }, undefined);
  }

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
