var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
module.exports = function () {
  var schema = mongoose.Schema({
    brief: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    inclusion: {
      type: Date,
      default: Date.now
    },
    condom: {
      type: mongoose.Schema.ObjectId,
      ref: 'Condom'
    }
  });
  schema.plugin(findOrCreate);
  return mongoose.model('Archive', schema);
}
