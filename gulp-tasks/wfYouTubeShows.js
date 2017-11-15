'use strict';

/*
    wfYouTubeShows.js
    TODO
 */

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var google = require('googleapis');
var moment = require('moment');
const wfHelper = require('./wfHelper');
var wfTemplateHelper = require('./wfTemplateHelper');

function buildFeeds(buildType, callback) {
  var apiKey;
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
    var videoPlaceholder = {snippet:
      {title: 'Lorem Ipsum - placeholder title', resourceId: {videoId: 'dQw4w9WgXcQ'}}
    };
    var context = {
      videos: [videoPlaceholder, videoPlaceholder, videoPlaceholder, videoPlaceholder]
    };
    var template = path.join(GLOBAL.WF.src.templates, 'shows', 'index.md');
    var outputFile = path.join(GLOBAL.WF.src.content, 'shows', 'index.md');
    wfTemplateHelper.renderTemplate(template, context, outputFile);
    callback();
    return;
  }
  var youtube = google.youtube({version: 'v3', auth: apiKey});
  var opts = {
    maxResults: 25,
    part: 'id,snippet',
    playlistId: 'UUnUYZLuoy1rq1aVMwx4aTzw',
  };
  youtube.playlistItems.list(opts, function(err, response) {
    if (err) {
      gutil.log(' ', 'Error, unable to retreive playlist', err);
      callback(err);
    } else {
      var articles = [];
      response.items.forEach(function(video) {
        var iframe = '<iframe width="560" height="315" ';
        iframe += 'src="https://www.youtube.com/embed/';
        iframe += video.snippet.resourceId.videoId + '" frameborder="0" ';
        iframe += 'allowfullscreen></iframe>\n<br>\n<br>';
        var content = video.snippet.description.replace(/\n/g, '<br>\n');
        content = iframe + content;
        const publishedAtMoment = moment(video.snippet.publishedAt);
        var result = {
          url: video.snippet.resourceId.videoId,
          title: video.snippet.title,
          description: video.snippet.description,
          image: video.snippet.thumbnails.default,
          datePublishedMoment: publishedAtMoment,
          dateUpdatedMoment: publishedAtMoment,
          tags: [],
          analyticsUrl: '/web/videos/' + video.snippet.resourceId.videoId,
          content: content,
          atomAuthor: 'Google Developers'
        };
        articles.push(result);
        var shortDesc = video.snippet.description.replace(/\n/g, '<br>');
        if (shortDesc.length > 256) {
          shortDesc = shortDesc.substring(0, 254) + '...';
        }
        video.shortDesc = shortDesc;
      });
      var context = {
        videos: response.items
      };
      var template = path.join(GLOBAL.WF.src.templates, 'shows', 'index.md');
      var outputFile = path.join(GLOBAL.WF.src.content, 'shows', 'index.md');
      wfTemplateHelper.renderTemplate(template, context, outputFile);

      var context = {
        video: response.items[0]
      };
      template = path.join(GLOBAL.WF.src.templates, 'shows', 'latest.html');
      outputFile = path.join(GLOBAL.WF.src.content, '_shared', 'latest_show.html');
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
        articles: articles
      };
      template = path.join(GLOBAL.WF.src.templates, 'atom.xml');
      outputFile = path.join(GLOBAL.WF.src.content, 'shows', 'atom.xml');
      wfTemplateHelper.renderTemplate(template, context, outputFile);

      template = path.join(GLOBAL.WF.src.templates, 'rss.xml');
      outputFile = path.join(GLOBAL.WF.src.content, 'shows', 'rss.xml');
      wfTemplateHelper.renderTemplate(template, context, outputFile);
      callback();
    }
  });
}

exports.buildFeeds = buildFeeds;
