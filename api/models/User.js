const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const Post = require('./Post')

const User = sequelize.define('user', {
  name:          DataTypes.STRING,
  email:         DataTypes.STRING,
  password:      DataTypes.VIRTUAL,
  password_hash: DataTypes.STRING,
  followers:     DataTypes.ARRAY(DataTypes.INTEGER),
  following:     DataTypes.ARRAY(DataTypes.INTEGER)
})

User.Post = User.hasMany(Post)
Post.User = Post.belongsTo(User)

module.exports = User;