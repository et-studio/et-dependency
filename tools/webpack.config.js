'use strict'

let path = require('path')

module.exports = {
  entry: {
    dep: path.resolve(__dirname, '../src/dep')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
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
