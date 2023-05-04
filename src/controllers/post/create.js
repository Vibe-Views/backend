const createPost = async (req, res) => {
    const {
        session,
        db: { Post },
        body: { user_id, img, caption_text }
    } = req
    const user = await Post.create(user_id, img, caption_text)
    // session.userId = user_id;
    res.send(user);
}

module.exports = createPost;