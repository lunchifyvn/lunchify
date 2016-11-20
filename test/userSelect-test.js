var app = require('../server/server');
var should = require('should');
var faker = require('faker');
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

  it('should allow user to select interesting field', done => {
    var fieldModel = app.models.field;
    fieldModel.updateOrCreate({
      name: faker.lorem.words(),
    }, (err, fieldInstance) => {
      should.ifError(err);
      req('post',
      `/api/users/${user1User.userId}/prefers?access_token=${user1User.id}`)
      .send({
        type: 'field',
        ref: fieldInstance.id,
      })
      .expect(200, (err, _res) => {
        should.ifError(err);
        done();
      });
    });
  });

  it('should not allow user to select interesting field when missing the type',
  done => {
    var fieldModel = app.models.field;
    fieldModel.updateOrCreate({
      name: faker.lorem.words(),
    }, (err, fieldInstance) => {
      should.ifError(err);
      req('post',
      `/api/users/${user1User.userId}/prefers?access_token=${user1User.id}`)
      .send({
        ref: fieldInstance.id,
      })
      .expect(422, (err, _res) => {
        should.ifError(err);
        done();
      });
    });
  });

  it('should not allow user to select interesting field when missing the ref',
  done => {
    req('post',
    `/api/users/${user1User.userId}/prefers?access_token=${user1User.id}`)
    .send({
      type: 'topic',
    })
    .expect(422, (err, _res) => {
      should.ifError(err);
      done();
    });
  });

  it('should not allow user to select interesting field ' +
  'when type is not topic or field',
  done => {
    var fieldModel = app.models.field;
    fieldModel.updateOrCreate({
      name: faker.lorem.words(),
    }, (err, fieldInstance) => {
      should.ifError(err);
      req('post',
      `/api/users/${user1User.userId}/prefers?access_token=${user1User.id}`)
      .send({
        type: faker.lorem.word(),
        ref: fieldInstance.id,
      })
      .expect(422, (err, _res) => {
        should.ifError(err);
        done();
      });
    });
  });

  it('should not allow user to select not in the list field',
  done => {
    req('post',
    `/api/users/${user1User.userId}/prefers?access_token=${user1User.id}`)
    .send({
      type: 'topic',
      ref: faker.random.uuid(), // assume the random uuid is not in the list yet
    })
    .expect(422, (err, _res) => {
      should.ifError(err);
      done();
    });
  });

  it('should allow user the get list of her interesting topic/field',
  done => {
    req('get',
    `/api/users/${user1User.userId}/prefers?access_token=${user1User.id}`)
    .expect(200, (err, res) => {
      should.ifError(err);
      res.should.have.property('body').which.is.an.Array();
      done();
    });
  });
});
