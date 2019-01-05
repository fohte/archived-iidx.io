const next = require('next')
const routes = require('./src/routes')

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: './src',
})
const handler = routes.getRequestHandler(app)

const { createServer } = require('http')
app.prepare().then(() => {
  createServer(handler).listen(3000)
})
