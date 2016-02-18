const express = require('express');
var user = require("models/user.js");
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;


//================================== MIDDLEWARES ===============================
const ensureAuth = require('middlewares/auth.js');

//===================================== ROUTES =================================

module.exports = function (app, passport) {
    // ====================== > HOME PAGE (with login links) =======================
    app.use(flash());

    app.get('/', (req, res) => {
        res.render('index')
    });

    app.get('/moment', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('moment', {scripts: ['moment.js']});
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
        req.logout()
        res.redirect('/login')
    });

    app.get('/home', ensureAuth, (req, res) => {
        res.render('home', {
            user: req.user.username
        })


    });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure PROFILE section --- CHANGE FOR PROFILE
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // ========================== > CHAT  ==================================
    app.get('/chat', function (req, res){
      res.render('chat')
      failureRedirect: '/login'
    });

};
