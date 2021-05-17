var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Appointment = new Schema({
    p_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    d_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Doctor'
    },
    on: {
        type: Date
    }
});

module.exports = mongoose.model('Appointment', Appointment);