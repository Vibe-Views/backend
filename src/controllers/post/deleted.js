const deleted = async (req, res) => {
    const {
        session,
        db: { Post },
        body: { id }
    } = req
    let thisId = this.id
    const userId = session.userId;
    const user = await Post.delete(userId, Number(id))
    console.log(thisId)
    // session.userId = user_id;
    res.send(user);
}

module.exports = deleted;