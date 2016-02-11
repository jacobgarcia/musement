// Load all the things passport needs
// import express from 'express'
const LocalStrategy = require('passport-local').Strategy

// Load up user model
var User = require('models/user');

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
    User.findOne({'email' : email}, function(err, user){
      if(err){
        console.log('err')
        return done(err)
      }
      if(user == null){
        console.log('User no found');
      }
      var compare = user.comparePassword(password)
      console.log('compare:',compare);
      if(!compare){
        console.log('Incorrect Password')
      }

      console.log('Entre email y pass, OK', user.password, password)
      return done(null, user)
    })
  }))
}
