const express = require('express');
const router = express.Router();

const AuthController    = require('./controllers/AuthController');
const UserController    = require('./controllers/UserController');
const PostController    = require('./controllers/PostController');
const CommentController = require('./controllers/CommentController');
const FollowController  = require('./controllers/FollowController');
const LikeController    = require('./controllers/LikeController');


// Auth
router.post('/register', AuthController.register);
router.post('/login',    AuthController.login);

// Home
// router.get('/', HomeController.index);

// Users
router.get(   '/users/',    UserController.index);
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

// Like
router.post('/posts/:post_id/like/:user_id',         LikeController.likePost);
router.post('/posts/:post_id/unlike/:user_id',       LikeController.unlikePost);
router.post('/comments/:comment_id/like/:user_id',   LikeController.likeComment);
router.post('/comments/:comment_id/unlike/:user_id', LikeController.unlikeComment);

module.exports = router;
