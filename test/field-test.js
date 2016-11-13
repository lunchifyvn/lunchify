var app = require('../server/server');
var assert = require('assert');

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
      assert.ifError(err);
      done();
    });
  });
});
