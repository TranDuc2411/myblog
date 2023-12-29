// models/post.js
const mongoose = require('mongoose');

// Định nghĩa Schema cho Post
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Tạo mô hình Post từ Schema
const Post = mongoose.model('Post', postSchema);

// Xuất mô hình Post để sử dụng ở nơi khác trong ứng dụng
module.exports = Post;