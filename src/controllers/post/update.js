const updatePost= async (req, res) => {
  const {
    db: { Post },
    params: { id },
    body: { caption_text, img },
  } = req;

  const post = await Post.find(id);
  if (!post) return res.sendStatus(404);

  const updatedPost = await post.update(caption_text, img);
  res.send(updatedPost);

  if (!updatedPost) return res.sendStatus(404);
  res.send(updatedPost);
};

module.exports = updatePost;
