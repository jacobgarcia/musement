// Load all the things passport needs
const LocalStrategy = require('passport-local').Strategy

// Load up user model
var user = require("models/user.js");

module.exports = function(passport) {

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  // =============================== LOGIN =======================================

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function(req, email, password, done){
    user.findOne({'email' : email}, function(err, user){
      if(err){
        console.log('err')
        return done(err)
      }
      if(user == null){
        console.log('User no found');
      }
      var compare = user.comparePassword(password)
      if(!compare){
        console.log('Incorrect Password')
      }

      return done(null, user)
    })
  }))
}
