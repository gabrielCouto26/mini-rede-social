const axios = require('axios')

// jest
test('Should get users', async function(){
  const { data } = await axios.get('http://localhost:4000/users')

  expect(data).toHaveLength(0)
})