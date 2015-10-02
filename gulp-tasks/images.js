'use strict';

var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence').use(gulp);

gulp.task('minify-images:content', function() {
  return gulp.src(GLOBAL.WF.build.jekyll + '/**/*.{png,jpeg,jpg,svg}')
    .pipe(plugins.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(GLOBAL.WF.build.jekyll));
});

gulp.task('minify-images:static', function() {
  return gulp.src(GLOBAL.WF.src.imgs + '/**/*')
    .pipe(plugins.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(GLOBAL.WF.build.imgs));
});

gulp.task('minify-images:jekyll', function() {
  return gulp.src(GLOBAL.WF.src.imgs + '/**/*.svg')
    .pipe(gulp.dest(GLOBAL.WF.src.jekyll + '/_includes/svgs/'));
});

gulp.task('minify-images', ['images:clean'], function(cb) {
  runSequence([
    'minify-images:static',
    'minify-images:jekyll'
  ], cb);
});

gulp.task('images:clean', del.bind(null,
  [
    GLOBAL.WF.build.imgs,
    GLOBAL.WF.src.jekyll + '/_includes/svgs'
  ], {dot: true}));

gulp.task('cp-images:static', function() {
  return gulp.src([GLOBAL.WF.src.imgs + '/**/*'])
  .pipe(plugins.copy(GLOBAL.WF.build.imgs, {prefix: 3}));
});

gulp.task('cp-images:jekyll', function() {
  return gulp.src([GLOBAL.WF.src.imgs + '/**/*.svg'])
    .pipe(plugins.copy(GLOBAL.WF.src.jekyll + '/_includes/svgs/', {prefix: 3}));
});

// This task moves content into the jekyll directory
gulp.task('cp-images', ['images:clean'], function(cb) {
  runSequence(
    [
      'cp-images:jekyll',
      'cp-images:static'
    ], cb);
});
