'use strict';

var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();

var sourcePath = 'src/content/en/showcase';
var destPath = 'build/langs/en';

// This task moves content into the jekyll directory
gulp.task('cp-showcase', function() {
  return gulp.src([sourcePath + '/**/*'])
    .pipe(plugins.copy(destPath, {prefix: 3}));
});

gulp.task('showcase:clean', del.bind(null,
  [destPath], {dot: true}));
