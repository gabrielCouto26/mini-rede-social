const Post = require('../models/Post');

const PostService = {
  async findAll(){
    return Post.findAll();
  },
  async findAllByUser(user_id){
    return Post.findAll({where: { user_id }});
  },
  async findOneByUser(user_id, id){
    return Post.findOne({where: { user_id, id }});
  },
  async create(user_id, post){
    return await Post.create({user_id, ...post})
  },
  async update(user_id, id, post){
    return await Post.update(post, { where: { user_id, id }});
  },
  async delete(id){
    return await Post.destroy({where: { id }});
  }
}

module.exports = PostService;