const database = require('../database');

const UserRepository = {
  getAll(){
    return database.query('SELECT * FROM mini.users');
  },
  getById(id){
    return database.oneOrNone('SELECT * FROM mini.users WHERE id=$1', [id])
  },
  getByName(name){
    return database.one('SELECT name FROM mini.users WHERE name=$1', [name])
  },
  create(user){
    return database.one(
      'INSERT INTO mini.users (name, date) VALUES ($1, $2) returning *',
      [user.name, user.date]
    )
  },
  update(id, user){
    return database.none('UPDATE mini.users SET name = $1 WHERE id = $2', [user.name, id])
  },
  delete(id){
    return database.none('DELETE FROM mini.users WHERE id=$1', [id])
  }
}

module.exports = UserRepository;