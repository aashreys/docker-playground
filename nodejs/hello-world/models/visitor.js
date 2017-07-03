const mongoose = require('mongoose');
const visitorSchema = mongoose.Schema({
    name: String,
    visits: Number
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;