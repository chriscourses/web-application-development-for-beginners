const express = require('express')
const { celebrate, Joi, errors, Segments } = require('celebrate')
const UserController = require('./controllers/User.js')
const router = express.Router()

router.put('/api/users/:id/resetPassword', UserController.resetPassword)

router.get(
  '/api/users/tokens/:token',
  UserController.getUserByResetPasswordToken
)

router.post(
  '/api/users',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(6)
    })
  }),
  UserController.create
)

router.post(
  '/api/users/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(6)
    })
  }),
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

router.use(errors())
module.exports = router
