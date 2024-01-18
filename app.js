const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.SERVER_PORT
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// confi cors
const cors = require('cors');
app.use(cors());

// add middleware
const { checkLogin } = require('./src/middleware/auth')

//connect DB
const db = require('./src/config/connect_db')

// set up middleware cookie, session 
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser())
app.use(session({
    secret: "tranduc",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// set view engine
const path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src', 'views'));

//setup static file
app.use("/static", express.static(path.join(__dirname, 'src', 'views')))
app.use("/static", express.static(path.join(__dirname, 'src', 'resource')))

// public API
const { UpdateMiddlerWare } = require('./src/middleware/upload')
app.post("/upload/demo", UpdateMiddlerWare, (req, res) => {
    res.json({ mess: "okok", info: req.body })
        // console.log(req)
        // console.log("update okok")
})
app.get("/upload/demo", (req, res) => {
    res.render('demo')
})

// blogPost API
const postRouter = require('./src/routers/blogPost')
app.use("/home", postRouter)
app.use("/post", postRouter)

// user API
const userRouter = require('./src/routers/user')
app.use('/user', userRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})