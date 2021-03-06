var app = require('../server/server');
var should = require('should');
var User = app.models.user;

function req(verb, url) {
  return require('supertest')(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
};

var user1 = {
  email: 'user1@dev.dev',
  username: 'user1',
  password: 'user1pass',
};
var user2 = {
  email: 'user2@dev.dev',
  username: 'user2',
  password: 'user2pass',
};
var user1User, user2User;

describe('Event API', () => {
  before(done => {
    // user1
    User.upsert(user1, () => {
      req('post', '/api/users/login')
      .send(user1)
      .expect(200, function(err, res) {
        user1User = res.body;
        // user2
        User.upsert(user2, () => {
          req('post', '/api/users/login')
          .send(user2)
          .expect(200, function(err, res) {
            user2User = res.body;
            done(err);
          });
        });
      });
    });
  });

  it.skip('should not allow annonymous user to create event', done => {
    req('post',
    '/api/events?access_token=faketoken')
    .send({
      from: user1User.userId,
      to: user2User.userId,
    })
    .expect(401, (err, _body) => {
      should.ifError(err);
      done();
    });
  });

  it('should allow user1 to create event with user2', done => {
    req('post',
    `/api/events?access_token=${user1User.id}`)
    .send({
      from: user1User.userId,
      to: user2User.userId,
    })
    .expect(200, (err, res) => {
      should.ifError(err);
      res.body.should.have.property('status').equal('pending');
      done();
    });
  });

  it('should allow user2 to get the list of pending event', done => {
    req('get',
    `/api/events?access_token=${user1User.id}`)
    .expect(200, (err, res) => {
      should.ifError(err);
      res.body.should.be.an.Array();
      done();
    });
  });

  it.skip('should allow user2 to get the list of ' +
  'pending event related to user2', done => {
    req('get',
    `/api/events?filter[where][status]=pending&access_token=${user1User.id}`)
    .expect(200, (err, res) => {
      should.ifError(err);
      res.body.should.be.an.Array();
      done();
    });
  });

  it('should allow user2 to accept one invitation', done => {
    // user1 invite
    req('post',
    `/api/events?access_token=${user1User.id}`)
    .send({
      from: user1User.userId,
      to: user2User.userId,
    })
    .expect(200, (err, _res) => {
      should.ifError(err);
      // user2 get the list of inviate
      req('get',
      `/api/events?filter[where][status]=pending&access_token=${user1User.id}`)
      .expect(200, (err, res) => {
        should.ifError(err);

        // get the latest invite
        var event = res.body[res.body.length - 1];
        event.status = 'accept';

        // update the inviate
        req('put',
        `/api/events/${event.id}?access_token=${user1User.id}`)
        .send(event)
        .expect(200, (err, _res) => {
          should.ifError(err);
          done();
        });
      });
    });
  });
});
