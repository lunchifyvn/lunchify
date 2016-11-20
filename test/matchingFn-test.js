var matchingFn = require('../lib/matching');
require('should');

describe('Matching Profile Fn', () => {
  it('should provide basic matching for field with all users', () => {
    var origin = {
      prefers: [
        {type: 'field', ref: 7, userId: 1, id: 1},
        {type: 'field', ref: 112, userId: 1, id: 36},
      ],
      userId: 1,
      location: {
        long: 0,
        lat: 0,
      },
    };
    var group = [{
      prefers: [
        {type: 'field', ref: 7, userId: 2, id: 12},
        {type: 'field', ref: 112, userId: 2, id: 362},
      ],
      userId: 2,
      location: {
        long: 0,
        lat: 0,
      },
    }, {
      prefers: [
        {type: 'field', ref: 7, userId: 3, id: 13},
        {type: 'field', ref: 112, userId: 3, id: 363},
      ],
      userId: 3,
      location: {
        long: 0,
        lat: 0,
      },
    }];

    var matchedProfile = matchingFn.matchProfile(origin, group);
    matchedProfile.should.be.an.Array();
    matchedProfile.should.deepEqual(group);
  });

  it('should provide basic matching for field with one users', () => {
    var origin = {
      prefers: [
        {type: 'field', ref: 7, userId: 1, id: 1},
        {type: 'field', ref: 112, userId: 1, id: 36},
      ],
      userId: 1,
      location: {
        long: 0,
        lat: 0,
      },
    };
    var group = [{
      prefers: [
        {type: 'field', ref: 11, userId: 2, id: 362},
      ],
      userId: 2,
      location: {
        long: 0,
        lat: 0,
      },
    }, {
      prefers: [
        {type: 'field', ref: 7, userId: 3, id: 13},
      ],
      userId: 3,
      location: {
        long: 0,
        lat: 0,
      },
    }];

    var matchedProfile = matchingFn.matchProfile(origin, group);
    matchedProfile.should.be.an.Array();
    matchedProfile.should.deepEqual([group[1]]);
  });
});
