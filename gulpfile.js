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
  try {
    runSequence(
      'clean',
      [
        'generate-dev-css',
        'cp-images',
        'cp-fonts',
        'cp-scripts',
      ],
      'compile-jekyll:localhost',
      'start-gae-dev-server',
      'dev-watch-tasks',
      function() {
        console.log('<----------------HERE 2 ZOMG ONE');
        cb();
      });
  } catch (exception) {
    console.log('<----------------HERE ZOMG ONE');
  }
});

gulp.task('build:staging', function(cb) {
  runSequence(
    [
      'generate-prod-css',
      'cp-images',
      'cp-fonts',
      'cp-scripts',
      'copy-appengine-config'
    ],
    'compile-jekyll:staging',
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
    'compile-jekyll:devsite',
    cb);
});

/**
 * By default we'll kick of the development
 * build of WF
 **/
gulp.task('default', ['develop']);
