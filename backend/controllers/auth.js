const bcrypt = require('bcrypt');
const User = require('../models/user');

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
            res.send('New user has been created!')
        })
    })
    .catch(err => {
        console.log(err);        
    })
}