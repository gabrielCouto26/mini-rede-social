const express = require('express');
const router = express.Router();

const UserController    = require('./controllers/UserController');
const PostController    = require('./controllers/PostController');
const CommentController = require('./controllers/CommentController');
const FollowController = require('./controllers/FollowController');


// router.get('/', HomeController.index);

// Users
router.get(   '/users/',    UserController.index);
router.post(  '/users/',    UserController.create);
router.get(   '/users/:id', UserController.show);
router.put(   '/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

// Posts
router.get(   '/users/:user_id/posts',     PostController.index);
router.post(  '/users/:user_id/posts',     PostController.create);
router.get(   '/users/:user_id/posts/:id', PostController.show);
router.put(   '/users/:user_id/posts/:id', PostController.update);
router.delete('/users/:user_id/posts/:id', PostController.delete);

// Comments
router.get(   '/users/:user_id/posts/:post_id/comments',     CommentController.index);
router.post(  '/users/:user_id/posts/:post_id/comments',     CommentController.create);
router.put(   '/users/:user_id/posts/:post_id/comments/:id', CommentController.update);
router.delete('/users/:user_id/posts/:post_id/comments/:id', CommentController.delete);

// Follow
router.post('/users/:user_id/follow/:id',   FollowController.follow);
router.post('/users/:user_id/unfollow/:id', FollowController.unfollow);

module.exports = router;
