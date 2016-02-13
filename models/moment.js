const mongoose = require('mongoose');

var momentSchema = new mongoose.Schema({
    start: {
        type: timestamp,
        required: true
    },
    end: {
        type: timestamp,
        required: true
    },
    description: {
        type: String
    },
    moment_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Moment Type' /* References an specific collection for storing moment types */
        /****** THIS IS MEANT TO BE REQUIRED, BUT NOT A PRE-ALPHA MILESTONE **************/
    },
    attachement: [{
        type: String
    }]
});

module.exports = mongoose.model('Moment', chatMessageSchema);