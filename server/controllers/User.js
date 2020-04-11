const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const models = require('../models/index.js')

exports.create = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  // Database code will go below
  try {
    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(req.body.password, salt)
    let user = await models.User.create({
      email: req.body.email,
      password: hash
    })

    user = user.toJSON()
    user.isAuthenticated = true
    delete user.password

    req.session.user = user
    console.log(req.session.user)

    res.status(200).json(req.session.user)
  } catch (err) {
    console.log(err)
  }
}

exports.login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    // Login here
    let user = await models.User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!user) {
      res.status(401).end('email does not exist')
    }

    // user.password
    // bcrypt.compare()
    const isValid = await bcrypt.compare(req.body.password, user.password)

    if (isValid === false) {
      res.status(401).end('username or password invalid')
    }

    user = user.toJSON()
    user.isAuthenticated = true
    delete user.password

    req.session.user = user

    // continue code
    res.json(req.session.user)
  }
}

exports.resetPassword = async (req, res) => {
  res.end('success')
}
