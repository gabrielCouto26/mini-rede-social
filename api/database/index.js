const pgp = require('pg-promise')();

const connection = {
  user:     process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host:     process.env.POSTGRES_HOST,
  port:     process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB
}

module.exports = pgp(connection);