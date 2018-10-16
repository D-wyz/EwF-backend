var User = require('../models/User');
var game = require('../utils/game');
const jwt = require('jsonwebtoken');


module.exports = {

  findUser: (params) => {

    return new Promise((resolve, reject) => {
      User.findById(params.id)
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
        .then(foundUser => {
          let currentUser = body
          User.findByIdAndUpdate(body.id, currentUser)
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

    })
  }
}