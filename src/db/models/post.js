const knex = require('../knex');

class Post {
    constructor({ id, user_id, img, caption_text}) {
        this.id = id;
        this.user_id = user_id;
        this.img = img;
        this.caption_text = caption_text;
    }
    
    
    updateCaption = async (caption_text) => {
      try {
        const query = `UPDATE posts SET caption_text = ? WHERE id = ? RETURNING *`;
        const { rows: [updatedCaption] } = await knex.raw(query, [caption_text, this.id]);
        return updatedCaption;
      } catch (err) {
        console.error(err);
        return null;
      }
    }

    static async delete (id)  {
      try {
        await knex.raw(`DELETE FROM comments WHERE id = ?`, [id])
        const query = `DELETE FROM posts WHERE id = ? RETURNING *`;
        const { rows: [post] } = await knex.raw(query, [id]);
        return post;
      } catch (err) {
        console.error(err);
        return null;
      }
    }

    static async find(id) {
      console.log(id)
      try {
        const query = 'SELECT * FROM posts WHERE id = ?';
        const { rows: [post] } = await knex.raw(query, [id]);
        return post ? new Post(post) : null;
      } catch (err) {
        console.error(err);
        return null;
      }
    }

    static async list() {
        try {
          const query = 'SELECT * FROM posts';
          const { rows } = await knex.raw(query);
          return rows.map((post) => new Post(post));
        } catch (err) {
          console.error(err);
          return null;
        }
    }
    static async create (user_id, img, caption_text) {
      try {
        const query = `INSERT INTO posts (user_id, img, caption_text)
          VALUES (?, ?, ?) RETURNING *`;
        const { rows: [post] } = await knex.raw(query, [user_id, img, caption_text]);
        return post ? new Post(post) : null;
      } catch (err) {
        console.error(err);
        return null;
      }
    }
}

module.exports = Post