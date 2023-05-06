/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.integer('post_id').references('id').inTable('posts')
    table.integer('user_id').references('id').inTable('users')
    table.text('comment_text')
    table.timestamps(true, true);
  });
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = (knex) => knex.schema.dropTable('comments');
  