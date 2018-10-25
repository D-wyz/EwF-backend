var User = require('../models/User');
var Team = require('../models/Team');
var game = require('../utils/game');
const jwt = require('jsonwebtoken');


module.exports = {

  findUser: (params) => {

    return new Promise((resolve, reject) => {
      User.findById(params.id)
        .populate('team')
        .then(users => {
          resolve(users);
        })
        .catch(err => {
          reject(err);
        })
    });
  },

  updateUser: (body) => {
    
    return new Promise((resolve, reject) => {
      User.findById(body.id)

          User.findByIdAndUpdate(body.id, body)
            .populate('team')
            .then(user => {
              resolve(user)
            })
            .catch(err => {
              console.log(err)
              reject(id)
            })

        })
        .catch(err => {
          reject(err);
        })

    
  }
}