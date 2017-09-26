'use strict';

const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const glob = require('globule');
const moment = require('moment');
const jsYaml = require('js-yaml');
const wfHelper = require('./wfHelper');
const wfGlossary = require('./wfGlossary');
const runSequence = require('run-sequence');
const wfContributors = require('./wfContributors');
const wfYouTubeShows = require('./wfYouTubeShows');
const wfTemplateHelper = require('./wfTemplateHelper');

gulp.task('build:contributors', function() {
  wfContributors.build();
});

gulp.task('build:announcement', function() {
  const globOpts = {
    srcBase: 'src/content/en/',
    prefixBase: true,
  };
  const dumpYamlOpts = {lineWidth: 1000};
  const projectYamlFiles = glob.find('**/_project.yaml', globOpts);
  const file = 'src/content/en/_wf-announcement.yaml';
  const announcementYaml = jsYaml.safeLoad(fs.readFileSync(file, 'utf8'));
  const startDate = moment(announcementYaml['start']);
  const endDate = moment(announcementYaml['end']);
  const isBetween = moment().isBetween(startDate, endDate);
  projectYamlFiles.forEach((file) => {
    let projYaml = jsYaml.safeLoad(fs.readFileSync(file, 'utf8'));
    if (isBetween) {
      projYaml['announcement'] = announcementYaml;
    } else {
      delete projYaml['announcement'];
    }
    fs.writeFileSync(file, jsYaml.safeDump(projYaml, dumpYamlOpts));
  });
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
  wfGlossary.build();
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
    title: 'HTTP 203',
    subtitle: 'Where Surma and Jake occasionally talk web.',
    author: {name: 'Surma & Jake', email: 'jaffathecake@gmail.com'},
    summary: 'Surma and Jake talk about whatever\'s going on in the world of web development.',
    image: 'https://developers.google.com/web/shows/http203/podcast/images/surma-and-jake.jpg',
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
    description: 'The latest and freshest updates from the Web teams at Google. Chrome, V8, tooling, and more.',
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
    articlesToShow: 4
  }
  wfTemplateHelper.generateLatestWidget(files, options);
});

gulp.task('build', function(cb) {
  runSequence(
    [
      'build:announcement',
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
