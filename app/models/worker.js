var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
module.exports = function () {
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: {
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
    condom: {
      type: mongoose.Schema.ObjectId,
      ref: 'Condom'
    },
    tower: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tower'
    },
    unit: {
      type: mongoose.Schema.ObjectId,
      ref: 'Unit'
    }
  });
  schema.plugin(findOrCreate);
  return mongoose.model('Worker', schema);
}
