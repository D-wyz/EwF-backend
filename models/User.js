var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {type: String, default: ''},
    userPicture: {type: String, default: '../public/images/anon.jpg'},
    email: {type: String, default: ''},
    password: {type: String, default: ''},
    userScore: {type: Number, default: 0},
    group: {type: String, default: ''},
    challenge: {type: Array, default: [false,false,false]},  // challenge tracker, set to true when complete
    currentPostion: {type: Object, default: {name: 'Code Immersives', position: [40.7602231, -73.9908527] }}
});

module.exports = mongoose.model('user', UserSchema);