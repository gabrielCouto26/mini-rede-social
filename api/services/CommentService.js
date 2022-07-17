const Comment = require('../models/Comment');

const CommentService = {
  async findAll(){
    return Comment.findAll();
  },
  async findOne(user_id, post_id, id){
    return Comment.findOne({where: { user_id, post_id, id }});
  },
  async findAllByPost(post_id){
    return Comment.findAll({where: { post_id }});
  },
  async findOneByPost(user_id, post_id, id){
    return Comment.findOne({where: { user_id, post_id, id }});
  },
  async create(user_id, post_id, comment){
    return await Comment.create({user_id, post_id, ...comment})
  },
  async update(user_id, post_id, id, comment){
    return await Comment.update(comment, { where: { user_id, post_id, id }});
  },
  async delete(id){
    return await Comment.destroy({where: { id }});
  }
}

module.exports = CommentService;