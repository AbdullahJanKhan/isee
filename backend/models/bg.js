var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BG = new Schema({
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'Patient'
    },
    value: {
        type: [Number]
    },
    timeofday: {
        type: [String]
    },
    dateAdded: {
        type: [Date],
        default: Date.now()
    },
    unit: {
        type: [String],
        default: 'mg/dL'
    }
});

module.exports = mongoose.model('BG', BG);