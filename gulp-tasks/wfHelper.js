'use strict';

/*
    wfHelper.js
    TODO
 */

var fs = require('fs');
var glob = require('globule');
var moment = require('moment');

var STD_EXCLUDES = ['!**/_generated.md', '!**/_template.md'];
var RE_UPDATED = /{# wf_updated_on: (.*?) #}/;
var RE_PUBLISHED = /{# wf_published_on: (.*?) #}/;
var RE_DESCRIPTION = /^description: (.*)/m;
var RE_TITLE = /^# (.*) {: .page-title }/m;
var RE_TAGS = /{# wf_tags: (.*?) #}/;
var RE_IMAGE = /{# wf_featured_image: (.*?) #}/;
var RE_SNIPPET = /{# wf_featured_snippet: (.*?) #}/;
var RE_AUTHOR = /{%[ ]?include "web\/_shared\/contributors\/(.*?)\.html"[ ]?%}/;
var RE_PODCAST = /{# wf_podcast_audio: (.*?) #}/;
var RE_PODCAST_DURATION = /{# wf_podcast_duration: (.*?) #}/;
var RE_PODCAST_SUBTITLE = /{# wf_podcast_subtitle: (.*?) #}/;
var RE_PODCAST_SIZE = /{# wf_podcast_fileSize: (.*?) #}/;

if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
  });
}

function publishedComparator(a, b) {
  var aPublished = moment(a.datePublished).unix();
  var bPublished = moment(b.datePublished).unix();
  if (aPublished < bPublished) {
    return 1;
  } else if (aPublished > bPublished) {
    return -1;
  }
  return 0;
}

function updatedComparator(a, b) {
  var aPublished = moment(a.dateUpdated).unix();
  var bPublished = moment(b.dateUpdated).unix();
  if (aPublished < bPublished) {
    return 1;
  } else if (aPublished > bPublished) {
    return -1;
  }
  return 0;
}

function getRegEx(regEx, content, defaultResponse) {
  var result = content.match(regEx);
  if (result && result[1]) {
    return result[1];
  }
  return defaultResponse;
}

function readMetadataForFile(file) {
  var content = fs.readFileSync(file, 'utf8');
  var description = getRegEx(RE_SNIPPET, content);
  if (!description) {
    description = getRegEx(RE_DESCRIPTION, content);
  }
  var published = moment(getRegEx(RE_PUBLISHED, content));
  var updated = moment(getRegEx(RE_UPDATED, content));
  var url = file.replace('src/content/en/', '/web/');
  url = url.replace('.md', '');
  var result = {
    filePath: file,
    url: url,
    title: getRegEx(RE_TITLE, content),
    description: description,
    authors: [getRegEx(RE_AUTHOR, content)],
    image: getRegEx(RE_IMAGE, content),
    datePublished: published.format(),
    datePublishedPretty: published.format('dddd, MMMM Do YYYY'),
    yearPublished: published.format('YYYY'),
    dateUpdated: updated.format(),
    tags: []
  };
  var tags = getRegEx(RE_TAGS, content);
  if (tags) {
    result.tags = tags.split(',');
  }
  var podcast = getRegEx(RE_PODCAST, content);
  if (podcast) {
    result.podcast = {
      audioUrl: podcast,
      duration: getRegEx(RE_PODCAST_DURATION, content),
      subtitle: getRegEx(RE_PODCAST_SUBTITLE, content),
      fileSize: getRegEx(RE_PODCAST_SIZE, content),
      pubDate: published.format('DD MMM YYYY HH:mm:ss [GMT]')
    };
  }
  return result;
}

function getFileList(base, patterns) {
  var results = [];
  var opts = {
    srcBase: base,
    prefixBase: true
  };
  var files = glob.find(patterns, STD_EXCLUDES, opts);
  files.forEach(function(file) {
    results.push(readMetadataForFile(file));
  });
  // var filename = path.join(base, '_files.json');
  // fs.writeFileSync(filename, JSON.stringify(results, null, 2));
  return results;
}

function splitByYear(files) {
  var result = {};
  files.forEach(function(file) {
    var year = file.yearPublished;
    if (!result[year]) {
      result[year] = [];
    }
    result[year].push(file);
  });
  return result;
}

exports.getRegEx = getRegEx;
exports.getFileList = getFileList;
exports.publishedComparator = publishedComparator;
exports.updatedComparator = updatedComparator;
exports.splitByYear = splitByYear;

