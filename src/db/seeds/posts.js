/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('posts').insert([
    {id: 1001, user_id: 1, img: "", caption_text: 'random'},
    {id: 1002, user_id: 2, img: "", caption_text: 'caption'},
    {id: 1003, user_id: 1, img: "", caption_text: 'random caption'}
  ]);
};
