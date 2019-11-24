
exports.up = function(knex) {
  return knex.schema.table('schedule', function(table) {
    table.string('name').notNull();
  })
};

exports.down = function(knex) {
  return knex.schema.table('schedule', function(table) {
    table.dropColumn('name');
  })
};
