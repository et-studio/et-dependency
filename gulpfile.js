'use strict'

let gulp = require('gulp')
let path = require('path')
let through = require('through2')
let gutil = require('gulp-util')

gulp.task('default', function () {
  return gulp.src(['dist/index.js'])
    .pipe(wrap())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
  return gulp.watch(['dist/index.js'], function () {
    gulp.start('default')
  })
})

function wrap (moduleId) {
  if (!moduleId) moduleId = 'et-dependency'

  return through.obj(function (file, ence, next) {
    if (!file.isBuffer()) return next()

    let extname = path.extname(file.path)
    let contents = file.contents.toString()

    this.push(new gutil.File({
      path: 'ng' + extname,
      contents: new Buffer(ng(contents, moduleId))
    }))

    this.push(new gutil.File({
      path: 'cmd' + extname,
      contents: new Buffer(cmd(contents, moduleId))
    }))

    this.push(new gutil.File({
      path: 'amd' + extname,
      contents: new Buffer(amd(contents, moduleId))
    }))

    this.push(new gutil.File({
      path: 'global' + extname,
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

    return module.exports || exports;
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

    return module.exports || exports;
  });`
}

function global (contents, moduleId) {
  return `;(function(global){
    var exports = {};
    var module = {};

    ${contents}

    global['${moduleId}'] = module.exports || exports;
  })(window || this);`
}
