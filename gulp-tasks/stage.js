'use strict';

var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var path = require('path');
var chalk = require('chalk');
var glob = require('globule');
var jsYaml = require('js-yaml');
var gutil = require('gulp-util');
var rename = require('gulp-rename')
var runSequence = require('run-sequence');
var spawn = require('child_process').spawn;

var SRC_BASE = './src/content/';
var JSYAML_OPTS = {lineWidth: 1024};
var GLOB_PATTERN = ['**/_index.yaml', '**/*.md'];
var GLOB_EXCLUDES = [
  '!**/_common-links.md',
  '!**/_generated.md',
  '!**/_template.md'
];

/**
 * Executes a shell command, outputs the stdout to the command line and
 * returns true if it completed successfully.
 *
 * @param {string} cmd The command to run
 * @param {Array} args The arguments to use when running the command
 * @param {string} cwd The working directory to run the command in
 * @return {Promise} The promise that will be resolved on completion
 */
function promisedSpawn(cmd, args, cwd) {
  return new Promise(function(resolve, reject) {
    gutil.log(' ', chalk.cyan('$'), chalk.cyan(cmd, args));
    var execOptions = {cwd: cwd, stdio: ['ignore', 'inherit', 'pipe']};
    var hadError = false;
    var proc = spawn(cmd, args, execOptions);
    proc.stderr.on('data', function(data) {
      hadError = true;
      gutil.log(' ', chalk.cyan(cmd, args), chalk.red('Failed!'));
      gutil.log('\n' + data);
      reject(data);
    });
    proc.on('close', function(data) {
      if (hadError === false) {
        resolve(true);
      }
    });
  });
}

gulp.task('stage:build-static', function(cb) {
  var opts = {srcBase: SRC_BASE};
  var dirs = glob.find(GLOB_PATTERN, GLOB_EXCLUDES, opts);
  gutil.log('Files:', chalk.cyan(dirs.length));
  fs.writeFileSync('_build-me.yaml', jsYaml.safeDump(dirs, JSYAML_OPTS));
  var cmd = 'python build-static.py';
  return promisedSpawn('python', ['build-static.py'], '.')
    .then(function(success) {
      gutil.log(' ', 'Completed, expected', chalk.cyan(dirs.length), 'files');
      if (success === true) {
        return del('./_build-me.yaml');  
      }
    });
});

gulp.task('stage:copy-assets', function(cb) {
  var basePath = GLOBAL.WF.src.content + '../**/';
  var toCopy = [
    basePath + '*.{png,gif,jpg,svg}',
    basePath + '*.{mp4,webm,mov,mp3}',
    basePath + '*.{xml,pdf,ico,css,js,woff,eot,ttf}',
    basePath + 'manifest.json'
  ];
  return gulp.src(toCopy)
    .pipe(gulp.dest('./build'));
});

gulp.task('stage:copy-robots', function(cb) {
  return gulp.src('./gae/robots.txt')
    .pipe(gulp.dest('./build/en/'));
});

gulp.task('stage:copy-404', function(cb) {
  return gulp.src('./gae/404.tpl')
    .pipe(rename('404.html'))
    .pipe(gulp.dest('./build/en/'));
});

gulp.task('stage:copy-scripts', function(cb) {
  return gulp.src('./gae/scripts/*')
    .pipe(gulp.dest('./build/en/wf-local/scripts/'));
});

gulp.task('stage:copy-styles', function(cb) {
  return gulp.src('./gae/styles/*')
    .pipe(gulp.dest('./build/en/wf-local/styles/'));
});

gulp.task('stage', function(callback) {
  runSequence(
    'clean',
    'build',
    [ 
      'stage:build-static',
      'stage:copy-assets',
      'stage:copy-robots',
      'stage:copy-404',
      'stage:copy-scripts',
      'stage:copy-styles',
    ],
    callback
  );
});
