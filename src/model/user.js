const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    displayname: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    favoriteJob: {
        type: [String],
        default: [],
    },
    social_network: {
        type: [{
            social: String,
            link: String,
        }],
        default: []
    },
    avatar: {
        type: String,
        default: null
    },
    aboutme: {
        type: String,
        default: null
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;