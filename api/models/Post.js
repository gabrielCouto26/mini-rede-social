const { DataTypes } = require('sequelize')
const sequelize = require('../database');

const Comment = require('./Comment');

const Post = sequelize.define('post', {
  user_id:  DataTypes.INTEGER,
  title:    DataTypes.STRING,
  content:  DataTypes.TEXT,
  likes:    DataTypes.ARRAY(DataTypes.INTEGER)
})

Post.Comment = Post.hasMany(Comment)
Comment.Post = Comment.belongsTo(Post)

module.exports = Post;