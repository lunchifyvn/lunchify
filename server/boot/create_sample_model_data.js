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
    }, (err, fieldInstance) => {
      if (err) {
        console.log('field error: ' + err.message);
      }
      var topics = datum.topics;
      async.each(topics, topic => {
        topicModel.updateOrCreate({
          name: topic,
          fieldId: fieldInstance.id,
        }, (err, topicInstance) => {
          if (err) {
            console.log('topic error: ' + err.message);
          }
          console.log(topicInstance);
        });
      });
    });
  });
};

