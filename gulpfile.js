'use strict'

let gulp = require('gulp')
let wrap = require('./tools/gulp-wrap')

gulp.task('default', function () {
  return gulp.src(['dist/dep.js'])
    .pipe(wrap())
    .pipe(gulp.dest('dist'))
})
