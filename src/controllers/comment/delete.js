const deleted = async (req, res) => {
    const {
        session,
        db: { Comment },
        body: { id }
    } = req;
    const comment = await Comment.delete(id)

    comment ? res.send(comment) : res.sendStatus(404);
}

module.exports = deleted;