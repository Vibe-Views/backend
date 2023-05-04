const createPost = async (req, res) => {
    const {
        session,
        db: { Post },
        body: {user_id, img}
    } = req
    const user = await post.create(user_id, img)
    session.userId = user.id
    res.send(create)

}

module.exports = createPost