const FollowService = require('../services/FollowService')

const FollowController = {
  async follow(req, res){
    const { user_id, id } = req.params
    await FollowService.follow(user_id, id)
    res.status(204).send();
  },
  async unfollow(req, res){
    const { user_id, id } = req.params
    await FollowService.unfollow(user_id, id)
    res.status(204).send();
  }
}

module.exports = FollowController;