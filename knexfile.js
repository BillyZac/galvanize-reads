module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL
    },
  },

  production: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL,
      user:     process.env.PG_USER,
      password: process.env.PG_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
