'use strict';

let http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    configDB = require('config/database'),
    morgan = require('morgan'),
    i18n = require('i18n-2'),
    nunjucks = require('nunjucks'),
    API = require("controllers/api"); //API Routers

let app = express(),
    server = http.createServer(app),
    socketio = require('socket.io');

let chat = require("config/sockets").listen(server);

// Database Configuration
mongoose.connect(configDB.url); //connect to database
mongoose.set('debug', false);

// Attach the i18n property to the express request object
// And attach helper methods for use in templates
i18n.expressBind(app, {
    // setup some locales - other locales default to en silently
    locales: ['en', 'es'],

    // where to store json files - defaults to './locales' relative to modules directory
    directory: __dirname + '/public/locales',

    // The default language is english
    defaultLocale: 'en',

    // change the cookie name from 'lang' to 'locale'
    cookieName: 'locale'
});

// Set the locale from req.cookies.
app.use(function(req, res, next) {
    req.i18n.setLocaleFromCookie();
    next();
});

// Nunjucks view configuration
nunjucks.configure('public/views', {
    autoescape: true,
    express: app,
    watch: true
});

//Static routing
app.use('/static', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/components', express.static(__dirname + '/bower_components')); //Set bower_components to just components

//Parser
app.use(morgan('dev')); // use morgan to log requests to the console

// Load our routes and pass it our app already configured
require('controllers/index')(app);

server.listen(8080);
