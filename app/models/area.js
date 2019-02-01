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
    capacity: {
      type: Number,
      required: true
    },
    condom: {
      type: mongoose.Schema.ObjectId,
      ref: 'Condom'
    },
    tower: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tower'
    }
  });
  schema.plugin(findOrCreate);
  return mongoose.model('Area', schema);
}
