
const wrapper = require('./wrapper')

const createPreprocessor = function (logger) {
  const log = logger.create('preprocessor.wrapper')

  return function (content, file, done) {
    log.debug('Processing "%s".', file.originalPath)
    var result = wrapper.global(content, 'et-dependency')
    return done(null, result)
  }
}

createPreprocessor.$inject = ['logger']

module.exports = {
  'preprocessor:wrapper': ['factory', createPreprocessor]
}
