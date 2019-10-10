const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const models = require('./models/index.js')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.post(
    '/api/users',
    [
      check('email')
        .isEmail()
        .normalizeEmail(),
      check('password').isLength({ min: 6 })
    ],
    (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(422).json({ errors: errors.array() })
      }
      console.log(req.body)
      // Database code will go below
      models.User.create({ email: req.body.email, password: req.body.password })
    }
  )

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
