const deleted = async (req, res) => {
    const {
        session,
        db: { Post },
        body: { id }
    } = req
    console.log(id)
    const user = await Post.delete(id)
    // session.userId = user_id;
    res.send(user);
}

module.exports = deleted;