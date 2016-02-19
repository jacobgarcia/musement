// set up ====================================
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const configDB = require('config/database');
const jade = require('jade');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

// configuration ==============================
mongoose.connect(configDB.url); //connect database
mongoose.set('debug', true);

require('config/passport')(passport);

// app.use(express.static('assets')); //Folder
app.use('/static', express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(expressSession({
  secret: 'pleaseneverandneverrforgetthatthisismyzecretandonlimyne',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('controllers/index')(app,passport);

app.listen(8080);
