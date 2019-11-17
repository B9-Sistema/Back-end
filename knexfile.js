// Update with your config settings.

module.exports = {
    client: 'postgresql',
    connection: {
      database: 'apib9sistema_final',
      user:     'postgres',
      password: 'k909s41*'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
