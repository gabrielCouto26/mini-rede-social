const UserRepository = require('../repositories/users');

const UserService = {
  getUsers(){
    return UserRepository.getUsers();
  }
}

module.exports = UserService;