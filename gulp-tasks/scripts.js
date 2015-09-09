'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var plugins = require('gulp-load-plugins')();

var streamify = require('gulp-streamify');
var glob = require('glob');
var path = require('path');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('cp-scripts', function(cb) {
  runSequence(
    'scripts:clean',
    [
      'cp-third-party-style-scripts',
      'transpile-scripts'
    ],
    cb);
});

// This task moves content into the jekyll directory
gulp.task('cp-third-party-style-scripts', function() {
  return gulp.src([GLOBAL.WF.src.thirdParty + '/**/*.js'])
    .pipe(plugins.copy(GLOBAL.WF.build.scripts, {prefix: 3}));
});

gulp.task('transpile-scripts', function(cb) {
  handleES6Scripts(GLOBAL.WF.src.scripts, false);
  cb();
});

gulp.task('scripts:clean', del.bind(null,
  [GLOBAL.WF.build.scripts], {dot: true}));

function compileES6Classes(browserifyFileEntries, minimise) {
  browserifyFileEntries.forEach(function(fileEntry) {
    var browserifyBundle = browserify({
        entries: [fileEntry.srcPath]
      })
      .transform(babelify);

    var bundleStream = browserifyBundle.bundle()
      .on('log', plugins.util.log.bind(plugins.util, 'Browserify Log'))
      .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
      .pipe(source(fileEntry.outputFilename));

    var finalStream = bundleStream;
    if (minimise) {
      finalStream = bundleStream.pipe(streamify(plugins.uglify()));
    }

    return finalStream
      .pipe(gulp.dest(fileEntry.dest));
  });
}

function handleES6Scripts(srcPath, minimise) {
  var es6Filepaths = glob.sync(srcPath + '/**/*.es6.js');

  var browserifyFileEntries = [];
  es6Filepaths.forEach(function(filepath) {
    var filename = path.basename(filepath);
    var directoryOfFile = path.dirname(filepath);
    var relativeDirectory = path.relative(
      srcPath,
      directoryOfFile);

    browserifyFileEntries.push({
      srcPath: filepath,
      outputFilename: filename,
      dest: path.join(GLOBAL.WF.build.scripts, relativeDirectory)
    });
  });

  compileES6Classes(browserifyFileEntries, minimise);
}
