const blogPost = require('../model/blogPost')
const Post1 = {
    "title": "Introduction to MongoDB",
    "content": "<h1>MongoDB is a NoSQL database...</h1>",
    "author": "01TranDuc",
    "createdAt": "2023-01-01T12:00:00Z"
}

// router.get("/", postController.getAllPosts);
exports.getAllPosts = async(req, res) => {
    try {
        const Posts = await blogPost.find()
        res.render("blog/home", { Posts })
    } catch (error) {
        console.log('error : ', error)
        res.status(500).json({ error: { code: 500, message: "error server !!!" } })
    }
}

// router.get("/manager", postController.postManager);
exports.postManager = async(req, res) => {
    try {
        const Posts = await blogPost.find()
        res.render('blog/post_manager', { Posts })
    } catch (error) {
        res.status(500).json({ error: { code: 500, message: "error server !!" } })
    }
}

// router.post("/create", postController.createPost);
exports.createPost = async(req, res) => {
    try {
        const newPost = new blogPost(req.body)
        await newPost.save()
        console.log("save ok ... !")
        res.redirect('/post/manager')
    } catch (err) {
        console.log(err)
    }
}

// router.get("/:id", postController.getDetailPost);
exports.getDetailPost = async(req, res) => {
    try {
        const PostDetail = await blogPost.findById(req.params.id)
        res.render('blog/detail', { PostDetail })
            // res.json({ PostDetail })
    } catch (error) {
        res.status(500).json({ error: { code: 500, mess: "server error !!" } })
    }
}

// router.put("/editpost/:id", postController.editPost);
exports.editPost = async(req, res) => {
    if (req.method === 'GET') {
        try {
            const PostDetail = await blogPost.findById(req.params.id)
            res.render('blog/edit_post', { PostDetail })
        } catch (error) {
            res.status(500).json({ error: { status: 500, mess: "server error !!!" } })
        }
    } else if (req.method === 'POST') {
        try {
            await blogPost.findByIdAndUpdate({ _id: req.params.id }, req.body)
            res.redirect("/post/manager")
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: { status: 500, mess: "server error !!!" } })
        }
    }
}

// router.delete("/delete/:id", postController.editPost);
exports.deletePost = async(req, res) => {
    try {
        await blogPost.findByIdAndDelete(req.params.id)
        res.status(200).json({ code: 200, mess: "delete sucsess full" })
    } catch (error) {
        res.status(500).json({ error: { code: 500, mess: "server error !!" } })
    }
}