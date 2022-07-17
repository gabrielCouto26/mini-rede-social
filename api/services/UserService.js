const User = require('../models/User');

const UserService = {
  async findAll(){
    return await User.findAll();
  },
  async findOne(id){
    return await User.findOne({ where: { id } });
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
  } 
}

module.exports = UserService;