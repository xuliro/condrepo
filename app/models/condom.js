var mongoose = require('mongoose');
module.exports = function() {
    var schema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        code: {
          type: Number
        },
        address: {
          type: String
        },
        syndic: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          default: null
        },
        towers: [
          {
            type: mongoose.Schema.ObjectId,
            ref: 'Tower'
          }
        ]
    });
    return mongoose.model('Condom', schema);
};
