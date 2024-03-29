const path = require('path')

const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {} // tslint:disable-line:no-empty
}

const rootDir = __dirname
const srcDir = path.join(__dirname, 'src')
const nodeModulesDir = path.join(__dirname, 'node_modules')
const staticDistDir = path.join(__dirname, 'static', 'dist')

module.exports = {
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

  webpack(config, { dev, isServer }) {
    const sassLoaderConfig = ({ cssModules }) =>
      cssLoaderConfig(config, {
        extensions: ['scss', 'sass'],
        cssModules,
        cssLoaderOptions: {
          camelCase: true,
          localIdentName: cssModules
            ? '[path][name]__[local]--[hash:base64:5]'
            : '[hash:base64]',
        },
        dev,
        isServer,
        loaders: [
          {
            loader: 'sass-loader',
            options: {
              includePaths: [srcDir],
            },
          },
        ],
      })

    return merge(config, {
      resolve: {
        alias: {
          '@app': srcDir,
          '@server': path.join(rootDir, 'server'),
          '@pages': path.join(rootDir, 'pages'),
        },
      },
      module: {
        rules: [
          {
            test: /\.s(a|c)ss$/,
            exclude: [path.join(srcDir, 'rawStyles')],
            use: sassLoaderConfig({ cssModules: true }),
          },
          {
            test: /\.s(a|c)ss$/,
            include: [path.join(srcDir, 'rawStyles')],
            use: sassLoaderConfig({ cssModules: false }),
          },
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
          {
            from: path.join(nodeModulesDir, 'nprogress/nprogress.css'),
            to: path.join(staticDistDir, 'nprogress.css'),
          },
          {
            from: path.join(
              nodeModulesDir,
              'react-toastify/dist/ReactToastify.min.css',
            ),
            to: path.join(staticDistDir, 'ReactToastify.min.css'),
          },
          {
            from: path.join(nodeModulesDir, 'react-day-picker/lib/style.css'),
            to: path.join(staticDistDir, 'react-day-picker.css'),
          },
        ]),
      ],
    })
  },
}
