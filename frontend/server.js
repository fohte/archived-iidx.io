const path = require('path')
const next = require('next')
const routes = require('./src/routes')

const app = next({
  dev: process.env.NODE_ENV !== 'production',
})
const handler = routes.getRequestHandler(app)

const express = require('express')

app.prepare().then(() => {
  const server = express()

  server.use('/static', express.static(path.join(__dirname, 'static')))

  server.use(handler).listen(3000)
})
