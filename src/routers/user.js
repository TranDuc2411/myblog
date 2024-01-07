const express = require('express')
const router = express.Router()
const usercontroller = require('../controller/userController')



router.get("/login", usercontroller.login)
router.post("/regiter", usercontroller.createUser)
router.post("/logout", usercontroller.logOut)
router.get("/info", usercontroller.getInfo)
router.post("/editinfo", usercontroller.editInfo)


module.exports = router