const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.SERVER_PORT
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//connect DB
const db = require('./src/config/connect_db')

// set view engine
const path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src', 'views'));

// public API

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