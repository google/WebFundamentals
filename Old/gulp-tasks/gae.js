'use strict';

var gulp = require('gulp');
var del = require('del');
var spawn = require('child_process').spawn;
var chalk = require('chalk');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

/**

The port number allows you to configure what port to launch the
development server on.

The silence output option simple hides all out from the dev_appserver.
Change this to false if you want to see logs form app engine.

**/

var PORT_NUMBER = 7331;
var SILENCE_OUTPUT = false;
var GAE_SPAWNED_TASK = null;

// These define the build locations
var WF = {
  appengine: 'appengine-config',
  build: 'build'
};

gulp.task('copy-appengine-config', ['gae:clean'], function() {
  return gulp.src([
      '!' + WF.appengine + '/scripts/*',
      WF.appengine + '/**/*'
    ])
    .pipe(plugins.copy(WF.build, {prefix: 1}));
});

gulp.task('spawn-gae-dev-command', function(cb) {
  // Handle OS differences in executable name
  var gaeCommand = 'dev_appserver.py';
  var params = [
    '--skip_sdk_update_check',
    '--port', PORT_NUMBER, WF.build
  ];

  var stdOutput = SILENCE_OUTPUT ? 'pipe' : process.stdout;
  var stioOpts = [0, 1, 'pipe'];

  var stderrOutput = '';
  GAE_SPAWNED_TASK = spawn(gaeCommand, params,
    {stdio: stioOpts});

  // Add stderr listener
  GAE_SPAWNED_TASK.stderr.setEncoding('utf8');
  GAE_SPAWNED_TASK.stderr.on('data', function(data) {
    stderrOutput += data;
  });

  // Check if App Engine closed cleanly or not.
  GAE_SPAWNED_TASK.on('close', function(code, signal) {
    if (stderrOutput.length > 0) {
      plugins.util.log(plugins.util.colors.red(stderrOutput));
      throw new Error('An error occured with App Engine, please look ' +
        'through the logs to find the problem.');
    }
  });

  cb();
});

gulp.task('pretty-print-gae-info', function() {
  console.log('');
  console.log('---------------------------------');
  console.log('');
  console.log(chalk.dim('    Server is on: ') +
    chalk.white('http://localhost:') + chalk.blue(PORT_NUMBER));
  console.log(chalk.dim('    BrowserSync is on: ') +
    chalk.white('http://localhost:') + chalk.blue(7332));
  console.log('');
  console.log('---------------------------------');
  console.log('');
});

// jekyll:target [--lang <lang_code,lang_code,...|all>]
// where 'target' is config/target.yml file.
// defaults to '--lang all'.
// 'all' builds for all languages specified in config.yml/langs_available + 'en'.
// builds w/o multilang support if config.yml is missing langs_available.
gulp.task('start-gae-dev-server', ['copy-appengine-config'], function(cb) {
  runSequence(
    'spawn-gae-dev-command',
    'pretty-print-gae-info',
    cb);
});

gulp.task('gae:clean', del.bind(null,
  [
    WF.build + '/*.yaml',
    WF.build + '/*.py',
    WF.build + '/*.pyc',
    WF.build + '/*.tpl',
    WF.build + '/robots.txt',
  ], {dot: true}));
