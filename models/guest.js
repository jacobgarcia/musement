const mongoose = require('mongoose');

// Guest Schema
var guestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
      type: String,
      required: true
    },
    preference: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('Guest', guestSchema);
