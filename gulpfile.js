'use strict';

var del = require('del');
var gulp = require('gulp');
var chalk = require('chalk');
var gutil = require('gulp-util');
var minimist = require('minimist');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

requireDir('./gulp-tasks');

GLOBAL.WF = {
  gae: 'appengine-config',
  src: {
    content: 'src/content/en/',
    data: 'src/data/',
    templates: 'src/templates/',
  },
  maxArticlesInFeed: 3,
  langs: ['en', 'ar', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pl', 'pt-br', 'ru', 'tr', 'zh-cn', 'zh-tw'],
};
var defaultOptions = {
  string: ['lang', 'skipReviewRequired', 'testWarnOnly', 'cl', 'verbose'],
  default: {
    lang: null,
    skipReviewRequired: false,
    testWarnOnly: false,
    cl: null,
    verbose: false
  }
}
GLOBAL.WF.options = minimist(process.argv.slice(2), defaultOptions);

gutil.log('---------------------------------');
gutil.log(gutil.colors.dim('Web') + gutil.colors.bold('Fundamentals'), 'Build Script');
gutil.log('---------------------------------');
if (GLOBAL.WF.options.lang) {
  gutil.log('Language: ', gutil.colors.cyan(GLOBAL.WF.options.lang));
}
if (GLOBAL.WF.options.cl) {
  gutil.log('Change list: ', gutil.colors.cyan(GLOBAL.WF.options.cl));
}
if (GLOBAL.WF.options.verbose !== false) {
  GLOBAL.WF.options.verbose = true;
}
gutil.log('Verbose: ', gutil.colors.cyan(GLOBAL.WF.options.verbose));
if (GLOBAL.WF.options.skipReviewRequired !== false) {
  gutil.log('skipReviewRequired: ', gutil.colors.cyan('true'));
  GLOBAL.WF.options.skipReviewRequired = true;
}
if (GLOBAL.WF.options.testWarnOnly !== false) {
  gutil.log('testWarnOnly: ', gutil.colors.cyan('true'));
  GLOBAL.WF.options.testWarnOnly = true;
}
gutil.log('');


gulp.task('clean', function() {
  var filesToDelete = [
    'src/content/en/_shared/contributors/*',
    'src/content/**/rss.xml',
    'src/content/**/atom.xml',
    'src/content/**/_files.json',
    'src/content/en/sitemap.xml',
    'src/content/*/showcase/_index.yaml',
    'src/content/*/showcase/*/_toc.yaml',
    'src/content/*/showcase/*/index.md',
    'src/content/*/shows/_index.yaml',
    'src/content/*/shows/**/feed.xml',
    'src/content/*/shows/http203/podcast/index.md',
    'src/content/*/updates/_index.yaml',
    'src/content/*/updates/*/index.md',
    'src/content/*/updates/tags/*',
    '!src/content/*/**/_generated.md'
  ];
  var opts = {dryRun: false, dot: true};
  var deletedFiles = del.sync(filesToDelete, opts);
  gutil.log(' ', 'Deleted', gutil.colors.magenta(deletedFiles.length + ' files'));
});

gulp.task('deploy', function(cb) {
  runSequence('clean','build', 'test', cb);
});

gulp.task('presubmit', function(cb) {
  runSequence('clean', 'test', cb);
});

gulp.task('default', function() {
  gutil.log('Options:');
  gutil.log(' ', gutil.colors.cyan('build'), 'Builds all auto-generated files...');
  gutil.log(' ', gutil.colors.cyan('clean'), 'Removes all auto-generated files from src/content/...');
  gutil.log(' ', gutil.colors.cyan('codelabs'), 'Updates the Code Labs to the latest from Docs');
  gutil.log(' ', gutil.colors.cyan('deploy'), '[clean, build, test]');
  gutil.log(' ', gutil.colors.cyan('presubmit'), 'See test');
  gutil.log(' ', gutil.colors.cyan('test'), 'Checks the files for any issues');
  gutil.log('');
});
