var mongoose = require('mongoose');
module.exports = function() {
    var schema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        fraction: {
          type: Number,
          default: 1
        }
    });
    return mongoose.model('Unit', schema);
};
