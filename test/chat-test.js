var app = require('../server/server');
var should = require('should');
var User = app.models.user;
var Event = app.models.event;

function req(verb, url) {
  return require('supertest')(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
};

var user1 = {
  email: 'user10@dev.dev',
  username: 'user10',
  password: 'user10pass',
};
var user2 = {
  email: 'user20@dev.dev',
  username: 'user20',
  password: 'user20pass',
};

var user1User, user2User, event1;

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
            // create an event for user1 and user2
            event1 = {
              from: user1User.userId,
              to: user2User.userId,
            };
            Event.upsert(event1, (err, res) => {
              event1 = {
                id: res.id,
                from: user1User.userId,
                to: user2User.userId,
                status: 'accept',
              };
              Event.upsert(event1, () => {
                done(err);
              });
            });
          });
        });
      });
    });
  });

  it('should allow user1 to update the chat', done => {
    req('post',
    `/api/events/${event1.id}/chats?access_token=${user1User.id}`)
    .send({
      from: user1User.userId,
      text: 'user 1 message'
    })
    .expect(200, (err, res) => {
      should.ifError(err);
      done();
    })
  });
});
