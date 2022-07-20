const HomeService = require('../services/HomeService')

const HomeController = {
  async index(req, res){
    const { user_id } = req.params;
    const posts = await HomeService.postsFromFollowing(user_id);
    res.status(200).json(posts);
  }
}

module.exports = HomeController;