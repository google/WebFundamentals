/**
 * @fileoverview Generates the list of latest shows from YouTube
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const gutil = require('gulp-util');
const google = require('googleapis');
const moment = require('moment');
const wfHelper = require('./wfHelper');
const wfTemplateHelper = require('./wfTemplateHelper');

const SINGLE_VIDEO_PLACEHOLDER = {
  snippet: {
    title: 'Lorem Ipsum - placeholder title',
    description: 'more text goes here, this is the description.',
    resourceId: {videoId: 'dQw4w9WgXcQ'},
    thumbnails: {default: {url: 'https://via.placeholder.com/120x90'}},
  },
};
const VIDEO_COLLECTION_PLACEHOLDER = [
  SINGLE_VIDEO_PLACEHOLDER,
  SINGLE_VIDEO_PLACEHOLDER,
  SINGLE_VIDEO_PLACEHOLDER,
  SINGLE_VIDEO_PLACEHOLDER,
];

/**
 * Gets the YouTube API key.
 *
 * @return {string} YouTubeAPI key, or null.
 */
function getYouTubeAPIKey() {
  try {
    let apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      apiKey = fs.readFileSync('./src/data/youtubeAPIKey.txt', 'utf8');
    }
    return apiKey;
  } catch (ex) {
    gutil.log(' ', 'youtubeAPIKey not found.');
  }
  return null;
}

/**
 * Renders the RSS or ATOM template based on the context.
 *
 * @param {string} file File to generate.
 * @param {Object} context Context to use when rendering.
 */
function generateFeed(file, context) {
  const template = path.join(global.WF.src.templates, file);
  const outputFile = path.join(global.WF.src.content, 'shows', file);
  wfTemplateHelper.renderTemplate(template, context, outputFile);
}

/**
 * Gets the Data feed from YouTube.
 *
 * @param {string} buildType If build type is production, and it can read the
 *                           API key, the function will fail.
 * @return {Promise<Array>} Array of videos.
 */
function getVideos(buildType) {
  return new Promise((resolve, reject) => {
    const apiKey = getYouTubeAPIKey();
    if (!apiKey) {
      const msg = `${chalk.cyan('getVideos')} failed,`;
      // If the build type is production, abort with critical failure.
      if (buildType === 'production') {
        gutil.log(' ', chalk.red('ERROR:'), msg, 'required for production.');
        reject('youtubeAPIKey not found.');
        return;
      }
      gutil.log(' ', chalk.yellow('Oops:'), msg, 'using placeholder videos.');
      resolve(VIDEO_COLLECTION_PLACEHOLDER);
      return;
    }
    const youtube = google.youtube({version: 'v3', auth: apiKey});
    const opts = {
      maxResults: 25,
      part: 'id,snippet',
      playlistId: 'UUnUYZLuoy1rq1aVMwx4aTzw',
    };
    youtube.playlistItems.list(opts, (err, response) => {
      if (err) {
        gutil.log(' ', 'Error, unable to retreive playlist', err);
        reject(err);
        return;
      }
      resolve(response.items);
      return;
    });
  });
}

/**
 * Builds the RSS & ATOM feeds from a YouTube video feed.
 *
 * @param {Array} videos Array of videos from YouTube.
 */
function buildFeeds(videos) {
  const articles = [];
  videos.forEach((video) => {
    let iframe = '<iframe width="560" height="315" ';
    iframe += 'src="https://www.youtube.com/embed/';
    iframe += video.snippet.resourceId.videoId + '" frameborder="0" ';
    iframe += 'allowfullscreen></iframe>\n<br>\n<br>';
    const description = video.snippet.description.replace(/\n/g, '<br>\n');
    const content = iframe + description;
    const publishedAtMoment = moment(video.snippet.publishedAt);
    let result = {
      url: video.snippet.resourceId.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      image: video.snippet.thumbnails.default,
      datePublishedMoment: publishedAtMoment,
      dateUpdatedMoment: publishedAtMoment,
      tags: [],
      analyticsUrl: '/web/videos/' + video.snippet.resourceId.videoId,
      content: content,
      atomAuthor: 'Google Developers',
    };
    articles.push(result);
  });

  // Note - use last updated instead of now to prevent feeds from being
  // generated every single time. This will only generate if the feeds are
  // actually updated.
  const lastUpdated = articles[0].datePublishedMoment;
  const context = {
    title: 'Web Shows - Google Developers',
    description: 'YouTube videos from the Google Chrome Developers team',
    feedRoot: 'https://developers.google.com/web/shows/',
    host: 'https://youtu.be/',
    baseUrl: 'https://youtube.com/user/ChromeDevelopers/',
    analyticsQS: '',
    atomPubDate: wfHelper.dateFormatAtom(lastUpdated),
    rssPubDate: wfHelper.dateFormatRSS(lastUpdated),
    articles: articles,
  };
  generateFeed('atom.xml', context);
  generateFeed('rss.xml', context);
}

exports.getVideos = getVideos;
exports.buildFeeds = buildFeeds;
