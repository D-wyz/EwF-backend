var express = require('express');
var router = express.Router();
var passport = require('passport');

var authMiddleware = require('../utils/authMiddleware');
var userController =require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/createuserorlogin', authMiddleware.checkSignUp, authMiddleware.checkSignIn);

router.get('/getuser', function (req, res, next) {
  
  userController
    .findUser(req.query)
    .then(user => {
      res.json({
        confirmation: 'success',
        payload: user
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        payload: err
      })
    })

});

router.put('/updateUser', function (req, res, next) {

  userController
    .updateUser(req.body)
    .then(user => {
      res.json({
        confirmation: 'success',
        user
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        err
      })
    })

});

router.get('/current-user', passport.authenticate('jwt', {session: false}), authMiddleware.successUser);
module.exports = router;
