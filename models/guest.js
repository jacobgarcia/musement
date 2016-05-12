const mongoose = require('mongoose');

// User Schema
var guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    whatismusement: {
        type: String,
    }
});

module.exports = mongoose.model('Guest', guestSchema);
