'use strict'

let path = require('path')

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts'}
    ]
  },
  resolve: {
    extensions: ['', '.ts']
  }
}
