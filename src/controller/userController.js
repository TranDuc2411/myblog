// const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const User = require('../model/user')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { json } = require('express');
// router.post("/regiter", usercontroller.createUser)
exports.createUser = async(req, res) => {
    if (req.method === "GET") {
        res.render("user/create_user");
    } else if (req.method === "POST") {
        //check admin code 
        var checkAdminCode = (req.body.admincode === process.env.ADMIN_CODE)
        if (checkAdminCode) {
            s
            const passwordInput = req.body.password;
            // Hash the password with PBKDF2 and the generated salt
            const hashedPassword = CryptoJS.SHA256(passwordInput).toString()

            req.body.password = hashedPassword;
            // req.body.salt = salt.toString();

            req.body.social_network = JSON.parse(req.body.social_network);
            const newUser = new User({
                ...req.body,
            });
            // console.log("createUsser == controller == : ", newUser)
            try {
                newUser.save();
                // res.status(200).json(({ status: 200, mess: "created ..." }));
                res.redirect("/post/manager");
                ("user/login")
            } catch (error) {
                res.status(500).json({ status: 500, mess: "server error" })
                console.log(error);
            }
        } else {
            res.status(500).json(({ status: 500, mess: "You dont have Admin_code, You do not have admin code, please contact Tran Ngoc Minh Duc for assistance" }))
        }
    }
};

// router.get("/login", usercontroller.login)
// router.post("/login", usercontroller.login)
exports.login = async(req, res) => {
    if (req.method === "GET") {
        res.render('user/login');
    } else if (req.method === "POST") {
        const inputPassWord = req.body.password;
        const inputUserName = req.body.username;
        try {
            const user = await User.findOne({ username: inputUserName });
            // console.log(user);
            console.log(inputUserName);

            if (user != null) {
                // Compare hashed password using CryptoJS

                const hashedPassword = CryptoJS.SHA256(inputPassWord).toString()
                console.log(hashedPassword)

                if (hashedPassword === user.password) {
                    req.session.user = user;
                    res.cookie('user', user, { maxAge: 900000, httpOnly: true }); // Lưu trữ thông tin trong cookie
                    res.redirect("/post/manager");
                } else {
                    res.status(200).json({ status: 200, message: "Password is not correct!" });
                }
            } else {
                res.status(200).json({ status: 200, message: "Username is not correct!" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Error server!" });
        }
    }
};



// router.get("/info", usercontroller.getInfo)
exports.updateInfo = async(req, res) => {
    if (req.method === "GET") {
        console.log("update info ...")
            // console.log(req.session.user)
        const userInfo = req.session.user
        res.render("user/update_info", { userInfo })
    } else if (req.method === "PUT") {
        console.log("update ... action")
    }
}