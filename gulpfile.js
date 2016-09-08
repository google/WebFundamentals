'use strict';

var del = require('del');
var gulp = require('gulp');
var chalk = require('chalk');
var gutil = require('gulp-util');
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
  maxArticlesInFeed: 3
};

gutil.log('---------------------------------');
gutil.log(gutil.colors.dim('Web') + gutil.colors.bold('Fundamentals'), 'Build Script');
gutil.log('---------------------------------');


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
    'src/content/*/updates/_index.yaml',
    'src/content/*/updates/*/index.md',
    'src/content/*/updates/tags/*',
    '!src/content/*/**/_generated.md'
  ];
  var opts = {dryRun: false, dot: true};
  var deletedFiles = del.sync(filesToDelete, opts);
  gutil.log(' ', 'Deleted', gutil.colors.magenta(deletedFiles.length + ' files'));
});

gulp.task('default', function() {
  gutil.log('Options:');
  gutil.log(' ', gutil.colors.cyan('clean'), 'Removes all auto-generated files from src/content/...');
  gutil.log(' ', gutil.colors.cyan('build'), 'Builds all auto-generated files...');
  gutil.log(' ', gutil.colors.cyan('codelabs'), 'Updates the Code Labs to the latest from Docs');
  gutil.log('');
});
