const express = require('express');
const router = express.Router();

const userService = require('../services/users');

/* LIST */
router.get('/', async function(req, res, next) {
  const users = await userService.getUsers();
  res.status(200).json(users);
});

/* ONE */
router.get('/:id', async function(req, res, next) {
  res.status(200).send({ok: true});
});

/* CREATE */
router.post('/', async function(req, res, next) {
  res.status(200).send({ok: true});
});

/* UPDATE */
router.put('/:id', async function(req, res, next) {
  res.status(200).send({ok: true});
});

/* DELETE */
router.delete('/:id', async function(req, res, next) {
  res.status(200).send({ok: true});
});

module.exports = router;
