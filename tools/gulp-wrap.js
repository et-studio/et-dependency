'use strict'

let path = require('path')
let through = require('through2')
let gutil = require('gulp-util')

module.exports = function (moduleId) {
  if (!moduleId) moduleId = 'et-dependency'

  return through.obj(function (file, ence, next) {
    if (!file.isBuffer()) return next()

    let extname = path.extname(file.path)
    let basename = path.basename(file.path, extname)
    let contents = file.contents.toString()

    this.push(new gutil.File({
      path: basename + '.ng' + extname,
      contents: new Buffer(ng(contents, moduleId))
    }))

    this.push(new gutil.File({
      path: basename + '.cmd' + extname,
      contents: new Buffer(cmd(contents, moduleId))
    }))

    this.push(new gutil.File({
      path: basename + '.amd' + extname,
      contents: new Buffer(amd(contents, moduleId))
    }))

    this.push(new gutil.File({
      path: basename + '.global' + extname,
      contents: new Buffer(global(contents, moduleId))
    }))

    next()
  })
}

function ng (contents, moduleId) {
  return `;angular.module('et.template', []).factory('${moduleId}', [function() {
    var exports = {};
    var module = {};

    ${contents}

    return module.exports || exports['default'] || exports;
  }]);`
}

function cmd (contents) {
  return `;define(function (require, module, exports) {
    ${contents}
  });`
}

function amd (contents, moduleId) {
  return `;define('${moduleId}', [], function() {
    var exports = {};
    var module = {};

    ${contents}

    return module.exports || exports['default'] || exports;
  });`
}

function global (contents, moduleId) {
  return `;(function(global){
    var exports = {};
    var module = {};

    ${contents}

    global['${moduleId}'] = module.exports || exports['default'] || exports;
  })(window);`
}
