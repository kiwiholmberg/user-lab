const validator = require('is-my-json-valid')
const createError = require('http-errors')
const uuidv4 = require('uuid/v4')

const fileDb = require('../adapters/fileDb')

const {
  user: userSchema,
  userPatchSchema
} = require('../schema/user')

async function list (req, res) {
  const users = fileDb.get('users').value()
  return res.json(users)
}

async function update (req, res) {
  const user = fileDb
    .get('users')
    .find({ id: req.params.id })
    .value()
  if (!user) throw createError(404, 'User not found')

  const userValidator = validator(userPatchSchema)
  const validate = userValidator(req.body)

  if (!validate) {
    throw createError(400, 'Invalid input', { errors: userValidator.errors })
  }

  const updatedUser = fileDb
    .get('users')
    .find({ id: req.params.id })
    .assign(req.body)
    .write()

  return res.json(updatedUser)
}

async function create (req, res) {
  const userValidator = validator(userSchema)
  const validate = userValidator(req.body)

  if (!validate) {
    throw createError(400, 'Invalid input', { errors: userValidator.errors })
  }

  const userData = Object.assign({}, { id: uuidv4() }, req.body)
  const user = fileDb
    .get('users')
    .push(userData)
    .write()

  return res.json(user)
}

module.exports = {
  list,
  update,
  create
}
