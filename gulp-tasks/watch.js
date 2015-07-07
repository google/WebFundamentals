'use strict';

var gulp = require('gulp');
require('gulp-watch');

gulp.task('dev-watch-tasks', function() {
  gulp.watch([GLOBAL.WF.src.styles + '/**/*.scss'], ['generate-dev-css']);
  gulp.watch([GLOBAL.WF.src.scripts + '/**/*.js'], ['cp-scripts']);
  gulp.watch([GLOBAL.WF.src.imgs + '/**/*'], ['cp-images']);
  gulp.watch([GLOBAL.WF.gae + '/**/*'], ['copy-appengine-config']);
  gulp.watch([GLOBAL.WF.src.jekyll + '/**/*', GLOBAL.WF.src.content + '/**/*'],
    ['compile-jekyll:localhost']);
});
