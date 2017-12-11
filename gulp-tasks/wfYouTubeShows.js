/**
 * @fileoverview Generates the list of latest shows from YouTube
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const gutil = require('gulp-util');
const google = require('googleapis');
const moment = require('moment');
const wfHelper = require('./wfHelper');
const wfTemplateHelper = require('./wfTemplateHelper');

/**
 * Build the RSS and ATOM feeds for the the latest shows
 *
 * @param {string} buildType
 * @param {Function} callback
 * @return {null} Nothing of interest
 */
function buildFeeds(buildType, callback) {
  let apiKey;
  try {
    apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      apiKey = fs.readFileSync('./src/data/youtubeAPIKey.txt', 'utf8');
    }
  } catch (ex) {
    gutil.log(' ', 'YouTube feed build skipped, youtubeAPIKey.txt not found.');
    if (buildType === 'production') {
      return callback('youtubeAPIKey.txt not found.');
    }
    let videoPlaceholder = {
      snippet: {
        title: 'Lorem Ipsum - placeholder title',
        resourceId: {videoId: 'dQw4w9WgXcQ'},
      },
    };
    let context = {
      videos: [
        videoPlaceholder,
        videoPlaceholder,
        videoPlaceholder,
        videoPlaceholder,
      ],
    };
    const template = path.join(global.WF.src.templates, 'shows', 'index.md');
    const outputFile = path.join(global.WF.src.content, 'shows', 'index.md');
    wfTemplateHelper.renderTemplate(template, context, outputFile);
    callback();
    return;
  }
  const youtube = google.youtube({version: 'v3', auth: apiKey});
  const opts = {
    maxResults: 25,
    part: 'id,snippet',
    playlistId: 'UUnUYZLuoy1rq1aVMwx4aTzw',
  };
  youtube.playlistItems.list(opts, function(err, response) {
    if (err) {
      gutil.log(' ', 'Error, unable to retreive playlist', err);
      callback(err);
    } else {
      let articles = [];
      response.items.forEach(function(video) {
        let iframe = '<iframe width="560" height="315" ';
        iframe += 'src="https://www.youtube.com/embed/';
        iframe += video.snippet.resourceId.videoId + '" frameborder="0" ';
        iframe += 'allowfullscreen></iframe>\n<br>\n<br>';
        let content = video.snippet.description.replace(/\n/g, '<br>\n');
        content = iframe + content;
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
        let shortDesc = video.snippet.description.replace(/\n/g, '<br>');
        if (shortDesc.length > 256) {
          shortDesc = shortDesc.substring(0, 254) + '...';
        }
        video.shortDesc = shortDesc;
      });
      let context = {videos: response.items};
      let template = path.join(global.WF.src.templates, 'shows', 'index.md');
      let outputFile = path.join(global.WF.src.content, 'shows', 'index.md');
      wfTemplateHelper.renderTemplate(template, context, outputFile);

      context = {video: response.items[0]};
      template = path.join(global.WF.src.templates, 'shows', 'latest.html');
      // eslint-disable-next-line max-len
      outputFile = path.join(global.WF.src.content, '_shared', 'latest_show.html');
      wfTemplateHelper.renderTemplate(template, context, outputFile);

      // Note - use last updated instead of now to prevent feeds from being
      // generated every single time. This will only generate if the feeds are
      // actually updated.
      const lastUpdated = articles[0].datePublishedMoment;
      context = {
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
      template = path.join(global.WF.src.templates, 'atom.xml');
      outputFile = path.join(global.WF.src.content, 'shows', 'atom.xml');
      wfTemplateHelper.renderTemplate(template, context, outputFile);

      template = path.join(global.WF.src.templates, 'rss.xml');
      outputFile = path.join(global.WF.src.content, 'shows', 'rss.xml');
      wfTemplateHelper.renderTemplate(template, context, outputFile);
      callback();
    }
  });
}

exports.buildFeeds = buildFeeds;
