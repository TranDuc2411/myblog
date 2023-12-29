const mongoose = require('mongoose');

// Kết nối với MongoDB
mongoose.connect('mongodb://localhost:27017/myblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Kiểm tra kết nối thành công hay không
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});