// models/post.js
const mongoose = require('mongoose');

// Định nghĩa Schema cho Post
const postSchema = new mongoose.Schema({
    // tiêu đề
    title: {
        type: String,
        default: null,
    },
    //lời dẫn - tóm đắt bài
    introduction: {
        type: String,
        default: null,
    },
    // nội dung chính post
    content: {
        type: String,
        default: null,
    },
    //ảnh thumnail
    urlThumnail: {
        type: String,
        default: null,
    },
    //tác giả
    author: {
        type: String,
        default: null,
    },
    //thẻ chủ đề tìm kiếm
    tags: [{
        type: String,
        default: null
    }],
    //trạng thái đề xuất
    status: {
        type: Number,
        default: 1
    },
    //trạng thái xoá hay chưa
    isDelete: {
        type: Boolean,
        default: false
    },
    //ngày tạo bài đăng
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Tạo mô hình Post từ Schema
const Post = mongoose.model('Post', postSchema);

// Xuất mô hình Post để sử dụng ở nơi khác trong ứng dụng
module.exports = Post;