async function update (req, res){
  const {
    db: { Post },
    params: { id },
    body: { caption_text },
  } = req;
  const post = await Post.find(id);
  if (!post) return res.sendStatus(404);
  const updatedPost = await post.updateCaption(caption_text);
  if (!updatedPost) return res.sendStatus(404);
  res.send(updatedPost);
};
module.exports = update;