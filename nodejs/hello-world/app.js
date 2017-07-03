'use strict';

const username = "aashrey";

// Services
const express = require('express');
const db = require('./db.js');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

db.connect();

app.get('/', function (req, res) {
    db.find(username, function(visitor) {
        if (visitor == null) {
            db.create(username, function(req, res, visitor) {
                onVisitorFound(req, res, visitor);
            });
        } else {
            onVisitorFound(req, res, visitor);
        }
    });
});

function onVisitorFound(req, res, visitor) {
    console.log(visitor);
    db.getNumVisits(username, function(num_visits) {
        res.send("Hello world. You've visited this page " + num_visits + ' times.\n');
        db.setNumVisits(username, num_visits + 1);    
    });
}

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);