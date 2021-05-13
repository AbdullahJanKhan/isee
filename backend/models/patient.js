var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Patient = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    dob: {
        type: Date,
    },
    city: {
        type: String,
    }
});

module.exports = mongoose.model('Patient', Patient);