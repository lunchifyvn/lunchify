var matchingFn = require('../lib/matching');
require('should');

describe('Matching Profile Fn', () => {
  it('should check distance between 2 users', () => {
    var origin = {
      prefers: [
        {type: 'field', ref: 7, userId: 1, id: 1},
        {type: 'field', ref: 112, userId: 1, id: 36},
      ],
      userId: 1,
      location: {
        lat: 0,
        long: 0,
      },
    };

    var group = [{
      prefers: [
        {type: 'field', ref: 7, userId: 1, id: 1},
        {type: 'field', ref: 112, userId: 1, id: 36},
      ],
      userId: 2,
      location: {
        lat: 10.4,
        long: 108.4,
      },
    }];

    var matchedProfile = matchingFn.matchProfile(origin, group, 1000);
    matchedProfile.should.be.an.Array();
    matchedProfile.should.be.empty();
  });

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

    var matchedProfile = matchingFn.matchProfile(origin, group, 1000);
    matchedProfile.should.be.an.Array();
    matchedProfile.should.deepEqual([group[1]]);
  });

  it('should check distance and prefers', () => {
    var origin = {
      prefers: [
        {type: 'field', ref: 7, userId: 1, id: 1},
        {type: 'field', ref: 112, userId: 1, id: 36},
      ],
      userId: 1,
      location: {
        lat: 10.830876,
        long: 106.680333,
      },
    };

    var group = [
      {
        prefers: [
          {type: 'field', ref: 7, userId: 3, id: 13},
        ],
        userId: 2,
        location: {
          lat: 10.830795,
          long: 106.680532,
        },
      },
      {
        prefers: [
          {type: 'field', ref: 7, userId: 3, id: 13},
        ],
        userId: 3,
        location: {
          lat: 10.4,
          long: 108.4,
        },
      },
    ];

    var matchedProfile = matchingFn.matchProfile(origin, group, 1000);
    matchedProfile.should.be.an.Array();
    matchedProfile.should.deepEqual([group[0]]);
  });
});
