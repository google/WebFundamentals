'use strict';

var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();

// This task moves content into the jekyll directory
gulp.task('cp-fonts', ['fonts:clean'], function() {
  return gulp.src([GLOBAL.WF.src.fonts + '/**/*'])
    .pipe(plugins.copy(GLOBAL.WF.build.fonts, {prefix: 3}));
});

gulp.task('fonts:clean', del.bind(null,
  [GLOBAL.WF.build.fonts], {dot: true}));
