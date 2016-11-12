'use strict';

module.exports = function(Field) {
  Field.validatesUniquenessOf('name', {message: 'field name is not unique'});
}