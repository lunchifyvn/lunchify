'use strict';

var async = require('async');

module.exports = function(app) {
  var data = require('./field-topic.json');
  var fieldModel = app.models.field;
  var topicModel = app.models.topic;
  console.log(data);

  async.each(data, function(datum) {
    console.log(datum);
    fieldModel.updateOrCreate({
      name: datum.field,
    }, function(err, fieldInstance, created) {
      if (err) {
        console.log('field error: ' + err.message);
      }
      var topics = datum.topics;
      async.each(topics, function(topic) {
        topicModel.updateOrCreate({
          name: topic,
          fieldId: fieldInstance.id,
        }, function(err, topicInstance, created) {
          if (err) {
            console.log('topic error: ' + err.message);
          }
          console.log(topicInstance);
        });
      });
    });
  });
};

