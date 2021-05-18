var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BP = new Schema({
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    systolic: {
        type: Number,
    },
    dystolic: {
        type: Number
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
    unit: {
        type: String,
        default: 'mmHg'
    }
});

module.exports = mongoose.model('BP', BP);