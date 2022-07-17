module.exports = {
  dialect: 'postgres',
  database: process.env.POSTGRES_DB       || 'mini_rede_social',
  username: process.env.POSTGRES_USER     || 'root',
  password: process.env.POSTGRES_PASSWORD || 'root',
  host:     process.env.POSTGRES_HOST     || 'localhost',
  port:     process.env.POSTGRES_PORT     || 5432,
  define: {
    timestamps: true,
    underscored: true
  }
}