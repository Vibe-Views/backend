/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('comments').insert([
      {id: 1001, post_id: 1001, user_id: 1, comment_text: 'random things'},
      {id: 1002, post_id: 1002, user_id: 2, comment_text: 'random stuff'},
      {id: 1003, post_id: 1003, user_id: 1, comment_text: 'random thing'}
    ]);
  };