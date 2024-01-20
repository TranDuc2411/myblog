const { default: mongoose } = require('mongoose')
const blogPost = require('../model/blogPost')
const user = require('../model/user')
const blogDTO = require('../DTO/blogDTO')
const userDTO = require('../DTO/userDTO')
const UserDTO = require('../DTO/userDTO')
const PostDTO = require('../DTO/blogDTO')
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
};

// router.get("/", postController.getAllpost);
exports.getAllpost = async(req, res) => {
    try {
        // Info 
        const userInfo = await user.findOne({ email: "tranngocminhduc2411@gmail.com" })
        if (userInfo != null) {
            var infoView = new UserDTO(
                userInfo.displayname || "Trần Ngọc Minh Đức",
                userInfo.nickname || "01tranduc",
                "24/11/2001",
                userInfo.email || "tranngocminhduc2411@gmail.com",
                userInfo.favoriteJob || "freelancer",
                userInfo.social_network || "nothings",
                userInfo.avatar || "",
                userInfo.aboutme || "something"
            )
        } else {
            infoView = new UserDTO(
                "Trần Ngọc Minh Đức",
                "01tranduc ",
                "24/11/2001",
                "tranngocminhduc2411@gmail.com",
                "freelancer",
                "nothings",
                "",
                "something- data demo"
            )
        }
        // console.log(infoView)
        //new post
        const post = await blogPost.find().limit(6).sort({ createdAt: -1 })
        const newPost = []
        for (post of post) {
            const postTmp = new PostDTO(
                post._id,
                post.title,
                post.introduction,
                post.content,
                post.urlThumnail,
                "tranngocminhduc",
                post.tags,
                formatDate(post.createdAt)
            )
            newPost.push(postTmp)
        }
        const newPostCenter = newPost.slice(0, 2)
        const newpostide = newPost.slice(2)
            // console.log(newPostCenter, newpostide)

        // recoment Post
        const listRecomentPost = await blogPost.find({ isRecoment: true }).limit(5).sort({ createdAt: -1 })
        const recomentPostExport = []
        for (recomentPost of listRecomentPost) {
            const recomentPostTmp = new PostDTO(
                recomentPost._id,
                recomentPost.title,
                recomentPost.introduction,
                recomentPost.content,
                recomentPost.urlThumnail,
                "tranngocminhduc",
                recomentPost.tags,
                formatDate(recomentPost.createdAt)
            )
            recomentPostExport.push(recomentPost)
        }
        // console.log(recomentPostExport)
        const newPostSide = {}

        res.render("blog/home", { infoView, post, newPostCenter, newpostide, recomentPostExport, newPostSide })
    } catch (error) {
        console.log('error : ', error)
        res.status(500).json({ error: { code: 500, message: "error server !!!" } })
    }
}

// API các bài theo tháng
// router.get("/:month/:id", postController.getDetailPost);

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
            introduction: req.body.introduction,
            urlThumnail: req.body.urlThumnail,
            author: req.body.author,
            isRecoment: req.body.isRecoment,
            tags: req.body.tagsData.split(',').map(item => item.trim())
        })

        // console.log(newPost)

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

//by Tag
// GET /byTags?tags=tag1=tag2=tag3
exports.filterPostByTag = async(req, res) => {
    try {
        const tags = req.query.tags; // Lấy danh sách tags từ query parameters

        // Chuyển đổi chuỗi tags thành mảng
        const tagsArray = tags ? tags.split('=') : [];

        // Lọc bài đăng có ít nhất một trong những tag trong danh sách và không bị xoá
        const post = await blogPost.find({ tags: { $in: tagsArray }, isDelete: false }).sort({ createdAt: -1 });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// inSameMonth
exports.filterPostinSameMonth = async(req, res) => {

}

// inSameDay
exports.filterPostinSameDay = async(req, res) => {

}