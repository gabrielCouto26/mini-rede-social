const Post = require('../models/Post')
const UserService = require('../services/UserService')
const CommentService = require('../services/CommentService')

const HomeService = {
  async postsFromFollowing(user_id){
    const currentUser = await UserService.findOne(user_id);
    const posts = await Post.findAll({
      where: { user_id: [...currentUser.following, currentUser.id] },
      order: [['createdAt', 'DESC']]
    });

    const response = Promise.all(posts.map(async (post) => {
      const { id, name } = await UserService.findOne(post.user_id);
      const comments = await CommentService.findAllByPost(post.id);

      return {
        id:       post.id,
        user:     { id, name },
        title:    post.title,
        content:  post.content,
        likes:    post.likes,
        comments: comments
      }
    }))

    return response;
  }
}

module.exports = HomeService;