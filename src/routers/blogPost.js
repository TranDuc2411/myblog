const express = require('express');
const router = express.Router();
const postController = require('../controller/blogPostController');


// role admin
router.get("/manager", postController.postManager);
router.post("/create", postController.createPost);
router.post("/editpost/:id", postController.editPost);
router.get("/editpost/:id", postController.editPost);
router.delete("/delete/:id", postController.deletePost);

// API public
router.get("/home", postController.getAllPosts);
router.get("/detail/:id", postController.getDetailPost);

module.exports = router;