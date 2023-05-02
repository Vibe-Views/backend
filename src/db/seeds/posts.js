/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').insert([
    {id: 1, user_id: 1, img: ""},
    {id: 2, user_id: 2, img: ""},
    {id: 3, user_id: 1, img: ""}
  ]);
};
