/**
 * @fileoverview Gulp Tasks for building the WebFundamentals repo.
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const glob = require('globule');
const jsYaml = require('js-yaml');
const gutil = require('gulp-util');
const wfHelper = require('./wfHelper');
const wfGlossary = require('./wfGlossary');
const runSequence = require('run-sequence');
const wfContributors = require('./wfContributors');
const wfYouTubeShows = require('./wfYouTubeShows');
const wfTemplateHelper = require('./wfTemplateHelper');


/**
 * Generates feeds for each year. The feed contains all content for that year
 * with the <content> section stripped.
 * @param {*} files
 * @param {!Object} options
 */
function generateFeedsForEveryYear(files, options) {
  // Build RSS feed per year.
  //  Check if we will build the full RSS feeds.
  if (!global.WF.options.buildRSS) {
    return;
  }

  const filesByYear = wfHelper.splitByYear(files);

  Object.keys(filesByYear)
    .filter((year) => year >= global.WF.minFeedDate)
    .forEach((year) => {
      const opts = Object.assign({}, options);
      // Sort items by date published, reduce churn in annual feeds
      const filesForYear = filesByYear[year].sort(wfHelper.publishedComparator);
      wfTemplateHelper.generateFeeds(filesForYear, Object.assign(opts, {
        year,
        outputPath: path.join(opts.outputPath, year),
        title: `${options.title} (${year})`,
        includeContent: false,
        maxItems: 500,
      }));
    });
}

/**
 * Builds the contributors listing and individual pages
 * @todo - Move this gulp task to wfContributors.js
 */
gulp.task('build:contributors', function() {
  wfContributors.build();
});


/**
 * Reads src/data/announcement.yaml and adds/removes the announcement
 * to all _project.yaml files.
 */
gulp.task('build:announcement', function() {
  const globOpts = {
    srcBase: 'src/content/en/',
    prefixBase: true,
  };
  const dumpYamlOpts = {lineWidth: 1000};
  const projectYamlFiles = glob.find('**/_project.yaml', globOpts);
  const file = 'src/data/announcement.yaml';
  const announcementYaml = jsYaml.safeLoad(fs.readFileSync(file, 'utf8'));
  const showAnnouncement = announcementYaml['enabled'];
  projectYamlFiles.forEach((file) => {
    let projYaml = jsYaml.safeLoad(fs.readFileSync(file, 'utf8'));
    if (showAnnouncement) {
      projYaml.announcement = {};
      projYaml.announcement.description = announcementYaml.description;
      if (announcementYaml.background) {
        projYaml.announcement.background = announcementYaml.background;
      }
    } else {
      delete projYaml['announcement'];
    }
    fs.writeFileSync(file, jsYaml.safeDump(projYaml, dumpYamlOpts));
  });
});


/**
 * Builds the WebFu glossary
 * @todo - Move this gulp task to wfGlossary.js
 */
gulp.task('build:glossary', function() {
  wfGlossary.build();
});


/**
 * Builds the RSS & ATOM feeds for /web/fundamentals/
 */
gulp.task('build:fundamentals', function() {
  const section = 'fundamentals';
  const baseOutputPath = path.join(global.WF.src.content, section);
  const description = 'The latest changes to ' +
      'https://developers.google.com/web/fundamentals';
  const options = {
    title: 'Web Fundamentals',
    description: description,
    section: section,
    outputPath: baseOutputPath,
  };
  const startPath = path.join(global.WF.src.content, section);
  const files = wfHelper.getFileList(startPath, ['**/*.md']);
  files.sort(wfHelper.updatedComparator);
  wfTemplateHelper.generateFeeds(files, options);

  generateFeedsForEveryYear(files, options);
});

/**
 * Builds all of the listing pages, including RSS & ATOM feeds
 * for /web/showcase/
 */
gulp.task('build:showcase', function() {
  const section = 'showcase';
  const baseOutputPath = path.join(global.WF.src.content, section);
  const description = 'Learn why and how other developers have used the web ' +
      'to create amazing web experiences for their users.';
  const options = {
    title: 'Case Studies',
    description: description,
    section: section,
    outputPath: baseOutputPath,
  };
  const startPath = path.join(global.WF.src.content, 'showcase');
  const patterns = ['**/*.md', '!tags/*', '!**/index.md'];
  let files = wfHelper.getFileList(startPath, patterns);

  // Generate landing page with featured case studies
  files.sort(wfHelper.featuredComparator);
  options.template = path.join(global.WF.src.templates, 'showcase/index.yaml');
  wfTemplateHelper.generateIndex(files, options);

  // Sort case studies by last updated for the rest of the pages
  files.sort(wfHelper.updatedComparator);

  // Generate the listing by region
  options.title = 'Show Cases by Region';
  options.template = path.join(global.WF.src.templates, 'showcase/region.md');
  options.outputPath = path.join(baseOutputPath, 'region');
  wfTemplateHelper.generateListPage(files, options);

  // Generate the listing by vertical
  options.title = 'Show Cases by Vertical';
  options.template = path.join(global.WF.src.templates, 'showcase/vertical.md');
  options.outputPath = path.join(baseOutputPath, 'vertical');
  wfTemplateHelper.generateListPage(files, options);

  // Generate the listings by tags
  options.title = 'Show Cases by Tag';
  options.outputPath = path.join(baseOutputPath, 'tags');
  wfTemplateHelper.generateTagPages(files, options);

  // Generate the listings by Year
  options.template = null;
  const filesByYear = wfHelper.splitByYear(files);
  Object.keys(filesByYear).forEach(function(year) {
    options.year = year;
    options.outputPath = path.join(baseOutputPath, year);
    options.title = 'Show Cases (' + year + ')';
    wfTemplateHelper.generateListPage(filesByYear[year], options);
    options.title = year;
    wfTemplateHelper.generateTOCbyMonth(filesByYear[year], options);
  });

  // Generate the RSS & ATOM feeds
  options.title = 'Show Cases';
  options.outputPath = baseOutputPath;
  wfTemplateHelper.generateFeeds(files, options);

  generateFeedsForEveryYear(files, options);
});


/**
 * Builds index page and RSS & ATOM feeds for /web/shows/
 */
gulp.task('build:shows', async function() {
  gutil.log(' ', 'Generating recent videos...');
  await wfYouTubeShows.getVideos(global.WF.options.buildType).then((videos) => {
    // build the RSS & ATOM feeds
    wfYouTubeShows.buildFeeds(videos);

    // build the shows index.md page
    let context = {videos};
    let template = path.join(global.WF.src.templates, 'shows', 'index.md');
    let outputFile = path.join(global.WF.src.content, 'shows', 'index.md');
    wfTemplateHelper.renderTemplate(template, context, outputFile);

    // build the latest show widget
    context = {video: videos[0]};
    template = path.join(global.WF.src.templates, 'shows', 'latest.html');
    outputFile = path.join(
      global.WF.src.content, '_shared', 'latest_show.html');
    wfTemplateHelper.renderTemplate(template, context, outputFile);

    // build the latest show include for index
    context = {video: videos[0]};
    template = path.join(
      global.WF.src.templates, 'landing-page', 'latest-show.html');
    outputFile = path.join(global.WF.src.content, '_index-latest-show.html');
    wfTemplateHelper.renderTemplate(template, context, outputFile);
  });

  // Build RSS feed per year.
  //  Check if we will build the full RSS feeds.
  //  `wfYouTubeShows.buildFeeds()` will return immediately if
  //  buildRSS === false, but getting all of the videos is expensive, so
  //  if we don't plan to use them, skip.
  if (!global.WF.options.buildRSS) {
    return;
  }
  gutil.log(' ', 'Generating historial RSS/ATOM video feed...');
  await wfYouTubeShows.getAllVideosByYear().then((videosByYear) => {
    Object.keys(videosByYear)
      .filter((year) => year >= global.WF.minFeedDate)
      .forEach((year) => {
        wfYouTubeShows.buildFeeds(videosByYear[year], {
          outputPath: path.join(global.WF.src.content, 'shows', year),
          title: `Web Shows (${year}) - Google Developers`,
        });
      });
  });
});

/**
 * Builds RSS & ATOM feeds for the HTTP203 Podcast
 */
gulp.task('build:http203Podcast', function() {
  const src = 'shows/http203/podcast/';
  const baseOutputPath = path.join(global.WF.src.content, src);
  const summary = 'Surma and Jake talk about whatever\'s going on in the ' +
      'world of web development.';
  const image = 'https://developers.google.com/web/shows/http203/podcast/' +
      'images/surma-and-jake-2.jpg';
  const options = {
    title: 'HTTP 203',
    subtitle: 'Where Surma and Jake occasionally talk web.',
    author: {name: 'Surma & Jake', email: 'jaffathecake@gmail.com'},
    summary: summary,
    image: image,
    section: 'shows',
    outputPath: baseOutputPath,
    baseUrl: 'https://developers.google.com/web/shows/http203/podcast/',
  };
  let files = wfHelper.getFileList(baseOutputPath, ['*.md', '!index.md']);
  files.sort(wfHelper.publishedComparator);
  wfTemplateHelper.generateListPage(files, options);
  wfTemplateHelper.generatePodcastFeed(files, options);
});


/**
 * Builds RSS & ATOM feeds for Designer vs Developer podcast
 */
gulp.task('build:DVDPodcast', function() {
  const src = 'shows/designer-vs-developer/podcast/';
  const baseOutputPath = path.join(global.WF.src.content, src);
  const subtitle = 'A show that tries to solve the challenges faced in ' +
      'industry by having an open conversation between the two.';
  const baseUrl = 'https://developers.google.com/web/shows/' +
      'designer-vs-developer/podcast/';
  const image = baseUrl + 'images/dvd-series-cover-large.jpg';
  const options = {
    title: 'Designer Vs Developer',
    subtitle: subtitle,
    author: {name: 'Mustafa Kurtuldu', email: 'mustafa.kurtuldu@gmail.com'},
    summary: subtitle,
    image: image,
    section: 'shows',
    outputPath: baseOutputPath,
    baseUrl: baseUrl,
  };
  let files = wfHelper.getFileList(baseOutputPath, ['*.md', '!index.md']);
  files.sort(wfHelper.publishedComparator);
  wfTemplateHelper.generateListPage(files, options);
  wfTemplateHelper.generatePodcastFeed(files, options);
});


/**
 * Builds RSS & ATOM feeds /web/tools/
 */
gulp.task('build:tools', function() {
  const section = 'tools';
  const baseOutputPath = path.join(global.WF.src.content, section);
  const options = {
    title: 'Tools',
    description: 'The latest changes to https://developers.google.com/web/tools',
    section: section,
    outputPath: baseOutputPath,
  };
  const startPath = path.join(global.WF.src.content, section);
  let files = wfHelper.getFileList(startPath, ['**/*.md']);
  files.sort(wfHelper.updatedComparator);
  wfTemplateHelper.generateFeeds(files, options);

  generateFeedsForEveryYear(files, options);
});


/**
 * Builds all of the listing pages, including RSS & ATOM feeds
 * for /web/updates/
 */
gulp.task('build:updates', function() {
  const section = 'updates';
  const baseOutputPath = path.join(global.WF.src.content, section);
  const description = 'The latest and freshest updates from the Web teams ' +
      'at Google. Chrome, V8, tooling, and more.';
  let options = {
    title: 'Updates',
    description: description,
    section: section,
    outputPath: baseOutputPath,
  };
  const startPath = path.join(global.WF.src.content, section);
  const patterns = ['**/*.md', '!tags/*', '!**/index.md'];
  let files = wfHelper.getFileList(startPath, patterns);
  files.sort(wfHelper.publishedComparator);
  wfTemplateHelper.generateIndex(files, options);
  wfTemplateHelper.generateFeeds(files, options);
  options.outputPath = path.join(baseOutputPath, 'tags');
  wfTemplateHelper.generateTagPages(files, options);
  let filesByYear = wfHelper.splitByYear(files);
  Object.keys(filesByYear).forEach(function(year) {
    options.outputPath = path.join(baseOutputPath, year);
    options.year = year;
    options.title = `Web Updates (${year})`;
    wfTemplateHelper.generateListPage(filesByYear[year], options);
    wfTemplateHelper.generateTOCbyMonth(filesByYear[year], options);
  });
  options = {
    outputPath: global.WF.src.content,
    articlesToShow: 4,
  },
  wfTemplateHelper.generateLatestWidget(files, options);

  // Build updates widget for /web/index
  const template = path.join(
    global.WF.src.templates, 'landing-page', 'latest-updates.html');
  // Create a new array so we don't mutate the existing array;
  const articles = [];
  for (let i = 0; i < 4; i++) {
    articles.push(files[i]);
  }
  const context = {articles};
  const outFile = path.join(
    global.WF.src.content, '_index-latest-updates.html');
  wfTemplateHelper.renderTemplate(template, context, outFile);

  // Generate the RSS/ATOM feeds for each year
  options = {
    title: 'Updates',
    description: description,
    section: section,
    outputPath: baseOutputPath,
  };
  generateFeedsForEveryYear(files, options);
});

/**
 * Builds all the things!
 */
gulp.task('post-install', function(cb) {
  runSequence('puppeteer:build', 'build', cb);
});


/**
 * Builds all the things!
 */
gulp.task('build', function(cb) {
  runSequence(
    [
      'build:announcement',
      'build:contributors',
      'build:glossary',
      'build:fundamentals',
      'build:showcase',
      'build:http203Podcast',
      'build:DVDPodcast',
      'build:tools',
      'build:updates',
      'build:shows',
    ],
    cb);
});
