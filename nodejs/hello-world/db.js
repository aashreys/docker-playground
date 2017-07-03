const mongoose = require('mongoose');

const Visitor = require('./models/visitor.js');

exports.connect = function() {
    console.log('Connecting to Mongo');
    mongoose.connect("mongodb://db:27017");
}

exports.create = function(name, callback) {
    create(name, callback);
}

exports.find = function(name, callback) {
    find(name, callback);
}

exports.getNumVisits = function(name, callback) {
    getNumVisits(name, callback);
}

exports.setNumVisits = function(name, visits) {
    setNumVisits(name, visits);
}

function create(name, callback) {
    var visitor = new Visitor({ 
        name: name, 
        visits: 0 
    });
    visitor.save(function(err, visitor, numAffectee) {
        if (err) console.log(err);
        callback(visitor);
    });
}

function find(visitor_name, callback) {
    Visitor.findOne( { name: visitor_name },  function(err, visitor) {
        if (err) console.log(err);
        callback(visitor);
    });
}

function getNumVisits(name, callback) {
    find(name, function(visitor) {
        callback(visitor.visits);
    });
}

function setNumVisits(name, visits) {
    find(name, function(visitor) {
        visitor.visits = visits;
        visitor.save(function(err) {
            if (err) console.log(err);
        });
    })
}