const UserRepository = require('../repositories/users');

const UserService = {
  getUsers(){
    return UserRepository.getAll();
  },
  getUserById(id){
    return UserRepository.getById(id);
  },
  getUserByName(name){
    return UserRepository.getByName(name);
  },
  createUser(user){
    return UserRepository.create(user);
  },
  updateUser(id, user){
    return UserRepository.update(id, user);
  },
  deleteUser(id){
    return UserRepository.delete(id);
  }
}

module.exports = UserService;