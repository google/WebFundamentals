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
  maxArticlesInFeed: 10,
  langs: [
    'en', 'ar', 'de', 'es', 'fr', 'he', 'hi', 'id', 'it', 'ja',
    'ko', 'nl', 'pl', 'pt-br', 'ru', 'tr', 'zh-cn', 'zh-tw'
  ],
};
var defaultOptions = {
  string: ['lang', 'verbose', 'testAll', 'testTests', 'testWarnOnly', ],
  default: {
    lang: null,
    verbose: false,
    buildType: 'dev',
    testAll: false,
    testTests: false,
    testWarnOnly: false
  }
}
GLOBAL.WF.options = minimist(process.argv.slice(2), defaultOptions);

var optionsOK = true;
gutil.log('---------------------------------');
gutil.log(gutil.colors.dim('Web') + gutil.colors.bold('Fundamentals'), 'Build Script');
gutil.log('---------------------------------');
if (GLOBAL.WF.options.lang) {
  var langs = GLOBAL.WF.options.lang.split(',');
  langs.forEach(function(lang) {
    if (GLOBAL.WF.langs.indexOf(lang) === -1) {
      gutil.log(' ', 'ERROR: Language ', chalk.red(lang), 'not supported.');
      optionsOK = false;
    }
  });
  GLOBAL.WF.options.lang = langs;
} else {
  GLOBAL.WF.options.lang = GLOBAL.WF.langs;
}
gutil.log('Language: ', gutil.colors.cyan(GLOBAL.WF.options.lang));
if (GLOBAL.WF.options.verbose !== false) {
  GLOBAL.WF.options.verbose = true;
}
gutil.log('Verbose: ', gutil.colors.cyan(GLOBAL.WF.options.verbose));

if (GLOBAL.WF.options.testAll !== false) {
  gutil.log('testAll:', chalk.cyan('true'));
  GLOBAL.WF.options.testAll = true;
}
if (GLOBAL.WF.options.testTests !== false) {
  gutil.log('testTests:', chalk.cyan('true'));
  GLOBAL.WF.options.testTests = true;
}
if (GLOBAL.WF.options.testWarnOnly !== false) {
  gutil.log('testWarnOnly: ', gutil.colors.cyan('true'));
  GLOBAL.WF.options.testWarnOnly = true;
}

if (optionsOK === false) {
  throw new Error('Invalid options were provided.');
}
gutil.log('');

gulp.task('clean', function() {
  var filesToDelete = [
    'test-results.json',
    'src/content/en/_shared/contributors/*',
    'src/content/**/rss.xml',
    'src/content/**/atom.xml',
    'src/content/**/_files.json',
    'src/content/en/sitemap.xml',
    'src/content/*/fundamentals/glossary.md',
    'src/content/*/resources/contributors/*',
    'src/content/*/showcase/_index.yaml',
    'src/content/*/showcase/*/_toc.yaml',
    'src/content/*/showcase/*/index.md',
    'src/content/*/showcase/tags/*',
    'src/content/*/shows/_index.yaml',
    'src/content/*/shows/index.md',
    'src/content/*/shows/**/feed.xml',
    'src/content/*/shows/http203/podcast/index.md',
    'src/content/*/shows/designer-vs-developer/podcast/index.md',
    'src/content/*/updates/_index.yaml',
    'src/content/*/updates/*/index.md',
    'src/content/*/updates/tags/*',
    'src/data/codelabs/*/*.md',
    'src/data/codelabs/*/img/**',
    'src/data/ilt-pwa/*/*.md',
    'src/data/ilt-pwa/*/img/**',
    '!src/content/*/**/_generated.md'
  ];
  var opts = {dryRun: false, dot: true};
  var deletedFiles = del.sync(filesToDelete, opts);
  gutil.log(' ', 'Deleted', gutil.colors.magenta(deletedFiles.length + ' files'));
});

gulp.task('presubmit', function(cb) {
  runSequence('clean', 'test', cb);
});

gulp.task('default', function(cb) {
  console.log(chalk.red('ERROR:'), 'no command specified.');
  console.log('Usage: gulp <command> [arguments]');
  console.log(' ', 'Commands');
  console.log('  ', gutil.colors.cyan('build'), 'Builds all auto-generated files...');
  console.log('  ', gutil.colors.cyan('static'), 'Builds static versions of all files');
  console.log('  ', gutil.colors.cyan('clean'), 'Removes all auto-generated files from src/content/...');
  console.log('  ', gutil.colors.cyan('presubmit'), 'Clean & test');
  console.log('  ', gutil.colors.cyan('test'), 'Checks the files for any issues');
  console.log(' ', 'Optional Arguments');
  console.log('  ', chalk.cyan('--lang'), 'Comma separated list of languages to use', chalk.gray('eg: --lang=en,fr'));
  console.log('  ', chalk.cyan('--verbose'), 'Log with verbose output');
  console.log('');
});
