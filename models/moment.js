const mongoose = require('mongoose');

var momentSchema = new mongoose.Schema({
  timelapse: {
    type: Number,
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
  attachement: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  heart: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Moment', momentSchema);
