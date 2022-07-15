const database = require('../database');

const UserRepository = {
  getUsers(){
    return database.query('select * from mini.users');
  }
}

module.exports = UserRepository;