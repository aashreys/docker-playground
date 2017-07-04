const mongoose = require('mongoose');

const Visitor = require('./models/visitor.js');


exports.connect = connect;

exports.create = create;

exports.find = find;

exports.getNumVisits = getNumVisits;

exports.setNumVisits = setNumVisits;


function connect() {
    console.log('Connecting to Mongo');
    mongoose.connect("mongodb://db:27017");
}

function create(name, callback) {
    var visitor = new Visitor({ 
        name: name, 
        visits: 0 
    });
    visitor.save(function(err, visitor, numAffected) {
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