'use strict';

// Services
const express = require('express');
const db = require('./db.js');

// Constants
const USERNAME = "aashrey";
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

db.connect();

app.get('/', function (req, res) {
    createUserIfNeeded(function(visitor) {
        onVisitorFound(req, res, visitor);
    });
});

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);

function createUserIfNeeded(callback) {
    db.find(USERNAME, function(visitor) {
        if (visitor == null) {
            db.create(USERNAME, function(visitor) {
                callback(visitor);
            });
        }
        callback(visitor);
    });
}

function onVisitorFound(req, res, visitor) {
    console.log(visitor);
    db.getNumVisits(USERNAME, function(num_visits) {
        res.send("Hello world. You've visited this page " + num_visits + ' times.\n');
        db.setNumVisits(USERNAME, num_visits + 1);    
    });
}