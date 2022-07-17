const request = require('supertest')

const app = require('../app');
const User = require('../models/User');
const UserService = require('../services/UserService')
const FollowService = require('../services/FollowService')

describe('User', () => {
  async () => await User.destroy({ truncate: true, force: true })

  it('Should get all', async function(){
    const response = await request(app).get('/users')
    expect(response.status).toBe(200);
  })
  
  it('Should create', async function(){
    const newUser = { name: 'Gabriel', email: 'gabriel@email.com'}
    const response = await request(app).post('/users').send(newUser)
    const user = await UserService.findByEmail(newUser.email)

    expect(response.status).toBe(204)
    expect(user.name).toBe(newUser.name)
  })
  
  it('Should update', async function(){
    const user = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com'})
    await request(app).put(`/users/${user.id}`).send({ name: 'Alfredo' })
  
    const updated = await UserService.findOne(user.id)
    expect(updated.name).toBe('Alfredo')

  })

  it('Should delete', async function(){
    const user = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com'})
    const response = await request(app).delete(`/users/${user.id}`)
    expect(response.status).toBe(200)
  })

  it('Should follow other user', async function(){
    const user1 = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com'})
    const user2 = await UserService.create({ name: 'Alfredo', email: 'alfredo@email.com'})

    const response = await request(app).post(`/users/${user1.id}/follow/${user2.id}`)
    const updateUser1 = await UserService.findOne(user1.id)
    const updateUser2 = await UserService.findOne(user2.id)

    expect(response.status).toBe(204)
    expect(updateUser1.following).toHaveLength(1)
    expect(updateUser2.followers).toHaveLength(1)
  })

  it('Should unfollow other user', async function(){
    const user1 = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com'})
    const user2 = await UserService.create({ name: 'Alfredo', email: 'alfredo@email.com'})
    await FollowService.follow(user1.id, user2.id)

    const response = await request(app).post(`/users/${user1.id}/unfollow/${user2.id}`)
    const updateUser1 = await UserService.findOne(user1.id)
    const updateUser2 = await UserService.findOne(user2.id)

    expect(response.status).toBe(204)
    expect(updateUser1.following).toHaveLength(0)
    expect(updateUser2.followers).toHaveLength(0)
  })
})