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
    details: {
      type: String,
      required: false
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
    condom: {
      type: mongoose.Schema.ObjectId,
      ref: 'Condom'
    }
  });
  schema.plugin(findOrCreate);
  return mongoose.model('Visitor', schema);
}
