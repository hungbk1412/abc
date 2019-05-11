const User = require('../models/user');
const bcrypt = require('bcrypt')

exports.postNewUser = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username}).then(userDoc => {
        if (userDoc) {
            return res.send('Username is already picked')
        }
        return bcrypt.hash(password, 12).then(hashedPass => {
            const user = new User({...req.body, password: hashedPass})
            return user.save()
        }).then(result => {
            res.status(201).json({message: 'User Created!', userRole: result.role_id})
        })
    }).catch(err => {
        err.statusCode = 500; 
        next(err);       
    })
}

exports.isLoggedIn = (req, res, next) => {
    res.status(201).json({message: 'Logged in!', username: req.session.user.username, userRole: req.session.user.role_id});
}

exports.postLogin = (req, res, next) => {
    console.log('req.body', req.body)
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username}).then(user => {
        if (!user) {   
            const error = new Error('Not existed!');
            error.statusCode = 401;
            throw error;
        }
        bcrypt.compare(password, user.password).then(function(doMatch) {
            if (!doMatch) {        
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            req.session.user = user;            
            req.session.save();
            res.status(201).json({message: 'Logged in!', username: user.username, userRole: user.role_id});
            console.log( 'session when post login', req.session);
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