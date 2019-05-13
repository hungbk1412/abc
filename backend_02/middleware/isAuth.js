exports.isLoggedIn = (req, res, next) => {
    if (!req.session || !req.session.user || !req.session.user.isActive) {
        // console.log('session', req.session);        
        return;
    }
    next();
}

exports.isRole2 = (req, res, next) => {
    if (req.session.user === 1) {
        return res.status(401).json({message: 'Ban khong co quyen truy cap vao day!'});
    }
    next();
}

exports.isRole3 = (req, res, next) => {
    if (req.session.user !== 3 || req.session.user !== 4) {
        return res.status(401).json({message: 'Ban khong co quyen truy cap vao day!'});
    }
    next();
}

exports.isRole4 = (req, res, next) => {
    if (req.session.user !== 4) {
        return res.status(401).json({message: 'Ban khong co quyen truy cap vao day!'});
    }
    next();
}
