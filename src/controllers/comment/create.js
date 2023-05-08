const create = async (req, res) => {
    const {
        session,
        db: { Comment },
        body: { post_id, comment_text }
    } = req;
    
    const comment = await Comment.createComment(session.userId, comment_text, post_id);
    console.log(session.userId, comment_text, post_id)
    // session.userId = user_id;
    res.send(comment);
}

module.exports = create;