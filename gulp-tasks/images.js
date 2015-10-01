'use strict';

var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();

gulp.task('minify-images', ['minify-images:jekyll'], function() {
  return gulp.src(GLOBAL.WF.src.imgs + '/**/*')
    .pipe(plugins.cache(plugins.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(GLOBAL.WF.build.imgs));
});

gulp.task('minify-images:jekyll', function() {
  return gulp.src(GLOBAL.WF.src.jekyll + '/_includes/svgs/**/*')
    .pipe(plugins.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{cleanupIDs: false}],
    }))
    .pipe(gulp.dest(GLOBAL.WF.src.jekyll + '/_includes/svgs-minified/'));
});

// This task moves content into the jekyll directory
gulp.task('cp-images', ['images:clean'], function() {
  return gulp.src([GLOBAL.WF.src.imgs + '/**/*'])
    .pipe(plugins.copy(GLOBAL.WF.build.imgs, {prefix: 3}));
});

gulp.task('images:clean', del.bind(null,
  [GLOBAL.WF.build.imgs], {dot: true}));
