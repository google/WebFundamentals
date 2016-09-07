'use strict';

var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var wfHelper = require('./wfHelper');
var wfContributors = require('./wfContributors');
var wfTemplateHelper = require('./wfTemplateHelper');

gulp.task('build:contributors', function() {
  wfContributors.build();
});

gulp.task('build:fundamentals', function() {

});

gulp.task('build:showcase', function() {
  var options = {
    title: 'Web Showcase - Google Developers',
    description: 'Learn how other developers have been awesome.',
    sectionId: 'showcase'
  };
  var startPath = path.join(GLOBAL.WF.src.content, 'showcase');
  var filesToIgnore = ['index.md', '_template.md', '_generated.md'];
  var files = wfHelper.getFileList(startPath, true, filesToIgnore);
  files.sort(wfHelper.publishedComparator);
  wfTemplateHelper.generateIndex(files, options);
  wfTemplateHelper.generateFeeds(files, options);
  var filesByYear = wfHelper.splitByYear(files);
  var years = Object.keys(filesByYear);
  years.forEach(function(year) {
    options.title = 'Showcase (' + year + ')';
    options.outputFile =  path.join(year, 'index.md');
    wfTemplateHelper.generateListPage(filesByYear[year], options);
    options.title = year;
    options.outputFile =  path.join(year, '_toc.yaml');
    wfTemplateHelper.generateTOCbyMonth(filesByYear[year], options);
  });
});

gulp.task('build:shows', function() {

});

gulp.task('build:tools', function() {

});

gulp.task('build:updates', function() {
  var options = {
    title: 'Web Updates - Google Developers',
    description: 'The latest and freshest updates from the Web teams at Google. Chrome, Tooling and more.',
    sectionId: 'updates'
  };
  var startPath = path.join(GLOBAL.WF.src.content, 'updates');
  var filesToIgnore = ['index.md', '_template.md', '_generated.md'];
  var files = wfHelper.getFileList(startPath, true, filesToIgnore);
  files.sort(wfHelper.publishedComparator);
  wfTemplateHelper.generateIndex(files, options);
  wfTemplateHelper.generateFeeds(files, options);
  wfTemplateHelper.generateTagPages(files, options);
  var filesByYear = wfHelper.splitByYear(files);
  var years = Object.keys(filesByYear);
  years.forEach(function(year) {
    options.title = 'Web Updates (' + year + ')';
    options.outputFile =  path.join(year, 'index.md');
    wfTemplateHelper.generateListPage(filesByYear[year], options);
    options.title = year;
    options.outputFile =  path.join(year, '_toc.yaml');
    wfTemplateHelper.generateTOCbyMonth(filesByYear[year], options);
  });
});

gulp.task('build:sitelevel', function() {});

gulp.task('build', function(cb) {
  runSequence(
    'clean',
    [
      'build:contributors',
      'build:fundamentals',
      'build:showcase',
      'build:shows',
      'build:tools',
      'build:updates'
    ],
    'build:sitelevel', cb);
});
