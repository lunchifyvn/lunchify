/**
 * suggestion function
 * define a user as
 * {userId: id, prefers: [], location: {}}
 * prefer: {type: field/topic, id: id}
 *
 * @param {any} origin user
 * @param {any} group [user]
 *
 * returns an array of user: [user]
 */
function suggestion(origin, group) {

}
module.exports = function(User) {
  User.prototype.suggestion = function(cb) {
    console.log('prefer');
    console.log(this.prefers);
    console.log(this.username);
    cb(null, []);
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
