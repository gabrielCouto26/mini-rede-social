module.exports = {
  dialect: 'postgres',
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host:     process.env.POSTGRES_HOST,
  port:     process.env.POSTGRES_PORT,
  define: {
    timestamps: true,
    underscored: true
  }
}