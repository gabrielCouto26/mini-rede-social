const Post = require('../models/Post');
const Comment = require('../models/Comment');

const LikeService = {
  async likePost(user_id, post_id){
    const post = await Post.findOne({ where: { id: post_id } })
    await post.update({ likes: [...post.likes || [], user_id]})
  },
  async unlikePost(user_id, post_id){
    const post = await Post.findOne({ where: { id: post_id } })
    const likes = post.likes.filter(id => id != user_id) || []
    await post.update({ likes })
  },
  async likeComment(user_id, comment_id){
    const comment = await Comment.findOne({ where: { id: comment_id } })
    await comment.update({ likes: [...comment.likes || [], user_id]})
  },
  async unlikeComment(user_id, comment_id){
    const comment = await Comment.findOne({ where: { id: comment_id } })
    const likes = comment.likes.filter(id => id != user_id)
    await comment.update({ likes })
  }  
}

module.exports = LikeService;