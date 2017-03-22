/* global __dirname */

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/index.jsx',
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js'],
  },
}
