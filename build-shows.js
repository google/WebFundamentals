'use strict';

/*
    build-sections.js

    Generates necessary index files, including:
    homepage, tocs, year indexes, RSS and ATOM feeds for updates and showcase
 */

var fs = require('fs');
var slug = require('slug');
var path = require('path');
var mkdirp = require('mkdirp');
var moment = require('moment');
var google = require('googleapis');
var Handlebars = require('handlebars');
require('handlebars-helpers')();

var ROOT_PATH = './src/content/en/shows/';

var apiKey = fs.readFileSync('./src/data/youtubeAPIKey.txt', 'utf8');
var youtube = google.youtube({version: 'v3', auth: apiKey});
var showList = fs.readFileSync('./src/data/shows.json', 'utf8');
showList = JSON.parse(showList);

function compareSnippetDates(a, b) {
  var aPublished = moment(a.snippet.publishedAt).unix();
  var bPublished = moment(b.snippet.publishedAt).unix();
  if (aPublished < bPublished) {
    return 1;
  } else if (aPublished > bPublished) {
    return -1;
  }
  return 0;
}

function getVideosForPlaylist(opts, videos, callback) {
  if (!videos) { videos = []; }
  opts.maxResults = 50;
  opts.part = 'id,snippet';
  youtube.playlistItems.list(opts, function(err, result) {
    if (err) {
      callback(err, videos);
      return;
    }
    videos = videos.concat(result.items);
    if (result.nextPageToken) {
      opts.pageToken = result.nextPageToken;
      getVideosForPlaylist(opts, videos, callback);
    } else {
      callback(null, videos);
    }
  });
}

function writeShowTOC(show, shows) {
  var ts = fs.readFileSync('./src/templates/shows/toc.yaml', 'utf8');
  var template = Handlebars.compile(ts);
  var context = {
    title: show.title,
    path: show.path,
    shows: shows
  };
  var result = template(context);
  mkdirp.sync(path.join(ROOT_PATH, show.path));
  var filename = path.join(ROOT_PATH, show.path, '_toc.yaml');
  fs.writeFileSync(filename, result);
}

function writeShowListing(show, shows) {
  var ts = fs.readFileSync('./src/templates/shows/episode-index.md', 'utf8');
  var template = Handlebars.compile(ts);
  var context = {
    title: show.title,
    path: show.path,
    shows: shows
  };
  var result = template(context);
  mkdirp.sync(path.join(ROOT_PATH, show.path));
  var filename = path.join(ROOT_PATH, show.path, 'index.md');
  fs.writeFileSync(filename, result);
}

function writeEpisode(show, episode, template) {
  var result = template(episode);
  mkdirp.sync(path.join(ROOT_PATH, show.path));
  var filename = path.join(ROOT_PATH, show.path, episode.slugified) + '.md';
  try {
    fs.writeFileSync(filename, result, {flag: 'wx'});
  } catch (ex) {
    console.log('Skipping: File already exists', filename);
  }
}

function buildFilesForShow(show, shows) {
  console.log('Building files for:', show.title);
  shows.sort(compareSnippetDates);
  var ts = fs.readFileSync('./src/templates/shows/episode.md', 'utf8');
  var template = Handlebars.compile(ts);
  shows.forEach(function(episode) {
    var slugified = slug(episode.snippet.title).toLowerCase();
    episode.slugified = slugified;
    episode.path = 'shows/' + show.path + '/' + slugified;
    writeEpisode(show, episode, template);
  });
  writeShowTOC(show, shows);
  writeShowListing(show, shows);
}

function createShow(show) {
  var requestObj = {
    playlistId: show.playlistId
  };
  getVideosForPlaylist(requestObj, null, function(err, shows) {
    if (err) {
      console.log('failed for show', show);
      return;
    }
    buildFilesForShow(show, shows);
  });
}

showList.forEach(function(show) {
  if (show.skip !== true) {
    createShow(show);
  }
});

