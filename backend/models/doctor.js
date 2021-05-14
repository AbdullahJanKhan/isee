var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Doctor = new Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    pmdcid: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Doctor', Doctor);