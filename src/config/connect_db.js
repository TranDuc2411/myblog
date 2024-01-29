const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27018/myblog')
const db_name = process.env.DB_NAME
const username = process.env.MONGO_ROOT_USERNAME
const password = process.env.MONGO_ROOT_PASSWORD
    // const url = "mongodb://" + username + ":" + password + "@db:27017/"
const url = "mongodb://" + username + ":" + password + "@localhost:27018"

mongoose.connect(url)
    .then(() => console.log('Connected! url: '))
    .catch((error) => console.log("error : ", url, error))