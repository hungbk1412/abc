const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

const login = (username, password) => 
  User.findOne({ email: email }).exec(function (err, user) {
    if (err) {
      return callback(err)
    } else if (!user) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    })
  });

router.post('/new', authController.postNewUser)

module.exports = router;