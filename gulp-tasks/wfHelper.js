'use strict';

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var moment = require('moment');

var RE_UPDATED = /{# wf_updated_on: (.*?) #}/;
var RE_PUBLISHED = /{# wf_published_on: (.*?) #}/;
var RE_DESCRIPTION = /^description: (.*)/m;
var RE_TITLE = /^# (.*) {: .page-title }/m;
var RE_TAGS = /{# wf_tags: (.*?) #}/;
var RE_IMAGE = /{# wf_featured_image: (.*?) #}/;
var RE_SNIPPET = /{# wf_featured_snippet: (.*?) #}/;
var RE_AUTHOR = /{%[ ]?include "_shared\/contributors\/(.*?)\.html"[ ]?%}/;

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
  return result;
}

function _getFileList(startPath, recursive, filesToIgnore) {
  if (!filesToIgnore) {
    filesToIgnore = [];
  }
  var result = [];
  var files = fs.readdirSync(startPath);
  files.forEach(function(file) {
    if (file.endsWith('.md') && filesToIgnore.indexOf(file) === -1) {
      result.push(readMetadataForFile(path.join(startPath, file)));
    } else if (recursive) {
      var fileStat = fs.statSync(path.join(startPath, file));
      if (fileStat.isDirectory()) {
        result = result.concat(_getFileList(path.join(startPath, file), recursive, filesToIgnore));
      }
    }
  });
  return result;
}

function getFileList(startPath, recursive, filesToIgnore) {
  gutil.log(' ', 'Parsing files in', gutil.colors.cyan(startPath));
  var result = _getFileList(startPath, recursive, filesToIgnore);
  var filename = path.join(startPath, '_files.json');
  fs.writeFileSync(filename, JSON.stringify(result, null, 2));
  return result;
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

exports.getFileList = getFileList;
exports.publishedComparator = publishedComparator;
exports.updatedComparator = updatedComparator;
exports.splitByYear = splitByYear;

