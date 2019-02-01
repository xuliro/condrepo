var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
module.exports = function () {
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
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
    }
  });
  schema.plugin(findOrCreate);
  return mongoose.model('Server', schema);
}
