const bcrypt = require('bcrypt');
const User = require('../model/user')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { json } = require('express');
// router.post("/regiter", usercontroller.createUser)
exports.createUser = async(req, res) => {
    if (req.method === "GET") {
        res.render("user/create_user")
    } else if (req.method === "POST") {
        // console.log(req.body)
        const passwordInput = req.body.password
        const saltRounds = 10
        req.body.password = await bcrypt.hashSync(passwordInput, saltRounds);
        req.body.social_network = JSON.parse(req.body.social_network)
        console.log(req.body)
        const newUser = new User({
            ...req.body,
        })
        try {
            newUser.save()
            res.redirect("/post/manager")
        } catch (error) {
            res.status(500).json({ status: 500, mess: "server error" })
            console.log(error)
        }
    }
}

// router.get("/login", usercontroller.login)
// router.post("/login", usercontroller.login)
exports.login = async(req, res) => {
    if (req.method === "GET") {
        res.render('user/login')
    } else if (req.method === "POST") {
        const inputPassWord = req.body.password;
        const inputUserName = req.body.username
        try {
            const user = await User.findOne({ username: inputUserName });
            console.log(user)
            console.log(inputUserName)
            if (user != null) {
                if (bcrypt.compareSync(inputPassWord, user.password)) {
                    req.session.user = user
                    res.cookie('user', user, { maxAge: 900000, httpOnly: true }); // Lưu trữ thông tin trong cookie
                    res.redirect("/post/manager")
                } else res.status(200).json({ status: 200, message: "password is not corect !!" })
            } else res.status(200).json({ status: 200, message: "username is not corect !!" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "Error server !" })
        }
    }
}

// router.post("/logout", usercontroller.logOut)
exports.logOut = (req, res) => {
    console.log("logout");
}

// router.get("/info", usercontroller.getInfo)
exports.getInfo = (req, res) => {
    console.log("getInfo");
}

// router.post("/editinfo", usercontroller.editInfo)
exports.editInfo = (req, res) => {
    console.log("editInfo");
}