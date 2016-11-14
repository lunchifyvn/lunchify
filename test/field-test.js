var app = require('../server/server');
var should = require('should');
var User = app.models.user;

function req(verb, url) {
  return require('supertest')(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
};

describe('Field API', () => {
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

  it('should not allow annonymous user to get fields', done => {
    req('get', '/api/fields')
    .expect(401, (err, _res) => {
      should.ifError(err);
      done();
    });
  });

  it('should allow registered user to get fields', done => {
    req('get', `/api/fields?access_token=${user1User.id}`)
    .expect(200, (err, res) => {
      should.ifError(err);
      res.should.have.property('body').which.is.an.Array();
      done();
    });
  });
});
