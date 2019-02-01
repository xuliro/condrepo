var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
module.exports = function () {
  var schema = mongoose.Schema({
    login: {
      type: String,
      required: true
    },
    password: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    provider: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isSuper: {
      type: Boolean,
      default: false
    },
    isBlocked: {
      type: Boolean,
      default: false
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
    possessions: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Possession'
    }],
    inclusion: {
      type: Date,
      default: Date.now
    }
  });
  schema.plugin(findOrCreate);
  return mongoose.model('User', schema);
}
