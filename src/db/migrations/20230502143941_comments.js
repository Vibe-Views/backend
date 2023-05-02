/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.integer('comment_id').notNullable()
    table.integer('post_id').notNullable()
    table.integer('user_id').notNullable()
    table.text('comment_text').notNullable()
    table.timestamps(true, true);
  });
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = (knex) => knex.schema.dropTable('comments');
  