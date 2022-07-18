const LikeService = require('../services/LikeService')

const LikeController = {
  async likePost(req, res){
    const { user_id, post_id } = req.params
    await LikeService.likePost(user_id, post_id)
    res.status(204).send();
  },
  async unlikePost(req, res){
    const { user_id, post_id } = req.params
    await LikeService.unlikePost(user_id, post_id)
    res.status(204).send();
  },
  async likeComment(req, res){
    const { user_id, comment_id } = req.params
    await LikeService.likeComment(user_id, comment_id)
    res.status(204).send();
  },
  async unlikeComment(req, res){
    const { user_id, comment_id } = req.params
    await LikeService.unlikeComment(user_id, comment_id)
    res.status(204).send();
  }  
}

module.exports = LikeController;