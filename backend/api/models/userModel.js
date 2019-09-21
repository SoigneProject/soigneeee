var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        required: "Please enter your first name"
    },
    lastName: {
        type: String,
        required: "Please enter your last name"
    },
    displayName: {
        type: String,
        required: "Please enter a display name"
    },
    email: {
        type: String,
        required: "Please enter your email address"
    }
});

module.exports = mongoose.model('User', UserSchema);