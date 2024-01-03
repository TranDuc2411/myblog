const User = require('../model/user')
const userDemo = {
    username: "tranduc",
    password: "hashed_password_123",
    displayname: "John Doe",
    nickname: "johnd",
    age: 30,
    email: "john.doe@example.com",
    favoriteJob: ["Web Developer", "Graphic Designer"],
    social_network: {
        social: "Twitter",
        link: "https://twitter.com/johnd",
        displaylink: "@johnd",
    },
    profilePictureLink: "https://example.com/john_doe_profile.jpg",
    aboutme: "Passionate about web development and design.",
}

// router.post("/regiter", usercontroller.createUser)
exports.createUser = async(req, res) => {
    try {
        const newUser = new User(userDemo)
        try {
            await newUser.save()
            console.log("okoke")
            res.status(200).json({ status: 200, message: "save oke" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "save error" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500, message: "Error server !" })
    }
}

// router.get("/login", usercontroller.login)
exports.login = async(req, res) => {
    try {
        const user = await User.findOne({ username: 'tranduc' })
        res.json({ use: user })
    } catch (error) {
        res.status(500).json({ status: 500, message: "Error server !" })
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