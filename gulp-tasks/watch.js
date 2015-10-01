'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
require('gulp-watch');

gulp.task('dev-watch-tasks', function() {
  gulp.watch([GLOBAL.WF.src.styles + '/**/*.scss',
    GLOBAL.WF.src.thirdParty + '/**/*.scss'], ['generate-dev-css']);
  gulp.watch([GLOBAL.WF.src.scripts + '/**/*.js'], ['cp-scripts']);
  gulp.watch([GLOBAL.WF.src.imgs + '/**/*'], ['cp-images']);
  gulp.watch([GLOBAL.WF.gae + '/**/*'], ['copy-appengine-config']);
  gulp.watch([
    GLOBAL.WF.src.jekyll + '/**/*',
    GLOBAL.WF.src.content + '/**/*'],
    ['compile-jekyll:localhost']);
});

gulp.task('prod-watch-tasks', function() {
  gulp.watch([GLOBAL.WF.src.styles + '/**/*.scss',
    GLOBAL.WF.src.thirdParty + '/**/*.scss'], ['generate-dev-css']);
  gulp.watch([GLOBAL.WF.src.scripts + '/**/*.js'], ['cp-scripts']);
  gulp.watch([GLOBAL.WF.src.imgs + '/**/*'], ['cp-images']);
  gulp.watch([GLOBAL.WF.gae + '/**/*'], ['copy-appengine-config']);
  gulp.watch([
    GLOBAL.WF.src.jekyll + '/**/*',
    GLOBAL.WF.src.content + '/**/*']).on('change', function() {
      runSequence('compile-jekyll:localhost', 'html');
    });
});
