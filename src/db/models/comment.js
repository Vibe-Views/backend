const knex = require('../knex');


class Comment {
    constructor({ id, post_id, user_id, comment_text}) {
      this.id = id;
      this.post_id = post_id;
      this.user_id = user_id
      this.comment_text = comment_text
    }
  
 static async createComment (user_id, comment_text, post_id) {
    try {
      const query = `INSERT INTO comments (user_id, comment_text, post_id)
        VALUES (?, ?, ?) RETURNING *`;
      const { rows: [comment] } = await knex.raw(query, [user_id, comment_text, post_id]);
      return comment
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  

  
}  