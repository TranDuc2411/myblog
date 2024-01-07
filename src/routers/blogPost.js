const express = require('express');
const router = express.Router();
const postController = require('../controller/blogPostController');
const UpdateMiddlerWare = require('../middleware/upload')

// role admin
router.get("/manager", postController.postManager);
router.post("/create", UpdateMiddlerWare.UpdateMiddlerWare("urlThumnail"), postController.createPost);
router.post("/editpost/:id", UpdateMiddlerWare.UpdateMiddlerWare("urlThumnail"), postController.editPost);
router.get("/editpost/:id", postController.editPost);
router.delete("/delete/:id", postController.deletePost);

// API public
router.get("/", postController.getAllPosts);
router.get("/detail/:id", postController.getDetailPost);

module.exports = router;