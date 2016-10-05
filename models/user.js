const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    premium: {type: String, default: false},
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

userSchema.pre('save', function(next, callback){
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), function(err){
      if (err) callback({error:{errmsg:"Error making hash sync"}},null)
  })
  next()
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
