const request = require('supertest')

const app = require('../app')
const Comment = require('../models/Comment')
const UserService = require('../services/UserService')
const PostService = require('../services/PostService')
const CommentService = require('../services/CommentService')
const LikeService = require('../services/LikeService')

describe('Comment', () => {
  async () => await Comment.destroy({ truncate: true, force: true })

  it('Should get comments by post', async function(){
    const user = await UserService.create({ name: 'Teste', email: 'teste@email.com'})
    const post = await PostService.create(user.id, { title: 'titulo', content: 'conteudo' })
    const response = await request(app).get(`/users/${user.id}/posts/${post.id}/comments`)

    expect(response.status).toBe(200);
  })
  
  it('Should create', async function(){
    const user = await UserService.create({ name: 'Teste', email: 'teste@email.com'})
    const post = await PostService.create(user.id, { title: 'titulo', content: 'conteudo' })
    const newComment = { content: 'comentario' }
    const response = await request(app)
                            .post(`/users/${user.id}/posts/${post.id}/comments`)
                            .send(newComment)
    const [ comment ] = await CommentService.findAllByPost(post.id)

    expect(response.status).toBe(204)
    expect(comment.content).toBe(newComment.content)
  })
  
  it('Should update', async function(){
    const user = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com'})
    const post = await PostService.create(user.id, { title: 'titulo', content: 'conteudo' })
    const newComment = { content: 'novo comentario' }
    const comment = await CommentService.create(user.id, post.id, newComment)
    await request(app)
            .put(`/users/${user.id}/posts/${post.id}/comments/${comment.id}`)
            .send(newComment)
  
    const [ updated ] = await CommentService.findAllByPost(post.id)
    expect(updated.content).toBe(newComment.content)
  })

  it('Should delete', async function(){
    const user = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com'})
    const post = await PostService.create(user.id, { title: 'titulo', content: 'conteudo' })
    const comment = await CommentService.create(user.id, post.id, { content: 'comentario' })
    const response = await request(app).delete(`/users/${user.id}/posts/${post.id}/comments/${comment.id}`)

    expect(response.status).toBe(200)
  })

  it('Should receive likes', async function(){
    const user = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com'})
    const post = await PostService.create(user.id, { title: 'titulo', content: 'conteudo' })
    const comment = await CommentService.create(user.id, post.id, { content: 'comentario' })
    const response = await request(app).post(`/comments/${comment.id}/like/${user.id}`)

    const updatedComment = await CommentService.findOneByPost(user.id, post.id, comment.id)

    expect(response.status).toBe(204)
    expect(updatedComment.likes).toHaveLength(1)
  })

  it('Should receive unlikes', async function(){
    const user = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com'})
    const post = await PostService.create(user.id, { title: 'titulo', content: 'conteudo' })
    const comment = await CommentService.create(user.id, post.id, { content: 'comentario' })
    await LikeService.likeComment(user.id, comment.id)

    const response = await request(app).post(`/comments/${comment.id}/unlike/${user.id}`)
    const updatedComment = await CommentService.findOneByPost(user.id, post.id, comment.id)

    expect(response.status).toBe(204)
    expect(updatedComment.likes).toHaveLength(0)
  })
})