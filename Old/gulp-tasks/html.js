'use strict';

// TODO: Matt Gaunt - test and hook up to production

var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');
var using = require('gulp-using');

// Scan your HTML for assets & optimize them
gulp.task('html', function() {
  return gulp.src([
    GLOBAL.WF.build.root + '/**/*.html',
    '!' + GLOBAL.WF.build.jekyll + '/*/resources/samples/**/*.html',
  ])
    // Minify any HTML
    .pipe(minifyHTML({
      quotes: true
    }))
    // Output files
    .pipe(gulp.dest(GLOBAL.WF.build.root + '/'));
});
