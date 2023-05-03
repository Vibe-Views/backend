const knex = require('../knex');

class Post {
    constructor({ id, user_id, img}) {
        this.id = id
        this.user_id = user_id
        this.img = img 
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
}

module.exports = Post