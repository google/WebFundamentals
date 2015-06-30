'use strict';

// TODO: Matt Gaunt - test and hook up to production

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Scan your HTML for assets & optimize them
gulp.task('html', function() {
  return gulp.src('jekyll/**/*.html')
    // Minify any HTML
    .pipe('*.html', plugins.minifyHtml())
    // Output files
    .pipe(gulp.dest('dist'));
});
