/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('comments').insert([
      {id: 1, posts_id: 1, user_id: 1, comment_text: 'random things'},
      {id: 2, posts_id: 2, user_id: 2, comment_text: 'random stuff'},
      {id: 3, posts_id: 3, user_id: 1, comment_text: 'random thing'}
    ]);
  };