'use strict';

var express = require('express'),
    bodyParser = require('body-parser'), //To access infomration from the URL
    nunjucks = require('nunjucks'),
    app = express(); //Initialize the application

var port = process.env.PORT || 80; //Change to port 80 in distribution

app.set('view engine', 'html');
app.use('/static', express.static( __dirname + '/public'));
app.use('/components', express.static( __dirname + '/bower_components'));

nunjucks.configure('public/views', {
    autoescape: true,
    express: app
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.render('index.html');
})

app.use(function (req, res) {
  res.json({"message": "not found"})
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
