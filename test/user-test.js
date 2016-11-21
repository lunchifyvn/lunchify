var app = require('../server/server');
var should = require('should');
var User = app.models.user;

function req(verb, url) {
  return require('supertest')(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
};

describe('User select API', () => {
  var user1 = {
    email: 'user1@dev.dev',
    username: 'user1',
    password: 'user1pass',
  };
  var user1User;
  before(done => {
    User.upsert(user1, () => {
      req('post', '/api/users/login')
      .send(user1)
      .expect(200, function(err, res) {
        user1User = res.body;
        done(err);
      });
    });
  });

  it('should allow user to get the identities', done => {
    req('get',
    `/api/users/${user1User.userId}/identities?access_token=${user1User.id}`)
    .expect(200, (err, _res) => {
      should.ifError(err);
      done();
    });
  });
});
