'use strict';

var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();

// TODO: MattGaunt Test and hook up to production
gulp.task('minify-images', function() {
  return gulp.src(GLOBAL.WF.src.imgs + '/**/*')
    .pipe(plugins.cache(plugins.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(GLOBAL.WF.build.imgs));
});

// This task moves content into the jekyll directory
gulp.task('cp-images', ['images:clean'], function() {
  return gulp.src([GLOBAL.WF.src.imgs + '/**/*'])
    .pipe(plugins.copy(GLOBAL.WF.build.imgs, {prefix: 3}));
});

gulp.task('images:clean', del.bind(null,
  [GLOBAL.WF.build.imgs], {dot: true}));
