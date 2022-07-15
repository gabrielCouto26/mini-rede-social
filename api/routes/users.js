const express = require('express');
const router = express.Router();

const UserService = require('../services/users');

/* LIST */
router.get('/', async function(req, res, next) {
  const users = await UserService.getUsers();
  res.status(200).json(users);
});

/* ONE */
router.get('/:id', async function(req, res, next) {
  const user = await UserService.getUserById(req.params.id)
  res.status(200).json(user);
});

/* CREATE */
router.post('/', async function(req, res, next) {
  const newUser = req.body
  const user = await UserService.createUser(newUser)
  res.status(200).json(user);
});

/* UPDATE */
router.put('/:id', async function(req, res, next) {
  const newUser = req.body
  const user = await UserService.updateUser(req.params.id, newUser)
  res.status(200).json(user);
});

/* DELETE */
router.delete('/:id', async function(req, res, next) {
  const id = req.params.id
  await UserService.deleteUser(id)
  res.status(200).json({id});
});

module.exports = router;
