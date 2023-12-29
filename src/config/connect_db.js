const mongoose = require('mongoose');

// mongoose.connect('mongodb://db:27017/myblog')
mongoose.connect('mongodb://localhost:27018/myblog')
    .then(() => console.log('Connected!'))
    .catch((error) => console.log("error : ", error))