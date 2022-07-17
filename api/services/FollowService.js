const User = require('../models/User');

const UserService = {
  async followers(id){
    const user = await User.findAll({ where: { id } });
    return user.followers;
  },
  async following(id){
    const user = await User.findAll({ where: { id } });
    return user.following;
  },
  async follow(id, following_id){
    const user = await User.findOne({ where: { id } });
    const userToFollow = await User.findOne({ where: { id: following_id } });
    
    await user.update({ following: [...user.following || [], following_id] });
    await userToFollow.update({ followers: [...userToFollow.followers || [], id] });
  },
  async unfollow(id, following_id){
    const user = await User.findOne({ where: { id } });
    const userToUnfollow = await User.findOne({ where: { id: following_id } });

    const following = user.following.filter(following => following != following_id);
    const followers = userToUnfollow.followers.filter(follower => follower != id);

    await user.update({ following });
    await userToUnfollow.update({ followers });
  }  
}

module.exports = UserService;