'use strict';

var del = require('del');

GLOBAL.WF = {
  gae: 'appengine-config',
  src: {
    content: 'src/content',
    jekyll: 'src/jekyll',
    jekyllConfigs: 'src/jekyll/_config',
    imgs: 'src/static/imgs',
    styles: 'src/static/styles',
    fonts: 'src/static/fonts',
    scripts: 'src/static/scripts',
  },
  jekyll: {
    tmpContentDir: 'src/jekyll/content'
  },
  build: {
    root: 'build',
    jekyll: 'build/jekyll',
    imgs: 'build/imgs',
    styles: 'build/styles',
    fonts: 'build/fonts',
    scripts: 'build/scripts'
  }
};

var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');

requireDir('./gulp-tasks');

gulp.task('clean', del.bind(null,
  [
    GLOBAL.WF.build.root
  ], {dot: true}));

gulp.task('develop', function(cb) {
  runSequence(
    'clean',
    [
      'generate-dev-css',
      'cp-images',
      'cp-fonts',
      'cp-scripts',
    ],
    'compile-jekyll',
    'start-gae-dev-server',
    'dev-watch-tasks',
    cb);
});

gulp.task('build', function(cb) {
  runSequence(
    [
      'generate-prod-css',
      'cp-images',
      'cp-fonts',
      'cp-scripts',
      'copy-appengine-config'
    ],
    'compile-jekyll',
    cb);
});

/**
 * By default we'll kick of the development
 * build of WF
 **/
gulp.task('default', ['develop']);
