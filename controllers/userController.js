// var User = require('../models/User');
// var Team = require('../models/Team');
// var game = require('../utils/game');
// const jwt = require('jsonwebtoken');

// module.exports = {

//   findUser: (params) => {

//     return new Promise((resolve, reject) => {
//       User.findById(params.id)
//         .populate('team')
//         .then(users => {
//           resolve(users);
//         })
//         .catch(err => {
//           reject(err);
//         })
//     });
//   },

//   updateUser: (body) => {

//     return new Promise((resolve, reject) => {
//       User.findById(body.id)

//           User.findByIdAndUpdate(body.id, body)
//             .populate('team')
//             .then(user => {
//               resolve(user)
//             })
//             .catch(err => {
//               console.log(err)
//               reject(id)
//             })

//         })
//         .catch(err => {
//           reject(err);
//         })

//   }
// }

var User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var Team = require('../models/Team');
var game = require('../utils/game');

module.exports = {
  register: function(param) {
    return new Promise(function(resolve, reject) {
      User.findOne({ email: param.email }).then(user => {
        if (user) {
          let errors = {};
          errors.email = 'Email already exists';
          errors.status = 400;
          return reject(errors);
        } else {
          const newUser = new User({
            username: param.username,
            email: param.email,
            password: param.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => resolve(user))
                .catch(err => reject(err));
            });
          });
        }
      });
    });
  },

  login: function(params) {
    const email = params.email;
    const password = params.password;

    return new Promise(function(resolve, reject) {
      User.findOne({ email }).then(user => {
        if (!user) {
          let errors = {};
          errors.email = 'User not found';
          errors.status = 400;
          reject(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user._id,
              email: user.email,
              username: user.username
            };
            console.log(payload);
            console.log(process.env.SECRET_KEY);
            jwt.sign(
              payload,
              process.env.SECRET_KEY,
              {
                expiresIn: 3600
              },
              (err, token) => {
                if (err) {
                  console.log(err);
                  reject(err);
                }
                console.log(token);
                // res.json({
                //     success: true,
                //     token: 'Bearer ' + token
                // });
                let success = {};
                success.confirmation = true;
                success.token = 'Bearer ' + token;
                resolve(success);
              }
            );
          } else {
            let errors = {};
            errors.password = 'Password incorrect';
            errors.status = 400;
            reject(errors);
          }
        });
      });
    });
  },

  updateUser: body => {
    return new Promise((resolve, reject) => {
      User.findById(body.id);

      User.findByIdAndUpdate(body.id, body)
        .populate('team')
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          console.log(err);
          reject(id);
        });
    })
  }
  
};
