var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
module.exports = function () {
  var schema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: Number,//TO BE DEFINED
      required: true
    },
    more: {
      type: String,
      default: null
    },
    inclusion: {
      type: Date,
      default: Date.now
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  });
  schema.plugin(findOrCreate);
  return mongoose.model('Message', schema);
}
