'use strict';

var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

// Browser support for autoprefix
var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// This function is used by generate-dev-css and generate-prod-css
function compileSassAutoprefix(genSourceMaps, minify) {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
      // TODO: This seems to speed up ever so slighty - maybe move imports
      // to a seperate repo to improve further by only including
      // a src of files we KNOW we want sass plugin to explore
      '!' + GLOBAL.WF.src.styles + '/**/_*.scss',
      GLOBAL.WF.src.styles + '/**/*.scss'
    ])
    .pipe(plugins.if(genSourceMaps, plugins.sourcemaps.init()))
    .pipe(plugins.sass({
      precision: 10
    })
    .on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(plugins.if(minify, plugins.csso()));
}

gulp.task('compile-dev-css', function() {
  return compileSassAutoprefix(true, false)
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(GLOBAL.WF.build.styles))
    .pipe(plugins.size({title: 'compile-dev-css'}));
});

gulp.task('compile-prod-css', function() {
  return compileSassAutoprefix(false, true)
    .pipe(gulp.dest(GLOBAL.WF.build.styles))
    .pipe(plugins.size({title: 'compile-prod-css'}));
});

// generate-dev-css simply pipes the compiled sass to the build directory
// and writes the sourcemaps
gulp.task('generate-dev-css', function(cb) {
  runSequence(
    'styles:clean',
    [
      'compile-dev-css',
    ],
    cb);
});

// generate-prod-css is the same as generate-dev-css
// except it minifies and optimises the CSS and
// skips generating the sourcemaps which account for
// a lot of weight
gulp.task('generate-prod-css', ['styles:clean'], function(cb) {
  runSequence(
    'styles:clean',
    [
      'compile-prod-css',
    ],
    cb);
});

gulp.task('styles:clean', del.bind(null,
  [GLOBAL.WF.build.styles], {dot: true}));
