const mongoose = require('mongoose');

// User Schema
var guestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Guest', guestSchema);
