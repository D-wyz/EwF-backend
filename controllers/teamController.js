var User = require('../models/User');
var Team = require('../models/Team');
var game = require('../utils/game');
const jwt = require('jsonwebtoken');


module.exports = {

  findTeams: (req, res, next) => {

    Team.find({})
      .populate('users')
      .then(teams => {
        let success = {}
        success.confirmation = true;
        success.payload = teams;

        res.json(success);
      })
      .catch(err => {
        res.json(err);
      })

  },
  findTeam: (params) => {

    return new Promise((resolve, reject) => {
      Team.findById(params.id)
        .populate('users')
        .then(teams => {
          resolve(teams);
        })
        .catch(err => {
          reject(err);
        })
    });
  },

  create: (params) => {

    return new Promise((resolve, reject) => {
      Team.create(params)
        .then(team => {
          console.log(team);

          const payload = {
            teamName: team.teamName,
            id: team._id,
          }
          console.log(payload);

          jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 3600
          }, (err, token) => {

            if (err) {
              reject(err);
            } else {
              let success = {};
              success.confirmation = true;
              success.token = `Bearer ${token}`;
              resolve(success);
            }
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  
  updateTeam: (body) => {

    return new Promise((resolve, reject) => {
      Team.findById(body.id)
        .populate('users')
        .then(foundTeam => {

          let currentTeam = body
          Team.findByIdAndUpdate(body.id, currentTeam)
            .populate('users')
            .then(team => {
              resolve(team)
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
  // addUser: (params) => {

  //   return new Promise((resolve, reject) => {
  //     Team.findById(params.id)
  //       .populate('users')
  //       .then(foundTeam => {

  //         let currentTeam = {}
  //         currentUsers = foundTeam.users
  //         currentUsers.push(params.user)
  //         currentTeam.users = currentUsers

  //         Team.findByIdAndUpdate(params.id, currentTeam)
  //           .populate('users')
  //           .then(team => {
  //             resolve(team)
  //           })
  //           .catch(err => {
  //             console.log(err)
  //             reject(id)
  //           })

  //       })
  //       .catch(err => {
  //         reject(err);
  //       })

  //   })
  // },
  // removeUser: (params) => {

  //   return new Promise((resolve, reject) => {
  //     Team.findById(params.id)
  //       .populate('users')
  //       .then(foundTeam => {

  //         let currentTeam = {}
  //         currentUsers = foundTeam.users
  //         let indx = currentUsers.indexOf(params.user)
  //         currentUsers.splice(indx)
  //         currentTeam.users = currentUsers

  //         Team.findByIdAndUpdate(params.id, currentTeam)
  //           .populate('users')
  //           .then(team => {
  //             resolve(team)
  //           })
  //           .catch(err => {
  //             console.log(err)
  //             reject(id)
  //           })

  //       })
  //       .catch(err => {
  //         reject(err);
  //       })

  //   })
  // }
}