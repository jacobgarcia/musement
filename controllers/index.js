const express = require('express');
const multer = require('multer');
var user = require("models/user.js");
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

var home = require('./home');
var chat = require('./chat');

//================================== MIDDLEWARES ===============================
const ensureAuth = require('middlewares/auth.js');


//===================================== ROUTES =================================


module.exports = function(app, passport) {
  // ====================== > HOME PAGE (with login links) =======================
  app.use(flash());
  app.use('/home', home);
  app.use('/chat', chat);

  app.get('/', (req, res) => {
    res.render('index')
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }));

  app.get('/login', (req, res) => {
    res.render('login', {
      title: 'Hey',
      message: 'Hello there!'
    });
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/home', // redirect to the secure PROFILE section --- CHANGE FOR PROFILE
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
};
