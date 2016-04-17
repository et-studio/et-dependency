'use strict'

const gulp = require('gulp')
const path = require('path')
const through = require('through2')
const gutil = require('gulp-util')
const wrapper = require('./tools/wrapper')

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

    const extname = path.extname(file.path)
    const contents = file.contents.toString()

    this.push(new gutil.File({
      path: 'ng' + extname,
      contents: new Buffer(wrapper.ng(contents, moduleId))
    }))

    this.push(new gutil.File({
      path: 'cmd' + extname,
      contents: new Buffer(wrapper.cmd(contents, moduleId))
    }))

    this.push(new gutil.File({
      path: 'amd' + extname,
      contents: new Buffer(wrapper.amd(contents, moduleId))
    }))

    this.push(new gutil.File({
      path: 'global' + extname,
      contents: new Buffer(wrapper.global(contents, moduleId))
    }))

    next()
  })
}
