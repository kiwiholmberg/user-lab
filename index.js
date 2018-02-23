const express = require('express')
const bodyParser = require('body-parser')
const debug = require('debug')('app')

require('express-async-errors')

const users = require('./lib/users')

const app = express()
app.use(bodyParser.json())

app.get('/users', users.list)
app.post('/users', users.create)
app.patch('/users/:id', users.update)

app.use(function (err, req, res, next) {
  // Error handler
  debug(err)
  if (err.statusCode) {
    // Proper http-error
    return res.status(err.statusCode)
      .json(Object.assign({}, {
        message: err.message
      }, err.errors ? { errors: err.errors } : {}))
  }
  return res.status(500)
    .json({ message: 'Unhandled error' })
})

app.listen(3000)
