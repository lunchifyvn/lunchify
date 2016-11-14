var app = require('../server/server');
var should = require('should');

function req(verb, url) {
  return require('supertest')(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
};

describe('Field API', () => {
  it('should not allow annonymous user to get fields', done => {
    req('get', '/api/fields')
    .expect(401, (err, _res) => {
      should.ifError(err);
      done();
    });
  });

  it.skip('should allow registered user to get fields', done => {
    req('get', '/api/fields')
    .expect(200, (err, res) => {
      should.ifError(err);
      res.should.be.an.Array();
      done();
    });
  });
});
