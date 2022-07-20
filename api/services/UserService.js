const User = require('../models/User');

const UserService = {
  async findAll(){
    return await User.findAll();
  },
  async findOne(id){
    return await User.findOne({ where: { id } })
  },
  async findOneFull(userId){
    const user = await User.findOne({ where: { id: userId } });
    const following = await this._following(user)
    const followers = await this._followers(user)
    const { id, name, email } = user
    return {
      id,
      name,
      email,
      following,
      followers
    }
  },
  async findByEmail(email){
    return await User.findOne({ where: { email }})
  },
  async create(user){
    return await User.create(user)
  },
  async update(id, user){
    return await User.update(user, { where: { id }});
  },
  async delete(id){
    return await User.destroy({ where: { id } });
  },
  async _following(user){
    return Promise.all(user.following?.map(async userId => {
      const { id, name, email } = await User.findOne({ where: { id: userId }})
      return { id, name, email }
    }) || [])
  },
  async _followers(user){
    return Promise.all(user.followers?.map(async userId => {
      const { id, name, email } = await User.findOne({ where: { id: userId }})
      return { id, name, email }
    }) || [])
  }
}



module.exports = UserService;