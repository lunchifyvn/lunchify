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
        console.log(user1User);
        done(err);
      });
    });
  });

  it('should allow user to select interesting field', done => {
    req('post', `/api/${user1User.userId}/prefer?access_token=${user1User.id}`)
    .send({field: 1})
    .expect(200, (err, _res) => {
      should.ifError(err);
      done();
    });
  });

  it('should not allow user to select not in the list field',
  done => {
    req('post', `/api/${user1User.userId}/prefer?access_token=${user1User.id}`)
    .send({field: 100})
    .expect(400, (err, res) => {
      should.ifError(err);
      res.should.have.property('body').which.is.an.Array();
      done();
    });
  });
});
