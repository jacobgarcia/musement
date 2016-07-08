const mongoose = require('mongoose');

var momentSchema = new mongoose.Schema({
  description: {
    type: String
  },
  feedback: [{
    user: {
      type: mongoose.Schema.Types.ObjectId, /* Object ID from moment */
      ref: 'User', /* Moment Schema. Remember to define it as this in the export module */
      required: true
    },
    comment: String
  }],
  files: [{
    type: String
  }],
  hearts: {
    type: Number,
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId, /* Object ID from tags */
    ref: 'Tag'
  }],
  project: {
    type: mongoose.Schema.Types.ObjectId, /* Object ID from project */
    ref: 'Project', /* Moment Schema. Remember to define it as this in the export module */
    required: true
  },
  question: {
    type: String
  },
  usersHearted: [{
      type: mongoose.Schema.Types.ObjectId, /* Object ID from moment */
      ref: 'Moment' /* Moment Schema. Remember to define it as this in the export module */
  }]
});

module.exports = mongoose.model('Moment', momentSchema);
