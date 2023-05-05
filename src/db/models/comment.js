const knex = require('../knex');


class Comment {
    constructor({ id, post_id, user_id, comment_text}) {
      this.id = id;
      this.post_id = post_id;
      this.user_id = user_id
      this.comment_text = comment_text
    }

    static async delete (user_id, post_id)  {
      try {
        console.log(user_id, post_id)
        const query = `DELETE FROM comments WHERE post_id = ? AND user_id = ? RETURNING *`;
        const { rows: [comment]} = await knex.raw(query, [post_id, user_id]);
        return comment;
      } catch (err) {
        console.error(err);
        return null;
      }
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


module.exports = Comment