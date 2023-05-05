const create = async (req, res) => {
    const {
        session,
        db: { Comment },
        body: { user_id, post_id, comment_text }
    } = req;
    
    const comment = await Comment.createComment(user_id, comment_text, post_id);
    // session.userId = user_id;
    res.send(comment);
}

module.exports = create;