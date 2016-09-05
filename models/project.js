const mongoose = require('mongoose');

//Project Schema
var projectSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId, /* Object ID for the user */
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    // required: true
  },
  description: String,
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  moments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Moment'
  }],
  name: String
});

module.exports = mongoose.model('Project', projectSchema);
