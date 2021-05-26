var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Requests = new Schema({
    p_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    d_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Doctor'
    },
    msg: {
        type: String
    },
    name: {
        type: String
    }
});

module.exports = mongoose.model('Request', Requests);