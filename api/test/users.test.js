const request = require('supertest')

const app = require('../app')
const UserService = require('../services/UserService')

describe('User', () => {
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
})