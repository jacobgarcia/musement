'use strict';

let http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    configDB = require("./config/database"),
    API = require("./controllers/api.js"),
    morgan = require('morgan')

let app = express(),
    server = http.createServer(app),
    socketio = require('socket.io')

let chat = require("./config/sockets").listen(server)

// Database Configuration
mongoose.connect(configDB.url); //connect to database

//Parser
app.use(bodyParser.json()); /* JSON support */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); // use morgan to log requests to the console

//Static routing
app.use('/static', express.static(__dirname + '/public'))
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/components', express.static(__dirname + '/bower_components')) //Set bower_components to just components
app.use('/api', API)

app.use('/', function(req, res) {
    res.sendFile( __dirname + '/public/views/index.html') // Use res.sendfile, as it streams instead of reading the file into memory.
});

server.listen(8080);
