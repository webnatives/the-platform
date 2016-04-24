'use strict';

var https = require('https');
https.globalAgent.maxSockets = Infinity;

//npm dependencies
var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');

//local dependencies
var routes = require('./routes/routes');


//server setup
var app = express(),
    port = process.env.PORT || 4010;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('../release'));
app.set('view engine', 'ejs');

var server = app.listen(port, () => {
    console.log('Example app listening at http://%s:%s', server.address().address, port);
});

//app init
routes.init(app);

module.exports = server;