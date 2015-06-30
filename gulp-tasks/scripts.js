'use strict';

var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();

// This task moves content into the jekyll directory
gulp.task('cp-third-party-style-scripts', ['scripts:clean'], function() {
  return gulp.src([GLOBAL.WF.src.styles + '/third_party/**/*.js'])
    .pipe(plugins.copy(GLOBAL.WF.build.scripts, {prefix: 3}));
});

gulp.task('scripts:clean', del.bind(null,
  [GLOBAL.WF.build.scripts], {dot: true}));
