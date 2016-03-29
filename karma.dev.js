'use strict'

const configFn = require('./karma.conf.js')

module.exports = function (config) {
  configFn(config)
  config.set({
    browsers: ['PhantomJS', 'Chrome'],
    singleRun: false
  })
}
