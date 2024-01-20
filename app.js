const express = require('express');
const https = require('https');
const fs = require('fs');
require('dotenv').config();
const app = express();
const port = process.env.SERVER_PORT || 443;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const { checkLogin } = require('./src/middleware/auth');
const db = require('./src/config/connect_db');

const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser());
app.use(
    session({
        secret: 'tranduc',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

const path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use('/static', express.static(path.join(__dirname, 'src', 'views')));
app.use('/static', express.static(path.join(__dirname, 'src', 'resource')));

const { UpdateMiddlerWare } = require('./src/middleware/upload');
app.post('/upload/demo', UpdateMiddlerWare, (req, res) => {
    res.json({ mess: 'okok', info: req.body });
});

app.get('/upload/demo', (req, res) => {
    res.render('demo');
});

const postRouter = require('./src/routers/blogPost');
app.use('/home', postRouter);
app.use('/post', postRouter);

const userRouter = require('./src/routers/user');
app.use('/user', userRouter);

const options = {
    key: fs.readFileSync('./key.key', 'utf8'),
    cert: fs.readFileSync('./Certificate.crt', 'utf8'),
};

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});