const createComment = async (req, res) => {
    const {
      session,
      db: { User },
      body: { comment_text, post_id },
    } = req;

    const userId = session.userId;
    const comment = await User.createComment(userId, comment_text, post_id);
    res.send(comment);
  };
  
  module.exports = createComment;