const User = require('../models/user');
const bcrypt = require('bcryptjs')

exports.isLoggedIn = (req, res, next) => {
    res.status(201).json({message: 'Logged in!', username: req.session.user.username, userRole: req.session.user.role_id});
}

exports.postLogin = (req, res, next) => {
    // console.log('req.body when login', req.body)
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username}).then(user => {
        if (!user) {   
            res.status(401).json({message: 'Not existed'})
        }
        bcrypt.compare(password, user.password).then(function(doMatch) {
            if (!doMatch) {        
                res.status(401).json({message: 'Wrong password'})
            }
            req.session.user = user;            
            req.session.save();
            res.status(201).json({message: 'Logged in!', username: user.username, userRole: user.role_id});
            // console.log( 'session when post login', req.session);
        }).catch(err => { 
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    })
};

exports.getLogout = (req, res, next) => {
    req.session.destroy();
    res.status(201).json({message: 'Logged in!'});
}