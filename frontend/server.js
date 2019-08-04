const path = require('path')

const express = require('express')
const next = require('next')

const routes = require('./src/routes')

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: './src',
})
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  server.use('/static', express.static(path.join(__dirname, 'static')))

  server.use(handler).listen(3000)
})
