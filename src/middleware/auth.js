const session = require('express-session');
exports.checkLogin = (req, res, next) => {
    // console.log("middleware :", req.session)
    if (!req.session.user) {
        return res.redirect('/user/login');
    }
    // console.log("session user: ", req.session.user)
    next();
}