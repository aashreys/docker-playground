'use strict';

// Services
const express = require('express');
const mongoose = require('mongoose');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

// Mongo
mongoose.connect("mongodb://mongo:27017");

app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);