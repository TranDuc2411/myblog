const { default: mongoose } = require('mongoose')
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
        // cần có SidePost, HightLinePost, MiniPost
        const Posts = await blogPost.find().limit(6).sort({ createdAt: -1 })
        res.render("blog/home", { Posts })
    } catch (error) {
        console.log('error : ', error)
        res.status(500).json({ error: { code: 500, message: "error server !!!" } })
    }
}

// router.get("/manager", postController.postManager);
exports.postManager = async(req, res) => {
    try {
        const Posts = await blogPost.find().skip().limit()
        res.render('blog/post_manager', { Posts })
    } catch (error) {
        res.status(500).json({ error: { code: 500, message: "error server !!" } })
    }
}

// router.post("/create", postController.createPost);
exports.createPost = async(req, res) => {
    try {
        console.log(req.body)
        const newPost = new blogPost({
            title: req.body.title,
            content: req.body.content,
            urlThumnail: req.body.urlThumnail,
            author: req.body.author,
            tags: req.body.tagsData.split(',').map(item => item.trim())
        })
        console.log(newPost)
        await newPost.save()
        console.log("save ok ... !")
        res.redirect('/post/manager')
    } catch (err) {
        console.log(err)
    }
}

// router.get("/:id", postController.getDetailPost);
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
};

exports.getDetailPost = async(req, res) => {
    try {
        const postId = req.params.id;

        // Kiểm tra xem giá trị postId có phải là ObjectId không
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ error: 'Giá trị _id không hợp lệ' });
        }

        const PostDetail = (await blogPost.findById(postId)).toObject();
        PostDetail.createDate = formatDate(PostDetail.createdAt)
        if (!PostDetail) {
            // Xử lý khi không tìm thấy bài đăng
            return res.status(404).json({ error: 'Bài đăng không tồn tại' });
        }
        // console.log(PostDetail)
        // Gửi chi tiết bài đăng đã được sửa lại đến trang 'blog/detail'
        res.render('blog/detail', { PostDetail });
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết bài đăng:', error);
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu' });
    }
};


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
            await blogPost.findByIdAndUpdate({ _id: req.params.id }, {
                title: req.body.title,
                content: req.body.content,
                urlThumnail: req.body.urlThumnail,
                author: req.body.author,
                tags: req.body.tags.split(',').map(item => item.trim())
            })
            const id = req.params.id
            res.redirect("/post/editpost/" + id)
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