const bcrypt = require('bcrypt')
const UserService = require('../services/UserService')

const AuthService = {
  async register(name, email, password){
    const password_hash = await bcrypt.hash(password, 10)
    return await UserService.create({ name, email, password_hash })
  },
  async login(email, password){
    const user = await UserService.findByEmail(email)
    return await bcrypt.compare(password, user.password_hash)
  },  
};

module.exports = AuthService;