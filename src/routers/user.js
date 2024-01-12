const express = require('express')
const router = express.Router()
const usercontroller = require('../controller/userController')
const UpdateMiddlerWare = require('../middleware/upload')



router.get("/login", usercontroller.login)
router.post("/login", usercontroller.login)
router.post("/regiter", UpdateMiddlerWare.UpdateMiddlerWare("avatar"), usercontroller.createUser)
router.get("/regiter", usercontroller.createUser)
router.post("/logout", usercontroller.logOut)
router.get("/info", usercontroller.getInfo)
router.post("/editinfo", usercontroller.editInfo)


module.exports = router