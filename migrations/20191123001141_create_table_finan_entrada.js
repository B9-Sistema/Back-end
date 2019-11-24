
exports.up = function(knex) {
  return knex.schema.createTable('finan_input', table => {
    table.increments('id').primary();
    table.integer('id_user').references('id')
      .inTable('users');
    table.string('name').notNull();
    table.string('date').notNull();
    table.string('input').notNull();
    table.string('value').notNull();
    table.string('description').notNull();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('finan_input');
};

