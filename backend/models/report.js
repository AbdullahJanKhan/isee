var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Report = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
    },
    report: {
        type: Buffer,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Report', Report);