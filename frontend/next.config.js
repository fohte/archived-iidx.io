const merge = require('webpack-merge')
const path = require('path')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withTypescript = require('@zeit/next-typescript')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {} // tslint:disable-line:no-empty
}

module.exports = withCSS(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      camelCase: true,
      localIdentName: '[local]___[hash:base64:5]',
    },
    sassLoaderOptions: {
      includePaths: [path.join(__dirname, 'src')],
    },
    ...withTypescript({
      webpack(config, options) {
        return merge(config, {
          resolve: { alias: { '@app': path.join(__dirname, 'src') } },
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
        })
      },
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
