const mongoose = require('mongoose');

/* Remember to use a buffer when bringing data from this schema! */

var chatMessageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    time: {
        type: timestamp,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Chat Message', chatMessageSchema);