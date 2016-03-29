'use strict'

let path = require('path')
let webpack = require('webpack')
let WebpackDevServer = require('webpack-dev-server')
let config = require('../../tools/webpack.config.js')

config.entry = {index: path.resolve(__dirname, './index.js')}
config.output.libraryTarget = 'var'
config.devtool = 'source-map'

let compiler = webpack(config)
let server = new WebpackDevServer(compiler, {
  contentBase: 'test/server',
  stats: {colors: true}
})
server.listen(8080)
