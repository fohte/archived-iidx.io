const merge = require('webpack-merge')
const path = require('path')

module.exports = (baseConfig, env, config) =>
  merge(config, {
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          },
        },
        {
          test: /\.stories\.tsx?$/,
          loaders: [
            {
              loader: require.resolve('@storybook/addon-storysource/loader'),
              options: { parser: 'typescript' },
            },
          ],
          enforce: 'pre',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
      alias: { '@app': path.join(__dirname, '..', 'src') },
    },
  })
