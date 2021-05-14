var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    gender: {
        type: String,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    dob: {
        type: Date,
    },
    city: {
        type: String,
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);