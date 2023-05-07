const list = async (req, res) => {
    const { session, db: {Post} } = req;
    // console.log(session)
    const userId = session.userId;
    const posts = await Post.listMyPost(userId);
    posts ? res.send(posts) : null;
}

module.exports = list