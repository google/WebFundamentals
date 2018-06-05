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
const {google} = require('googleapis');
const moment = require('moment');
const wfHelper = require('./wfHelper');
const wfTemplateHelper = require('./wfTemplateHelper');

const CHROME_DEV_UPLOAD_PLAYLIST_ID = 'UUnUYZLuoy1rq1aVMwx4aTzw';
const YT_MAX_VIDEOS_PER_PAGE = 25;
const YT_API_VERSION = 'v3';

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
    return apiKey.trim();
  } catch (ex) {
    gutil.log(' ', 'youtubeAPIKey not found.');
  }
  return null;
}

/**
 * Renders the RSS or ATOM template based on the context.
 *
 * @param {string} file File to generate.
 * @param {!Object} context Context to use when rendering.
 * @param {!Object} options Options used to generate the feed
 */
function generateFeed(file, context, options = {}) {
  const baseOutputPath = path.join(global.WF.src.content, 'shows');
  const outputFile = options.outputPath ?
    path.join(options.outputPath, file) : path.join(baseOutputPath, file);
  const template = path.join(global.WF.src.templates, file);
  wfTemplateHelper.renderTemplate(template, context, outputFile);
}

/**
 * Gets the Data feed from YouTube.
 *
 * @param {string} buildType If build type is production, and it can read the
 *     API key, the function will fail.
 * @param {boolean=} allVideos If true, returns all videos in the playlist.
 *     Default: false.
 * @return {Promise<Array>} Array of videos.
 */
async function getVideos(buildType, allVideos = false) {
  const apiKey = getYouTubeAPIKey();
  if (!apiKey) {
    const msg = `${chalk.cyan('getVideos')} failed,`;
    // If the build type is production, abort with critical failure.
    if (buildType === 'production') {
      gutil.log(' ', chalk.red('ERROR:'), msg, 'required for production.');
      return 'youtubeAPIKey not found.';
    }
    gutil.log(' ', chalk.yellow('Oops:'), msg, 'using placeholder videos.');

    return VIDEO_COLLECTION_PLACEHOLDER;
  }

  const videos = [];
  const playlistId = CHROME_DEV_UPLOAD_PLAYLIST_ID;
  const youtube = google.youtube({version: YT_API_VERSION, auth: apiKey});
  const opts = {
    maxResults: YT_MAX_VIDEOS_PER_PAGE,
    part: 'id,snippet',
    playlistId,
  };

  if (allVideos) {
    let pageToken = null;
    do {
      const resp = await youtube.playlistItems.list(
        Object.assign({}, opts, {type: 'video', maxResults: 50, pageToken}));
      videos.push(...resp.data.items);
      pageToken = resp.data.nextPageToken;
    } while (pageToken);
  } else {
    try {
      const response = await youtube.playlistItems.list(opts);
      videos.push(...response.data.items);
    } catch (err) {
      gutil.log(' ', 'Error, unable to retrieve playlist', err);
      throw err;
    }
  }

  return videos;
}

/**
 * Splits a list of videos by year published.
 *
 * @param {!Array} videos The array of videos to split.
 * @return {!Object} A list of videos split by year.
 */
function videosByYear(videos) {
  const result = {};
  videos.forEach((video) => {
    const publishedAtMoment = moment(video.snippet.publishedAt);
    const year = publishedAtMoment.year();
    if (!result[year]) {
      result[year] = [];
    }
    result[year].push(video);
  });
  return result;
}

/**
 * @param {string} buildType If build type is production, and it can read the
 *     API key, the function will fail.
 * @return {!Promise<!Object>} Promise that resolves to an object of videos by
 *     year.
 */
async function getAllVideosByYear(buildType) {
  return videosByYear(await getVideos(buildType, true));
}

/**
 * Builds the RSS & ATOM feeds from a YouTube video feed.
 *
 * @param {!Array} videos Array of videos from YouTube.
 * @param {!Object=} options Options used to generate the feed
 */
function buildFeeds(videos, options) {
  if (!global.WF.options.buildRSS) {
    return;
  }
  const articles = [];

  videos.forEach((video) => {
    const iframe = `
      <iframe width="560" height="315" frameborder="0" allowfullscreen
        src="https://www.youtube.com/embed/${video.snippet.resourceId.videoId}">
      </iframe>
      <br><br>
    `;
    const description = video.snippet.description.replace(/\n/g, '<br>\n');
    const content = iframe + description;
    const publishedAtMoment = moment(video.snippet.publishedAt);

    articles.push({
      url: video.snippet.resourceId.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      image: video.snippet.thumbnails.default,
      datePublishedMoment: publishedAtMoment,
      dateUpdatedMoment: publishedAtMoment,
      tags: [],
      analyticsUrl: `/web/videos/${video.snippet.resourceId.videoId}`,
      content: content,
      atomAuthor: 'Google Developers',
    });
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
  generateFeed('atom.xml', context, options);
  generateFeed('rss.xml', context, options);
}

exports.getVideos = getVideos;
exports.getAllVideosByYear = getAllVideosByYear;
exports.buildFeeds = buildFeeds;
