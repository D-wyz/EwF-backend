var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
    groupname: {type: String, default: ''},
    users: {type: Array, default: []},
    groupScore: {type: Number, default: 0},
    challenge1: {type: Object, default: {name: '', postion: []}},
    challenge2: {type: Object, default: {name: '', postion: []}},
    challenge3: {type: Object, default: {name: '', postion: []}},
    challenge: {type: Array, default: [false,false,false]}
});

module.exports = mongoose.model('group', GroupSchema);