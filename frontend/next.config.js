const Dotenv = require('dotenv-webpack')
const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {} // tslint:disable-line:no-empty
}

module.exports = withCSS(
  withTypescript({
    webpack(config, options) {
      config.plugins.push(new Dotenv({ path: '../.env', systemvars: true }))
      return config
    },
  }),
)
