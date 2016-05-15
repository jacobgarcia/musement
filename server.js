// set up ====================================
'use strict';
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const configDB = require('config/database');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer'),
      nunjucks = require('nunjucks'), //HTMLRenderer
      morgan = require('morgan'),
      API = require("controllers/api"); //API Routers

const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');

var chat = require("config/sockets").listen(server);

// configuration ==============================
mongoose.connect(configDB.url); //connect database
mongoose.set('debug', true);

require('config/passport')(passport);

//View engine
nunjucks.configure('views', {autoescape: true, express: app,tags: {variableStart: '{$',variableEnd: '$}',}});
app.set('view engine', 'html');

//Static routing
app.use('/static', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/components', express.static(__dirname + '/bower_components')); //Set bower_components to just components

//Parser
app.use(bodyParser.json()); /* JSON support */
app.use(bodyParser.urlencoded());

app.use(morgan('dev')); // use morgan to log requests to the console

//Will be decapricated
app.use(cookieParser());
app.use(expressSession({
  secret: 'pleaseneverandneverrforgetthatthisismyzecretandonlimyne',
  resave: false,
  saveUninitialized: false
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Routers
app.use('/api', API);

require('controllers/index')(app,passport); // load our routes and pass in our app and fully configured passport

server.listen(8080);
