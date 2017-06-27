'use strict';

var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');
var wfHelper = require('./wfHelper');
var wfContributors = require('./wfContributors');
var wfTemplateHelper = require('./wfTemplateHelper');
var wfYouTubeShows = require('./wfYouTubeShows');

gulp.task('build:contributors', function() {
  wfContributors.build();
});

gulp.task('build:fundamentals', function() {
  var section = 'fundamentals';
  var baseOutputPath = path.join(GLOBAL.WF.src.content, section);
  var options = {
    title: 'Web Fundamentals',
    description: 'The latest changes to https://developers.google.com/web/fundamentals',
    section: section,
    outputPath: baseOutputPath
  };
  var startPath = path.join(GLOBAL.WF.src.content, section);
  var files = wfHelper.getFileList(startPath, ['**/*.md']);
  files.sort(wfHelper.updatedComparator);
  wfTemplateHelper.generateFeeds(files, options);
});

gulp.task('build:showcase', function() {
  var section = 'showcase';
  var baseOutputPath = path.join(GLOBAL.WF.src.content, section);
  var options = {
    title: 'Case Studies',
    description: 'Learn why and how other developers have used the web to create amazing web experiences for their users.',
    section: section,
    outputPath: baseOutputPath
  };
  var startPath = path.join(GLOBAL.WF.src.content, 'showcase');
  var patterns = ['**/*.md', '!tags/*', '!**/index.md'];
  var files = wfHelper.getFileList(startPath, patterns);

  // Generate landing page with featured case studies
  files.sort(wfHelper.featuredComparator);
  options.template = path.join(GLOBAL.WF.src.templates, 'showcase/index.yaml');
  wfTemplateHelper.generateIndex(files, options);

  // Sort case studies by last updated for the rest of the pages
  files.sort(wfHelper.updatedComparator);

  // Generate the listing by region
  options.title = 'Show Cases by Region';
  options.template = path.join(GLOBAL.WF.src.templates, 'showcase/region.md');
  options.outputPath = path.join(baseOutputPath, 'region');
  wfTemplateHelper.generateListPage(files, options);

  // Generate the listing by vertical
  options.title = 'Show Cases by Vertical';
  options.template = path.join(GLOBAL.WF.src.templates, 'showcase/vertical.md');
  options.outputPath = path.join(baseOutputPath, 'vertical');
  wfTemplateHelper.generateListPage(files, options);

  // Generate the listings by tags
  options.title = 'Show Cases by Tag';
  options.outputPath = path.join(baseOutputPath, 'tags');
  wfTemplateHelper.generateTagPages(files, options);

  // Generate the listings by Year
  options.template = null;
  var filesByYear = wfHelper.splitByYear(files);
  Object.keys(filesByYear).forEach(function(year) {
    options.year = year;
    options.outputPath = path.join(baseOutputPath, year);
    options.title = 'Show Cases (' + year + ')';
    wfTemplateHelper.generateListPage(filesByYear[year], options);
    options.title = year;
    wfTemplateHelper.generateTOCbyMonth(filesByYear[year], options);
  });

  // Generate the RSS & ATOM feeds
  options.outputPath = baseOutputPath;
  wfTemplateHelper.generateFeeds(files, options);
});

gulp.task('build:shows', function(cb) {
  wfYouTubeShows.buildFeeds(GLOBAL.WF.options.buildType, cb);
});

gulp.task('build:http203Podcast', function() {
  var src = 'shows/http203/podcast/';
  var baseOutputPath = path.join(GLOBAL.WF.src.content, src);
  var options = {
    title: 'HTTP 203 Podcast',
    subtitle: 'Where Paul and Jake occasionally talk web.',
    author: {name: 'Paul Lewis & Jake Archibald', email: 'jaffathecake@gmail.com'},
    summary: 'Paul and Jake talk about whatever\'s going on in the world of web development.',
    image: 'https://developers.google.com/web/shows/http203/podcast/http203-podcast.jpg',
    section: 'shows',
    outputPath: baseOutputPath,
    baseUrl: 'https://developers.google.com/web/shows/http203/podcast/'
  };
  var files = wfHelper.getFileList(baseOutputPath, ['*.md', '!index.md']);
  files.sort(wfHelper.updatedComparator);
  wfTemplateHelper.generateListPage(files, options);
  wfTemplateHelper.generatePodcastFeed(files, options);
});

gulp.task('build:DVDPodcast', function() {
  var src = 'shows/designer-vs-developer/podcast/';
  var baseOutputPath = path.join(GLOBAL.WF.src.content, src);
  var options = {
    title: 'Designer Vs Developer',
    subtitle: 'A show that tries to solve the challenges faced in industry by having an open conversation between the two.',
    author: {name: 'Mustafa Kurtuldu', email: 'mustafa.kurtuldu@gmail.com'},
    summary: 'A show that tries to solve the challenges faced in industry by having an open conversation between the two.',
    image: 'https://developers.google.com/web/shows/designer-vs-developer/podcast/images/dvd-series-cover-large.jpg',
    section: 'shows',
    outputPath: baseOutputPath,
    baseUrl: 'https://developers.google.com/web/shows/designer-vs-developer/podcast/'
  };
  var files = wfHelper.getFileList(baseOutputPath, ['*.md', '!index.md']);
  files.sort(wfHelper.updatedComparator);
  wfTemplateHelper.generateListPage(files, options);
  wfTemplateHelper.generatePodcastFeed(files, options);
});

gulp.task('build:tools', function() {
  var section = 'tools';
  var baseOutputPath = path.join(GLOBAL.WF.src.content, section);
  var options = {
    title: 'Tools',
    description: 'The latest changes to https://developers.google.com/web/tools',
    section: section,
    outputPath: baseOutputPath
  };
  var startPath = path.join(GLOBAL.WF.src.content, section);
  var files = wfHelper.getFileList(startPath, ['**/*.md']);
  files.sort(wfHelper.updatedComparator);
  wfTemplateHelper.generateFeeds(files, options);
});

gulp.task('build:updates', function() {
  var section = 'updates';
  var baseOutputPath = path.join(GLOBAL.WF.src.content, section);
  var options = {
    title: 'Updates',
    description: 'The latest and freshest updates from the Web teams at Google. Chrome, Tooling and more.',
    section: section,
    outputPath: baseOutputPath
  };
  var startPath = path.join(GLOBAL.WF.src.content, section);
  var patterns = ['**/*.md', '!tags/*', '!**/index.md'];
  var files = wfHelper.getFileList(startPath, patterns);
  files.sort(wfHelper.publishedComparator);
  wfTemplateHelper.generateIndex(files, options);
  wfTemplateHelper.generateFeeds(files, options);
  options.outputPath = path.join(baseOutputPath, 'tags');
  wfTemplateHelper.generateTagPages(files, options);
  var filesByYear = wfHelper.splitByYear(files);
  Object.keys(filesByYear).forEach(function(year) {
    options.outputPath = path.join(baseOutputPath, year);
    options.year = year;
    options.title = 'Web Updates (' + year + ')';
    wfTemplateHelper.generateListPage(filesByYear[year], options);
    options.title = year;
    wfTemplateHelper.generateTOCbyMonth(filesByYear[year], options);
  });
  options = {
    outputPath: GLOBAL.WF.src.content,
    articlesToShow: 2
  }
  wfTemplateHelper.generateLatestWidget(files, options);
});

gulp.task('build', function(cb) {
  runSequence(
    [
      'build:contributors',
      'build:fundamentals',
      'build:showcase',
      'build:shows',
      'build:http203Podcast',
      'build:DVDPodcast',
      'build:tools',
      'build:updates'
    ],
    cb);
});
