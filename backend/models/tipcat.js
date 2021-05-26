var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipCategory = new Schema({
    Category: {
        type: String,
    },
});

module.exports = mongoose.model('TipCategory', TipCategory);

var Tip = new Schema({
    tip_id: {
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
});

module.exports = mongoose.model('Tip', Tip);
