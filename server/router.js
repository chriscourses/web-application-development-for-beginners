const express = require('express')
const { check } = require('express-validator')
const UserController = require('./controllers/User.js')
const router = express.Router()

router.put('/api/users/:id/resetPassword', UserController.resetPassword)

router.get(
  '/api/users/tokens/:token',
  UserController.getUserByResetPasswordToken
)

router.post(
  '/api/users',
  [
    check('email')
      .isEmail()
      .normalizeEmail(),
    check('password').isLength({ min: 6 })
  ],
  UserController.create
)

router.post(
  '/api/users/login',
  [
    check('email')
      .isEmail()
      .normalizeEmail(),
    check('password').isLength({ min: 6 })
  ],
  UserController.login
)

router.post(
  '/api/users/sendResetPasswordRequest',
  UserController.sendResetPasswordRequest
)

router.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.end()
  })
})

module.exports = router
