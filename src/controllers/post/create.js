const createPost = async (req, res) => {
    const {
        session,
        db: { Post },
        body: {user_id, img}
    } = req
    const user = await Post.create(user_id, img)
    session.userId = user.id
}