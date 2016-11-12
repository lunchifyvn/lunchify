'use strict';

var async = require('async');

module.exports = function(app) {
  var data = require('./field-topic.json');
  var fieldModel = app.models.field;
  var topicModel = app.models.topic;
  console.log(data);

  async.each(data, datum => {
    console.log(datum);
    fieldModel.updateOrCreate({
      name: datum.field,
    }, (err, fieldInstance, created) => {
      if (err) console.log(`field error ${JSON.stringify(err)}`);
      var topics = datum.topics;
      async.each(topics, topic => {
        topicModel.updateOrCreate({
          name: topic,
          fieldId: fieldInstance.id
        }, (err, topicInstance, created) => {
          if (err) console.log(`topic error ${JSON.stringify(err)}`);
          console.log(topicInstance);
        });
      });
    });
  });
};

