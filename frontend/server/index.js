const express = require('express')
const next = require('next')
const path = require('path')
const pathToRegexp = require('path-to-regexp')

const routes = require('./routes')

const app = next({
  dev: process.env.NODE_ENV !== 'production',
})

app.prepare().then(() => {
  const server = express()

  server.use('/static', express.static(path.join(__dirname, 'static')))

  Object.keys(routes).forEach(routeName => {
    const route = routes[routeName]

    server.get(route, (req, res) => {
      const keys = []
      const values = pathToRegexp(route, keys)
        .exec(req.path)
        .slice(1)
      const keyNames = keys.map(k => k.name)

      const params = values.reduce((acc, value, i) => {
        return { ...acc, [keyNames[i]]: value }
      }, {})

      return app.render(req, res, `/${routeName}`, params)
    })
  })

  server.listen(3000)
})
