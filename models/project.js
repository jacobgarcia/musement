const mongoose = require('mongoose');

//Project Schema
var projectSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId, /* Object ID for the user */
    ref: 'User',
    required: true
  },
  projectname: {
    type: String,
    unique: true
  },
  category: {
    type: String
  },
  logo: String,
  description: String,
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  moments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Moment'
  }],
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Project', projectSchema);
