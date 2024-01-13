class PostDTO {
    constructor(_id, title, introduction, content, urlThumnail, author, tags, createAt) {
        this._id = _id || null;
        this.title = title || null;
        this.introduction = introduction || null;
        this.content = content || null;
        this.urlThumnail = urlThumnail || null;
        this.author = author || null;
        this.tags = tags || null;
        // this.viewCount = viewCount || 0;
        this.createAt = createAt || 0;
    }
}

module.exports = PostDTO;