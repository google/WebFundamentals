'use strict';

var gulp = require('gulp');
var del = require('del');
var spawn = require('child_process').spawn;
var runSequence = require('run-sequence');
var plugins = require('gulp-load-plugins')();

// This task moves content into the jekyll directory
gulp.task('cp-content-to-jekyll-dir', function() {
  return gulp.src([GLOBAL.WF.src.content + '/**/*'])
    .pipe(plugins.copy(GLOBAL.WF.src.jekyll + '/_content', {prefix: 2}));
});

gulp.task('rm-jekyll-build-directory', function() {
  return del([GLOBAL.WF.build.jekyll], {dot: true});
});

// Setting spawn-jekyll-command here means a dependency is made
// spawn-jekyll-command must finish before this is executed
gulp.task('rm-content-from-jekyll-dir', function() {
  return del([GLOBAL.WF.jekyll.tmpContentDir], {dot: true});
});

/**
 * This is a gotcha with this command!
 *
 * Because we are using RVM to define and lock
 * versions of GEMs we are using, we can use
 * 'bundle exec' to execute commands againsts
 * these gems. The reason we do it is to ensure
 * travis uses it's local gems in vendor/bundle.
 */
gulp.task('spawn-jekyll-command', ['rm-jekyll-build-directory'], function(cb) {
  // Handle OS differences in executable name
  var jekyllCommand = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
  var params = ['exec', jekyllCommand, 'build'];
  params.push('--config');
  params.push(
    GLOBAL.WF.src.jekyllConfigs + '/common.yml,' +
    GLOBAL.WF.src.jekyllConfigs + '/appengine.yml');
  params.push('--trace');

  var jekyllProcess = spawn('bundle', params, {env: process.env, stdio: 'inherit'});
  jekyllProcess.on('close', cb);
});

// jekyll:target [--lang <lang_code,lang_code,...|all>]
// where 'target' is config/target.yml file.
// defaults to '--lang all'.
// 'all' builds for all languages specified in config.yml/langs_available + 'en'.
// builds w/o multilang support if config.yml is missing langs_available.
gulp.task('compile-jekyll', function(cb) {
  runSequence(
    'spawn-jekyll-command',
    'rm-content-from-jekyll-dir',
    cb
  );
});
