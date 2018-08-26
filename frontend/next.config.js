const Dotenv = require('dotenv-webpack')
const merge = require('webpack-merge')
const path = require('path')
const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {} // tslint:disable-line:no-empty
}

module.exports = withCSS(
  withTypescript({
    webpack(config, options) {
      return merge(config, {
        module: {
          rules: [
            {
              exclude: /node_modules/,
              loader: 'graphql-tag/loader',
              test: /\.(graphql|gql)$/,
            },
          ],
        },
        plugins: [new Dotenv({ path: '../.env', systemvars: true })],
        resolve: { alias: { '@app': path.join(__dirname) } },
      })
    },
  }),
)
