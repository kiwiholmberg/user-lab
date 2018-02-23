const usersMod = require('../users')

describe('create user', async () => {
  let req, res

  beforeEach(() => {
    req = {
      body: {
        firstName: 'John',
        lastName: 'Doe'
      }
    }

    res = {
      json: jest.fn()
    }
  })

  test('it returns the created user', async () => {
    expect.assertions(2)

    await usersMod.create(req, res)

    expect(res.json.mock.calls.length).toBe(1)
    expect(res.json.mock.calls[0][0])
      .toMatchObject({
        firstName: 'John',
        lastName: 'Doe'
      })
  })
})
