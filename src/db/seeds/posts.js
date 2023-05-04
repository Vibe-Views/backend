/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('posts').insert([
    {id: 1, user_id: 1, img: "", caption_text: 'random'},
    {id: 2, user_id: 2, img: "", caption_text: 'caption'},
    {id: 3, user_id: 1, img: "", caption_text: 'random caption'}
  ]);
};
