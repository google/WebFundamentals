'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var plugins = require('gulp-load-plugins')();

gulp.task('cp-scripts', function(cb) {
  runSequence(
    'scripts:clean',
    [
      'cp-third-party-style-scripts',
      'cp-project-scripts',
    ],
    cb);
});

// This task moves content into the jekyll directory
gulp.task('cp-third-party-style-scripts', function() {
  return gulp.src([GLOBAL.WF.src.styles + '/third_party/**/*.js'])
    .pipe(plugins.copy(GLOBAL.WF.build.scripts, {prefix: 3}));
});

gulp.task('cp-project-scripts', function() {
  return gulp.src([GLOBAL.WF.src.scripts + '/**/*.js'])
    .pipe(plugins.copy(GLOBAL.WF.build.scripts, {prefix: 3}));
});

gulp.task('scripts:clean', del.bind(null,
  [GLOBAL.WF.build.scripts], {dot: true}));
