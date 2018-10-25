var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
    teamName: {type: String, default: ''},
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    teamScore: {type: Number, default: 0},
    challenge1: {type: Object, default: {name: '', postion: []}},
    challenge2: {type: Object, default: {name: '', postion: []}},
    challenge3: {type: Object, default: {name: '', postion: []}},
    challenge: {type: Array, default: [false,false,false]}
});

module.exports = mongoose.model('Team', TeamSchema);