const axios = require('axios')
const baseUrl = 'http://localhost:4000'

const UserService = require('../services/users')

const request = function(method, endpoint, data) {
  return axios({url: `${baseUrl}/${endpoint}`, method, data})
}

test('Should get users', async function(){
  const { data } = await request('get', 'users')
  expect(data).toHaveLength(0)
})

test('Should create and delete user', async function(){
  const user = { name: 'Gabriel', date: new Date()}
  const { data } = await request('post', 'users', user)

  expect(data.name).toBe(user.name)

  await UserService.deleteUser(data.id)
})

test.only('Should update user', async function(){
  const user = await UserService.createUser({ name: 'Gabriel', date: new Date()})
  await request('put', `users/${user.id}`, { name: 'Alfredo' })

  const updated = await UserService.getUserById(user.id)
  expect(updated.name).toBe('Alfredo')

  await UserService.deleteUser(user.id)
})