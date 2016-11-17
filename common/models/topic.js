module.exports = function(Topic) {
  Topic.validatesUniquenessOf('name', {message: 'topic name is not unique'});
};
