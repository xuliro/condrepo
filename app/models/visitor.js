var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
module.exports = function () {
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    document: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    enter: {
      type: Date,
      required: true
    },
    exit: {
      type: Date,
      default: null
    },
    event: {
      type: mongoose.Schema.ObjectId,
      ref: 'Event'
    },
    unit: {
      type: mongoose.Schema.ObjectId,
      ref: 'Unit'
    }
  });
  schema.plugin(findOrCreate);
  return mongoose.model('Visitor', schema);
}
