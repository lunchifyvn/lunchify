var app = require('../server/server');
var should = require('should');
var User = app.models.user;
var faker = require('faker');

function req(verb, url) {
  return require('supertest')(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
};

describe('Location API', () => {
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

  it('should not allow annonymous user to update user1 location', done => {
    req('post',
    `/api/users/${user1User.userId}/location?access_token=faketoken`)
    .send({
      geo: {
        lat: faker.address.latitude,
        lng: faker.address.longitude,
      },
    })
    .expect(401, (err, _res) => {
      should.ifError(err);
      done();
    });
  });

  it('should allow user to update user1 location', done => {
    req('post',
    `/api/users/${user1User.userId}/location?access_token=${user1User.id}`)
    .send({
      geo: {
        lat: faker.address.latitude,
        lng: faker.address.longitude,
      },
    })
    .expect(200, (err, _res) => {
      should.ifError(err);
      done();
    });
  });
});
