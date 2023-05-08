const list = async (req, res) => {
    const {
        session,
        db: { Comment },
        params: { post_id }
    } = req;
    // const userId = session.userId
    const list = await Comment.listComment(post_id);
    // session.userId = user_id;
    res.send(list);
}

module.exports = list;