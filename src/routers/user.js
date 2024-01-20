const express = require('express')
const router = express.Router()
const usercontroller = require('../controller/userController')
const UpdateMiddlerWare = require('../middleware/upload')
const { checkLogin } = require('../middleware/auth')


// login
router.get("/login", usercontroller.login)
router.post("/login", usercontroller.login)

// regiter
router.post("/regiter", UpdateMiddlerWare.UpdateMiddlerWare("avatar"), usercontroller.createUser)
router.get("/regiter", usercontroller.createUser)

// 
router.get("/update", checkLogin, usercontroller.updateInfo)
router.put("/update", checkLogin, usercontroller.updateInfo)

// router.post("/logout", usercontroller.logOut)


module.exports = router