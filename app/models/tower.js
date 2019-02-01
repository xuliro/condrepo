var mongoose = require('mongoose');
module.exports = function() {
    var schema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        units: [
          {
            type: mongoose.Schema.ObjectId,
            ref: 'Unit'
          }
        ],
    });
    return mongoose.model('Tower', schema);
};
