const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
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
    tags: [{
      type: mongoose.Schema.Types.ObjectId, /* Object ID from tags */
      ref: 'Tag'
    }],
    username: {
        type: String,
        required: true,
        unique: true
    }
});

// ============================= METHODS =======================================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
