// models/post.js
const mongoose = require('mongoose');

// Định nghĩa Schema cho Post
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null,
    },
    content: {
        type: String,
        default: null,
    },
    urlThumnail: {
        type: String,
        default: null,
    },
    author: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        // default: Date.now,
        default: () => new Date().toLocaleDateString("en-US")
    },
});

// Tạo mô hình Post từ Schema
const Post = mongoose.model('Post', postSchema);

// Xuất mô hình Post để sử dụng ở nơi khác trong ứng dụng
module.exports = Post;