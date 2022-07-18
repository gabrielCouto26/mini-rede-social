const request = require('supertest')

const app = require('../app')
const UserService = require('../services/UserService')
const PostService = require('../services/PostService')
const LikeService = require('../services/LikeService')

describe('Post', () => {
  it('Should get posts by user', async function(){
    const user = await UserService.create({ name: 'Teste', email: 'teste@email.com', password_hash: '1234' })
    const response = await request(app).get(`/users/${user.id}/posts`)

    expect(response.status).toBe(200);
  })
  
  it('Should create', async function(){
    const user = await UserService.create({ name: 'Teste', email: 'teste@email.com', password_hash: '1234' })
    const newPost = { title: 'titulo', content: 'conteudo' }
    const response = await request(app).post(`/users/${user.id}/posts`).send(newPost)
    const [ post ] = await PostService.findAllByUser(user.id)

    expect(response.status).toBe(204)
    expect(post.title).toBe(newPost.title)
  })
  
  it('Should update', async function(){
    const user = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com', password_hash: '1234' })
    const post = await PostService.create(user.id, { title: 'titulo', content: 'conteudo' })
    const newPost = { title: 'novo titulo', content: 'conteudo' }
    await request(app).put(`/users/${user.id}/posts/${post.id}`).send(newPost)
  
    const [ updated ] = await PostService.findAllByUser(user.id)
    expect(updated.title).toBe(newPost.title)
  })

  it('Should delete', async function(){
    const user = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com', password_hash: '1234' })
    const post = await PostService.create(user.id, { title: 'titulo', content: 'conteudo' })
    const response = await request(app).delete(`/users/${user.id}/posts/${post.id}`)

    expect(response.status).toBe(200)
  })

  it('Should receive likes', async function(){
    const user = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com', password_hash: '1234' })
    const post = await PostService.create(user.id, { title: 'titulo', content: 'conteudo' })
    const response = await request(app).post(`/posts/${post.id}/like/${user.id}`)

    const updatedPost = await PostService.findOneByUser(user.id, post.id)

    expect(response.status).toBe(204)
    expect(updatedPost.likes).toHaveLength(1)
  })

  it('Should receive unlikes', async function(){
    const user = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com', password_hash: '1234' })
    const post = await PostService.create(user.id, { title: 'titulo', content: 'conteudo' })
    await LikeService.likePost(user.id, post.id)

    const response = await request(app).post(`/posts/${post.id}/unlike/${user.id}`)
    const updatedPost = await PostService.findOneByUser(user.id, post.id)

    expect(response.status).toBe(204)
    expect(updatedPost.likes).toHaveLength(0)
  })
})