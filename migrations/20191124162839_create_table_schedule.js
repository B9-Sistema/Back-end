
exports.up = function(knex) {
  return knex.schema.createTable('schedule', table => {
    table.increments('id').primary();
    table.integer('id_user').references('id')
      .inTable('users');
    table.string('name').notNull();
    table.string('date').notNull();
    table.string('hour').notNull();
    table.string('description').notNull();
    table.string('place').notNull();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('schedule');
};

