const mongoose = require('mongoose');

var momentSchema = new mongoose.Schema({
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId, /* Object ID from moment */
    ref: 'User', /* Moment Schema. Remember to define it as this in the export module */
  },
  feedback: [{
    user: {
      type: mongoose.Schema.Types.ObjectId, /* Object ID from moment */
      ref: 'User', /* Moment Schema. Remember to define it as this in the export module */
      required: true
    },
    comment: String
  }],
  files: [ String ],
  tags: [{
    type: mongoose.Schema.Types.ObjectId, /* Object ID from tags */
    ref: 'Tag'
  }],
  project: {
    type: mongoose.Schema.Types.ObjectId, /* Object ID from project */
    ref: 'Project', /* Moment Schema. Remember to define it as this in the export module */
  },
  question: String,
  hearts: [{
      type: mongoose.Schema.Types.ObjectId, /* Object ID from moment */
      ref: 'User', /* Moment Schema. Remember to define it as this in the export module */
      unique: true
  }]
});

module.exports = mongoose.model('Moment', momentSchema);
