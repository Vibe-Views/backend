const deleted = async (req, res) => {
    const {
        session,
        db: { Post },
        body: { id }
    } = req
    const user = await Post.delete(Number(id))
    // session.userId = user_id;
    res.send(user);
}

module.exports = deleted;