const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {} // tslint:disable-line:no-empty
}

const srcDir = path.join(__dirname, 'src')
const nodeModulesDir = path.join(__dirname, 'node_modules')
const staticDistDir = path.join(__dirname, 'static', 'dist')

const webpack = (config, options) =>
  merge(config, {
    resolve: { alias: { '@app': srcDir } },
    module: {
      rules: [
        {
          test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              publicPath: './',
              outputPath: 'static/',
              name: '[name].[ext]',
            },
          },
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        {
          from: path.join(
            nodeModulesDir,
            '@fortawesome/fontawesome-svg-core/styles.css',
          ),
          to: path.join(staticDistDir, 'fontawesome.css'),
        },
        {
          from: path.join(nodeModulesDir, 'ress/dist/ress.min.css'),
          to: path.join(staticDistDir, 'ress.min.css'),
        },
      ]),
    ],
  })

module.exports = withCSS(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      camelCase: true,
      localIdentName: '[local]___[hash:base64:5]',
    },
    sassLoaderOptions: {
      includePaths: [srcDir],
    },
    ...withTypescript({
      webpack,
      generateBuildId: () => process.env.IIDXIO_VERSION,
      serverRuntimeConfig: {
        privateApiUrl: process.env.PRIVATE_API_URL,
      },
      publicRuntimeConfig: {
        firebaseApiKey: process.env.FIREBASE_API_KEY,
        firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
        publicApiUrl: process.env.PUBLIC_API_URL,
        version: process.env.IIDXIO_VERSION,
      },
    }),
  }),
)
