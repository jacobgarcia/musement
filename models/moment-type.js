const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var momentTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Moment Type', userSchema);