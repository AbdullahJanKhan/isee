var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tip = new Schema({
    cat_id: {
        type: mongoose.Types.ObjectId,
        ref: 'TipCategory',
    },
    title: {
        type: String
    },
    text: {
        type: String,
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Doctor',
    },
    intellien: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Tip', Tip);
