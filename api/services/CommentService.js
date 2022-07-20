const Comment = require('../models/Comment');
const UserService = require('../services/UserService')

const CommentService = {
  async findAll(){
    return Comment.findAll();
  },
  async findOne(user_id, post_id, id){
    return Comment.findOne({where: { user_id, post_id, id }});
  },
  async findAllByPost(post_id){
    const comments = await Comment.findAll({where: { post_id }});
    const commentsWithUser = Promise.all(comments.map(async (comment) => {
      const { id, name } = await UserService.findOne(comment.user_id);
      return {
        id:      comment.id,
        user:    { id, name },
        content: comment.content,
        likes:   comment.likes
      }
    }))

    return commentsWithUser;
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