var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
module.exports = function () {
  var schema = mongoose.Schema({
    description: {
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
    },
    inclusion: {
      type: Date,
      default: Date.now
    },
    due: {
      type: Date,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    boleto: {
      type: String,
      default: null
    }
  });
  schema.plugin(findOrCreate);
  return mongoose.model('Bill', schema);
}