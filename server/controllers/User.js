const crypto = require('crypto')
const moment = require('moment')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const mailgun = require('mailgun-js')

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})
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
  try {
    const user = await models.User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!user) {
      return res.status(404).end('no user with this email exists')
    }

    const token = crypto.randomBytes(16).toString('hex')

    await user.update({
      resetPasswordToken: token,
      resetPasswordTokenExpiration: moment()
        .add(30, 'minute')
        .format()
    })

    const data = {
      from:
        'Mailgun Sandbox <postmaster@sandboxa1ddcd634bef4f0e8dca5c07677e5072.mailgun.org>',
      to: req.body.email,
      subject: 'Password Reset Request',
      text: `http://${req.headers.host}/reset-password/${token}`
    }
    const body = await mg.messages().send(data)
    console.log(body)

    res.json(token)
  } catch (err) {
    throw new Error(err)
  }
}

exports.getUserByResetPasswordToken = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        resetPasswordToken: req.params.token
      }
    })

    if (!user) {
      return res.status(500).end('no user found')
    }

    res.json(user)
  } catch (err) {
    throw new Error(err)
  }
}
