module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/galvanize-reads',
    seeds: {
      directory: 'seeds/'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

}
