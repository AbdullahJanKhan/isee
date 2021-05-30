var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipCategory = new Schema({
    category: {
        type: String,
        unique: true
    },
});

module.exports = mongoose.model('TipCategory', TipCategory);

