const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const Comment = sequelize.define('comment', {
  user_id:  DataTypes.INTEGER,
  post_id:  DataTypes.INTEGER,
  content:  DataTypes.TEXT,
  likes:    DataTypes.ARRAY(DataTypes.INTEGER),
})

module.exports = Comment;