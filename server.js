'use strict';

let http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    configDB = require('config/database'),
    multer = require('multer'),
    morgan = require('morgan'),
    API = require("controllers/api"); //API Routers

let app = express(),
    server = http.createServer(app),
    socketio = require('socket.io');

let chat = require("config/sockets").listen(server);

// Configuration
mongoose.connect(configDB.url); //connect database
mongoose.set('debug', true);

//Static routing
app.use('/static', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/components', express.static(__dirname + '/bower_components')); //Set bower_components to just components

//Parser
app.use(bodyParser.json()); /* JSON support */
app.use(bodyParser.urlencoded());
app.use(morgan('dev')); // use morgan to log requests to the console

//API routing
app.use('/api', API);

//Handles all routes and redirects it to index.html
app.use(function(req, res) {
    // Use res.sendfile, as it streams instead of reading the file into memory.
    res.sendFile( __dirname + '/public/views/index.html');
});

server.listen(8080);
