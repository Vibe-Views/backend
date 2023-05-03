const createPost = async (req, res) => {
    const {
        session,
        db: { User },
        body: {user_id, img}
    } = req
    const user = await post.create(user_id, img)
    session.userId = user.id
}