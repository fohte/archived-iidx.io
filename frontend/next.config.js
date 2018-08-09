const Dotenv = require('dotenv-webpack')
const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript({
  webpack(config, options) {
    config.plugins.push(new Dotenv({ path: '../.env' }))
    return config
  },
})
