const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.SERVER_PORT

//connect DB
const db = require('./src/config/connect_db')

// set view engine
const path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src', 'views'));

app.get('/', (req, res) => {
    res.render('index', { title: 'demo dữ liệu' })
})
app.get('/home', (req, res) => {
    res.render('home', { title: 'home page', name: "trần ngọc minh đức " })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})