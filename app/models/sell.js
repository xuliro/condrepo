var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
module.exports = function () {
  var schema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    inclusion: {
      type: Date,
      default: Date.now
    },
    condom: {
      type: mongoose.Schema.ObjectId,
      ref: 'Condom'
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  });
  schema.plugin(findOrCreate);
  return mongoose.model('Sell', schema);
}
