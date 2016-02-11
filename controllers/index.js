const express = require('express');
var user = require("models/user.js");
var LocalStrategy = require('passport-local').Strategy


//================================== MIDDLEWARES ===============================
const ensureAuth = require('middlewares/auth.js');

//===================================== ROUTES =================================

module.exports = function(app,passport){
// ====================== > HOME PAGE (with login links) =======================

  app.get('/apply', (req,res) => {
    res.redirect('/apply.html')
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login' }));

    app.get('/login', (req, res) => {
      res.render('login', { title: 'Hey', message: 'Hello there!'});
    });

    app.get('/logout', (req, res) => {
      req.logout()
      res.redirect('/login')
    });

    app.get('/home', ensureAuth, (req, res) => {
      res.render('home', {user: req.user.username})


    });
};
