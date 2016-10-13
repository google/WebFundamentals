'use strict';

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var chalk = require('chalk');
var glob = require('globule');
var jsYaml = require('js-yaml');
var gutil = require('gulp-util');
var exec = require('child_process').exec;

var SRC_BASE = './src/content/en/';

/**
 * Executes a shell command and returns the result in a promise
 *
 * @param {string} cmd The command to run
 * @param {string} cwd The working directory to run the command in
 * @return {Promise} The promise that will be resolved on completion
 */
function promisedExec(cmd, cwd) {
  return new Promise(function(resolve, reject) {
    gutil.log(' ', chalk.cyan('$'), chalk.cyan(cmd));
    var execOptions = {
      cwd: cwd,
      maxBuffer: 1024 * 1024
    };
    exec(cmd, execOptions, function(err, stdOut, stdErr) {
      if (err) {
        gutil.log(' ', cmd, chalk.red('Failed!'));
        console.log(stdErr);
        reject(stdErr);
        return;
      }
      if (GLOBAL.WF.options.verbose) {
        gutil.log('\n' + stdOut);
      }
      resolve(stdOut);
    });
  });
}

gulp.task('stage', function(cb) {
  var patterns = ['**/index.yaml', '**/*.md'];
  var opts = {srcBase: SRC_BASE};
  var dirs = glob.find(patterns, opts);
  fs.writeFileSync('_build-me.yaml', jsYaml.safeDump(dirs));
  var cmd = 'python build-static.py';
  return promisedExec(cmd, '.');
  // return Promise.all(dirs.map(function(file) {
  //   var url = path.join(SRC_BASE, file);
  //   url = url.replace('src/content/en/', '');
  //   url = url.replace('.md', '');
  //   var cmd = 'python test.py en ' + url + ' build';
  //   return promisedExec(cmd, '.');
  // }));
});
