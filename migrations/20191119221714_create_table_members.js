
exports.up = function(knex) {
  return knex.schema.createTable('members', table => {
    table.increments('id').primary();
    table.integer('id_user').references('id')
      .inTable('users');
    table.string('name').notNull();
    table.string('address').notNull();
    table.string('telephone').notNull();
    table.string('email').notNull();
    table.string('cpf').notNull();
    table.string('profession').notNull();
    table.string('situation').notNull();
    table.string('office').notNull();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('members');
};
