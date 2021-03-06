const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    pro: {type: Boolean, default: false},
    email: {
      type: String,
      required: true,
      unique: true
    },
    proDate: Date,
    image: {
      type: String,
      required: true
    },
    bio: String,
    location: {
      city: String,
      state: String
    },
    moments: [{
      type: mongoose.Schema.Types.ObjectId, /* Object ID from moments */
      ref: 'Moment'
    }],
    password: {
      type: String,
      required: true
    },
    projects: [{
      type: mongoose.Schema.Types.ObjectId, /* Object ID from projects */
      ref: 'Project'
    }],
    tags: [{
      type: mongoose.Schema.Types.ObjectId, /* Object ID from tags */
      ref: 'Tag'
    }],
    username: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
