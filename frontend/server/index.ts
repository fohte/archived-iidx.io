import express from 'express'
import next from 'next'
import path from 'path'

import routes from '@app/routes'

const app = next({
  dev: process.env.NODE_ENV !== 'production',
})
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  server.use('/static', express.static(path.join(__dirname, 'static')))

  server.use(handler).listen(3000)
})
