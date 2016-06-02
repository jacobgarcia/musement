// set up ====================================
// 'use strict';
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const configDB = require('config/database');
const jade = require('jade');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');

var chat = require("config/sockets").listen(server);

// configuration ==============================
mongoose.connect(configDB.url); //connect database
mongoose.set('debug', true);

require('config/passport')(passport);

// app.use(express.static('assets')); //Folder
app.use('/static', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.set('view engine', 'jade');

app.use(bodyParser.json()); /* JSON support */
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(expressSession({
  secret: 'pleaseneverandneverrforgetthatthisismyzecretandonlimyne',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('controllers/index')(app,passport); // load our routes and pass in our app and fully configured passport

server.listen(80);
