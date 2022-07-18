const request = require('supertest')

const app = require('../app');
const UserService = require('../services/UserService')
const FollowService = require('../services/FollowService')

describe('User', () => {
  it('Should get all', async function(){
    const response = await request(app).get('/users')
    expect(response.status).toBe(200);
  })
  
  it('Should create', async function(){
    const userHash = { name: 'Gabriel', email: 'gabriel@email.com', password_hash: '1234' }
    const user = await UserService.create(userHash)

    expect(userHash.name).toBe(user.name)
  })
  
  it('Should update', async function(){
    const user = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com', password_hash: '1234' })
    await request(app).put(`/users/${user.id}`).send({ name: 'Alfredo' })
  
    const updated = await UserService.findOne(user.id)
    expect(updated.name).toBe('Alfredo')

  })

  it('Should delete', async function(){
    const user = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com', password_hash: '1234' })
    const response = await request(app).delete(`/users/${user.id}`)
    expect(response.status).toBe(200)
  })

  it('Should follow other user', async function(){
    const user1 = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com', password_hash: '1234' })
    const user2 = await UserService.create({ name: 'Alfredo', email: 'alfredo@email.com', password_hash: '1234' })

    const response = await request(app).post(`/users/${user1.id}/follow/${user2.id}`)
    const updateUser1 = await UserService.findOne(user1.id)
    const updateUser2 = await UserService.findOne(user2.id)

    expect(response.status).toBe(204)
    expect(updateUser1.following).toHaveLength(1)
    expect(updateUser2.followers).toHaveLength(1)
  })

  it('Should unfollow other user', async function(){
    const user1 = await UserService.create({ name: 'Gabriel', email: 'gabriel@email.com', password_hash: '1234' })
    const user2 = await UserService.create({ name: 'Alfredo', email: 'alfredo@email.com', password_hash: '1234' })
    await FollowService.follow(user1.id, user2.id)

    const response = await request(app).post(`/users/${user1.id}/unfollow/${user2.id}`)
    const updateUser1 = await UserService.findOne(user1.id)
    const updateUser2 = await UserService.findOne(user2.id)

    expect(response.status).toBe(204)
    expect(updateUser1.following).toHaveLength(0)
    expect(updateUser2.followers).toHaveLength(0)
  })
})