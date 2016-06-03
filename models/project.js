const mongoose = require('mongoose');
//Project Schema
var projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  moments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Moment'
  }]
});

module.exports = mongoose.model('Project', projectSchema);