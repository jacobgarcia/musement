const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// User Schema
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true
    },
    lastName: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    bornDate: {
        type: Date,
        //required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    follow: [{
      type: mongoose.Schema.Types.ObjectId, /* Object ID from user */
      ref: 'User' /* User Schema. Remember to define it as this in the export module */
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId, /* Object ID from user */
      ref: 'User' /* User Schema. Remember to define it as this in the export module */
    }],
    image: {
        type: String,
        required: true
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
