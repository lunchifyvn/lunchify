var rewire = require('rewire');
require('should');

var matchingFn = rewire('../lib/matching');
var distanceBetween2Locations =
  matchingFn.__get__('distanceBetween2Locations');
var distanceFromLatLonInMeters =
  matchingFn.__get__('distanceFromLatLonInMeters');
var distanceBetween2Users =
  matchingFn.__get__('distanceBetween2Users');

var compareUsers = matchingFn.__get__('compareUsers');
var compareEvents = matchingFn.__get__('compareEvents');
var compareListOfEvents = matchingFn.__get__('compareListOfEvents');
var compareMetadata = matchingFn.__get__('compareMetadata');

describe('Compare 2 events', () => {
  it('should return 0 if two events are empty', () => {
    compareEvents(null, undefined).should.deepEqual(0);
  });

  it('should any thing is greater than nothing', () => {
    compareEvents({}, undefined).should.above(0);
  });

  it('the order of status should be pending > archive > accept > cancel', () => {
    var pending = {
      from: {},
      to: {},
      status: 'pending',
    };

    var archive = {
      from: {},
      to: {},
      status: 'archive',
    };

    var cancel = {
      from: {},
      to: {},
      status: 'cancel',
    };

    var accept = {
      from: {},
      to: {},
      status: 'accept',
    };

    compareEvents(pending, archive).should.above(0);
    compareEvents(pending, cancel).should.above(0);
    compareEvents(pending, accept).should.above(0);

    compareEvents(archive, accept).should.above(0);
    compareEvents(archive, cancel).should.above(0);
    compareEvents(accept, cancel).should.above(0);
  });

  it('If the statuses are the same, the most recently updated will win', () => {
    var event1 = {
      from: {},
      to: {},
      status: 'pending',
      updatedAt: new Date(2016, 11, 17),
    };

    var event2 = {
      from: {},
      to: {},
      status: 'pending',
      updatedAt: new Date(2016, 11, 18),
    };

    compareEvents(event1, event2).should.below(0);
  });

  it('should return 0 if two events are the same', () => {
    var event1 = {
      from: {},
      to: {},
      status: 'pending',
      updatedAt: new Date(2016, 11, 18),
    };

    var event2 = {
      from: {},
      to: {},
      status: 'pending',
      updatedAt: new Date(2016, 11, 18),
    };

    compareEvents(event1, event2).should.deepEqual(0);
  });
});

describe('Compare 2 list of events', () => {
  it('should return 0 when compare 2 undefined', () => {
    compareListOfEvents(undefined, undefined).should.deepEqual(0);
  });

  it('should compare by greatest event first', () => {
    var events1 = [
      {
        status: 'pending',
        updatedAt: new Date(2016, 11, 18),
      },
      {
        status: 'active',
        updatedAt: new Date(2016, 11, 19),
      },
    ];
    var events2 = [
      {
        status: 'active',
        updatedAt: new Date(2016, 11, 18),
      },
      {
        status: 'active',
        updatedAt: new Date(2016, 11, 19),
      },
    ];

    compareListOfEvents(events1, events2).should.above(0);
  });

  it('should compare events length if greatest events are the same', () => {
    var events1 = [
      {
        status: 'pending',
        updatedAt: new Date(2016, 11, 18),
      },
      {
        status: 'active',
        updatedAt: new Date(2016, 11, 19),
      },
      {
        status: 'cancel',
        updatedAt: new Date(2016, 11, 19),
      },
    ];
    var events2 = [
      {
        status: 'pending',
        updatedAt: new Date(2016, 11, 18),
      },
      {
        status: 'active',
        updatedAt: new Date(2016, 11, 19),
      },
    ];

    compareListOfEvents(events1, events2).should.above(0);
  });

  it('If 2 events have the same max events and size,' +
    'which has more archive events will win', () => {
    var events1 = [
      {
        status: 'pending',
        updatedAt: new Date(2016, 11, 18),
      },
      {
        status: 'active',
        updatedAt: new Date(2016, 11, 19),
      },
      {
        status: 'archive',
        updatedAt: new Date(2016, 11, 19),
      },
    ];
    var events2 = [
      {
        status: 'pending',
        updatedAt: new Date(2016, 11, 18),
      },
      {
        status: 'active',
        updatedAt: new Date(2016, 11, 19),
      },
      {
        status: 'cancel',
        updatedAt: new Date(2016, 11, 19),
      },
    ];

    compareListOfEvents(events1, events2).should.above(0);
  });
  it('Two lists are the same should be equal', () => {
    var events1 = [
      {
        status: 'pending',
        updatedAt: new Date(2016, 11, 18),
      },
      {
        status: 'active',
        updatedAt: new Date(2016, 11, 19),
      },
      {
        status: 'archive',
        updatedAt: new Date(2016, 11, 19),
      },
    ];
    var events2 = [
      {
        status: 'pending',
        updatedAt: new Date(2016, 11, 18),
      },
      {
        status: 'active',
        updatedAt: new Date(2016, 11, 19),
      },
      {
        status: 'archive',
        updatedAt: new Date(2016, 11, 19),
      },
    ];

    compareListOfEvents(events1, events2).should.deepEqual(0);
  });
});

describe('Compare metadata', () => {
  it('should return 0 if two metadata is the same', () => {
    var meta1 = {
      distance: 100,
      prefers: [{type: 'field', ref: 7}],
    };
    var meta2 = {
      distance: 100,
      prefers: [{type: 'field', ref: 7}],
    };

    compareMetadata(meta1, meta2).should.deepEqual(0);
  });

  it('should compare size of prefers first', () => {
    var meta1 = {
      distance: 100,
      prefers: [{type: 'field', ref: 7}, {type: 'field', ref: 7}],
    };
    var meta2 = {
      distance: 102,
      prefers: [{type: 'field', ref: 7}],
    };

    compareMetadata(meta1, meta2).should.above(0);
  });

  it('should compare distance if prefers size are the same', () => {
    var meta1 = {
      distance: 100,
      prefers: [{type: 'field', ref: 7}],
    };
    var meta2 = {
      distance: 102,
      prefers: [{type: 'field', ref: 7}],
    };

    compareMetadata(meta1, meta2).should.below(0);
  });
});

describe('Compare 2 users', () => {
  it('should return 0 if 2 users are the same', () => {
    var user1 = {
      events: [
        {
          from: {},
          to: {},
          status: 'pending',
          updatedAt: new Date(2016, 11, 18),
        },
      ],
      metadata: {
        distance: 300,
        prefers: [{type: 'field', ref: 7}],
      },
    };
    var user2 = {
      events: [
        {
          from: {},
          to: {},
          status: 'pending',
          updatedAt: new Date(2016, 11, 18),
        },
      ],
      metadata: {
        distance: 300,
        prefers: [{type: 'field', ref: 7}],
      },
    };
    compareUsers(user1, user2).should.deepEqual(0);
  });

  it('should let user1 > user2 by events', () => {
    var user1 = {
      events: [
        {
          status: 'pending',
          updatedAt: new Date(2016, 11, 18),
        },
      ],
      metadata: {
        distance: 300,
        prefers: [{type: 'field', ref: 7}],
      },
    };
    var user2 = {
      metadata: {
        distance: 300,
        prefers: [{type: 'field', ref: 7}],
      },
    };
    compareUsers(user1, user2).should.above(0);
  });

  it('should let user1 > user2 by distance', () => {
    var user1 = {
      events: [
        {
          from: {},
          to: {},
          status: 'pending',
          updatedAt: new Date(2016, 11, 18),
        },
      ],
      metadata: {
        distance: 400,
        prefers: [{type: 'field', ref: 7}],
      },
    };
    var user2 = {
      events: [
        {
          from: {},
          to: {},
          status: 'pending',
          updatedAt: new Date(2016, 11, 18),
        },
      ],
      metadata: {
        distance: 300,
        prefers: [{type: 'field', ref: 7}],
      },
    };
    compareUsers(user1, user2).should.above(0);
  });

  it('should let user1 > user2 by prefers', () => {
    var user1 = {
      events: [
        {
          from: {},
          to: {},
          status: 'pending',
          updatedAt: new Date(2016, 11, 18),
        },
      ],
      metadata: {
        distance: 400,
        prefers: [{type: 'field', ref: 7}, {type: 'field', ref: 7}],
      },
    };
    var user2 = {
      events: [
        {
          from: {},
          to: {},
          status: 'pending',
          updatedAt: new Date(2016, 11, 18),
        },
      ],
      metadata: {
        distance: 400,
        prefers: [{type: 'field', ref: 7}],
      },
    };
    compareUsers(user1, user2).should.above(0);
  });

  it('should let user1 > user2 by events', () => {
    var user1 = {
      events: [
        {
          from: {},
          to: {},
          status: 'cancel',
          updatedAt: new Date(2016, 11, 16),
        },
        {
          from: {},
          to: {},
          status: 'pending',
          updatedAt: new Date(2016, 11, 18),
        },
      ],
      metadata: {
        distance: 400,
        prefers: [{type: 'field', ref: 7}],
      },
    };
    var user2 = {
      events: [
        {
          from: {},
          to: {},
          status: 'pending',
          updatedAt: new Date(2016, 11, 18),
        },
      ],
      metadata: {
        distance: 400,
        prefers: [{type: 'field', ref: 7}],
      },
    };
    compareUsers(user1, user2).should.above(0);
  });

  it('should let user1 > user2 by events', () => {
    var user1 = {
      events: [
        {
          from: {},
          to: {},
          status: 'cancel',
          updatedAt: new Date(2016, 11, 16),
        },
        {
          from: {},
          to: {},
          status: 'pending',
          updatedAt: new Date(2016, 11, 18),
        },
      ],
      metadata: {
        distance: 400,
        prefers: [{type: 'field', ref: 7}],
      },
    };
    var user2 = {
      events: [
        {
          from: {},
          to: {},
          status: 'cancel',
          updatedAt: new Date(2016, 11, 16),
        },
        {
          from: {},
          to: {},
          status: 'cancel',
          updatedAt: new Date(2016, 11, 16),
        },
        {
          from: {},
          to: {},
          status: 'archive',
          updatedAt: new Date(2016, 11, 18),
        },
      ],
      metadata: {
        distance: 400,
        prefers: [{type: 'field', ref: 7}],
      },
    };
    compareUsers(user1, user2).should.above(0);
  });
});

describe('Distance between two locations Calculation Fn', () => {
  it('Shoul be equal to lat and long calculation', () => {
    var from = {lat: 0, long: 0};
    var to = {lat: 100, long: 20};
    var distance = distanceBetween2Locations(from, to);

    distance.should.deepEqual(distanceFromLatLonInMeters(0, 0, 100, 20));
  });
});

describe('Distance between two user Fn', () => {
  it('should be equal to distance between user location', () => {
    var from = {lat: 0, long: 0};
    var to = {lat: 100, long: 20};

    var user1 = {
      location: from,
    };
    var user2 = {
      location: to,
    };
    var distance = distanceBetween2Users(user1, user2);
    var distance2Locations = distanceBetween2Locations(from, to);

    distance.should.deepEqual(distance2Locations);
  });
});

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
    console.log(matchedProfile);
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

  it('should have metadata in result', () => {
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
    matchedProfile.length.should.equal(1);
    var metadata = matchedProfile[0].metadata;
    metadata.should.not.undefined();
    metadata.distance.should.not.undefined();
    metadata.prefers.should.be.an.Array();
    metadata.distance.should.belowOrEqual(500);
    metadata.distance.should.deepEqual(23.525988391724074);
    metadata.prefers.length.should.deepEqual(1);
    metadata.prefers[0].should.deepEqual({type: 'field', ref: 7});
  });
});
