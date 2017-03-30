/* global __dirname */

const webpack = require('webpack')
const path = require('path')

const __PRODUCTION__ = process.env.NODE_ENV === 'production'

const defaultPlugins = [
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
]
const productionPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    output: {
      comments: false,
    },
  }),
  new webpack.DefinePlugin({
      "process.env": {
          NODE_ENV: JSON.stringify("production"),
      },
  }),
].concat(defaultPlugins)
const plugins = __PRODUCTION__
  ? productionPlugins
  : defaultPlugins

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.jsx'
  ],
  output: {
    path: __dirname,
    filename: 'public/js/bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
    ]
  },
  plugins,
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx'],
  },
}
