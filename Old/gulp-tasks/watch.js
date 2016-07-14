'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

require('gulp-watch');

gulp.task('dev-watch-tasks', function () {
  browserSync.init({
    port: 7332,
    proxy: 'localhost:7331',
    logLevel: 'silent',
    // Prevent browser sync from display in page notifications
    notify: false,
    open: false
  });

  gulp.watch([GLOBAL.WF.src.styles + '/**/*.scss',
    GLOBAL.WF.src.thirdParty + '/**/*.scss'], ['generate-dev-css', browserSync.reload]);

  gulp.watch([GLOBAL.WF.src.scripts + '/**/*.js'], ['cp-scripts', browserSync.reload]);

  gulp.watch([GLOBAL.WF.src.imgs + '/**/*'], ['cp-images', browserSync.reload]);

  gulp.watch([
    GLOBAL.WF.src.jekyll + '/**/*',
    GLOBAL.WF.src.content + '/**/*'],
    ['compile-jekyll:localhost', browserSync.reload]);

  gulp.watch([GLOBAL.WF.gae + '/**/*'], ['copy-appengine-config']);
});

gulp.task('prod-watch-tasks', function () {
  gulp.watch([GLOBAL.WF.src.styles + '/**/*.scss',
    GLOBAL.WF.src.thirdParty + '/**/*.scss'], ['generate-dev-css']);
  gulp.watch([GLOBAL.WF.src.scripts + '/**/*.js'], ['cp-scripts']);
  gulp.watch([GLOBAL.WF.src.imgs + '/**/*'], ['minify-images']);
  gulp.watch([GLOBAL.WF.gae + '/**/*'], ['copy-appengine-config']);
  gulp.watch([
    GLOBAL.WF.src.jekyll + '/**/*',
    GLOBAL.WF.src.content + '/**/*']).on('change', function () {
      runSequence('compile-jekyll:localhost', 'html', 'minify-images:content');
    });
});
