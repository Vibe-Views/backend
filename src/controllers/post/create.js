const createPost = async (req, res) => {
    const {
        session,
        db: { Post },
        body: { url, caption }
    } = req
    const userId = session.userId;
    const user = await Post.create(userId, url, caption);
    res.send(user);
}

module.exports = createPost;    