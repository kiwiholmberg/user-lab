const mod = require('../../lib/users')
const httpErrors = require('http-errors')

test('it validates user input', async () => {
  const user = {
    firstName: 'Steve'
  }
  const req = {
    body: user
  }

  const res = () => ({})

  expect.assertions(1)
  await expect(mod.create(req, res))
    .rejects.toThrow('BadRequestError: Invalid input')
})

