var mongoose = require('mongoose');
module.exports = function() {
    var schema = mongoose.Schema({
        id: {//0 = Vehicle, 1 = Animal (increase if needed)
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        license: {
            type: String,
            default: ''
        }
    });
    return mongoose.model('Possession', schema);
};
