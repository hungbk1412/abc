const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const isAuthMiddleware = require('../middleware/isAuth');

router.post('/newuser', isAuthMiddleware.isRole3, authController.postNewUser);

router.get('/login', isAuthMiddleware.isLoggedIn, authController.isLoggedIn)

router.post('/login', authController.postLogin);

router.get('/logout', authController.getLogout);

module.exports = router;