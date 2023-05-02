const createPost = async (req, res) => {
    const {
      session,
      db: { User },
      body: { img_url },
    } = req;

    const userId = session.userId;
    const post = await User.createPost(userId, img_url);
    res.send(post);
  };
  
  module.exports = createPost;