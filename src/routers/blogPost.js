const express = require('express');
const router = express.Router();
const postController = require('../controller/blogPostController');
const UpdateMiddlerWare = require('../middleware/upload');
const { checkLogin } = require('../middleware/auth');

// role admin
router.get("/manager", checkLogin, postController.postManager);
router.post("/create", checkLogin, UpdateMiddlerWare.UpdateMiddlerWare("urlThumnail"), postController.createPost);
router.post("/editpost/:id", checkLogin, UpdateMiddlerWare.UpdateMiddlerWare("urlThumnail"), postController.editPost);
router.get("/editpost/:id", checkLogin, postController.editPost);
router.delete("/delete/:id", checkLogin, postController.deletePost);

// API public
router.get("/", postController.getAllpost);
router.get("/bytag", postController.filterPostByTag);
router.get("/month/:month", postController.filterPostinSameMonth);
router.get("/date/:date", postController.filterPostinSameDay);
router.get("/detail/:id", postController.getDetailPost);
router.get("/:month/:id", postController.getDetailPost);

module.exports = router;