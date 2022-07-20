const request = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app');
const UserService = require('../services/UserService');
const AuthService = require('../services/AuthService');

describe('Auth', () => {
  it('Should register new user', async function(){
    const email = Math.floor(Math.random() * 10001).toString() + '@email.com';
    const newUser = { name: 'Gabriel', email, password: '1234' }
    const response = await request(app).post('/register').send(newUser)

    expect(response.status).toBe(204)
  })

  it('Should not register if user already exists', async function(){
    const newUser = { name: 'Gabriel', email: 'gabriel@email.com', password: '1234' }
    await UserService.create({ name: newUser.name, email: newUser.email, password_hash: newUser.password})
    const response = await request(app).post('/register').send(newUser)

    expect(response.status).toBe(200)
    expect(JSON.parse(response.text).msg).toBe('Usuário já cadastrado.')
  })

  it('Should encrypt password', async function(){
    const email = Math.floor(Math.random() * 10001).toString() + '@email.com';
    const userHash = { name: 'Gabriel', email, password: '1234' }
    const response = await request(app).post('/register').send(userHash)
    const user = await UserService.findByEmail(email)

    expect(response.status).toBe(204)
    expect(
      await bcrypt.compare(userHash.password, user.password_hash)
    ).toBe(true)
  })

  it('Should login user', async function(){
    const login = { email: 'login@email.com', password: '1234' }
    await AuthService.register('Gabriel', login.email, login.password)
    const response = await request(app).post('/login').send(login)

    expect(response.status).toBe(200)
  })

  it('Should not login user if user is not registered', async function(){
    const login = { email: 'naoregistrado@email.com', password: '1234' }
    const response = await request(app).post('/login').send(login)

    expect(response.status).toBe(400)
  })

  it('Should not login user if password is wrong', async function(){
    const login = { email: 'gabriel@email.com', password: '' }
    const response = await request(app).post('/login').send(login)
    const user = await UserService.findByEmail(login.email)

    expect(response.status).toBe(400)
  })
})