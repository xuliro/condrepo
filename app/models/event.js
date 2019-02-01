var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
module.exports = function () {
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    area: {
      type: mongoose.Schema.ObjectId,
      ref: 'Area'
    }
  });
  schema.plugin(findOrCreate);
  return mongoose.model('Event', schema);
}
