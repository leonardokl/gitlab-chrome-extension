/* global __dirname */

const path = require('path')

module.exports = {
  entry: './src/index.js',
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
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js'],
  },
}
