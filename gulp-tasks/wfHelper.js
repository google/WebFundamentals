'use strict';

/*
    wfHelper.js
    TODO
 */

var fs = require('fs');
var glob = require('globule');
var moment = require('moment');
var wfRegEx = require('./wfRegEx');

var STD_EXCLUDES = ['!**/_generated.md', '!**/_template.md'];

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

function genericComparator(a, b) {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  }
  return 0;
}

function publishedComparator(a, b) {
  var aPublished = moment(a.datePublished).unix();
  var bPublished = moment(b.datePublished).unix();
  if (aPublished === bPublished) {
    aPublished = a.title;
    bPublished = b.title;
  }
  return genericComparator(aPublished, bPublished);
}

function updatedComparator(a, b) {
  var aPublished = moment(a.dateUpdated).unix();
  var bPublished = moment(b.dateUpdated).unix();
  if (aPublished === bPublished) {
    aPublished = a.title;
    bPublished = b.title;
  }
  return genericComparator(aPublished, bPublished);
}

function getRegEx(regEx, content, defaultResponse) {
  console.log('WARN: wfHelper.getRegEx is deprecated');
  var result = content.match(regEx);
  if (result && result[1]) {
    return result[1];
  }
  return defaultResponse;
}

function readMetadataForFile(file) {
  var content = fs.readFileSync(file, 'utf8');
  if (content.match(wfRegEx.RE_MD_INCLUDE)) {
    return null;
  }
  var description = wfRegEx.getMatch(wfRegEx.RE_SNIPPET, content);
  if (!description) {
    description = wfRegEx.getMatch(wfRegEx.RE_DESCRIPTION, content);
  }
  var published = moment(wfRegEx.getMatch(wfRegEx.RE_PUBLISHED_ON, content));
  var updated = moment(wfRegEx.getMatch(wfRegEx.RE_UPDATED_ON, content));
  var url = file.replace('src/content/en/', '/web/');
  url = url.replace('.md', '');
  var result = {
    filePath: file,
    url: url,
    title: wfRegEx.getMatch(wfRegEx.RE_TITLE, content),
    description: description,
    authors: [],
    image: wfRegEx.getMatch(wfRegEx.RE_IMAGE, content),
    datePublished: published.format(),
    datePublishedPretty: published.format('dddd, MMMM Do YYYY'),
    yearPublished: published.format('YYYY'),
    dateUpdated: updated.format(),
    tags: []
  };
  var authorList = content.match(wfRegEx.RE_AUTHOR_LIST);
  if (authorList) {
    authorList.forEach(function(contributor) {
      var author = wfRegEx.getMatch(wfRegEx.RE_AUTHOR_KEY, contributor).trim();
      result.authors.push(author);
    });
  }
  var tags = wfRegEx.getMatch(wfRegEx.RE_TAGS, content);
  if (tags) {
    result.tags = [];
    tags.split(',').forEach(function(tag) {
      tag = tag.trim();
      if (tag.length > 0) {
        result.tags.push(tag.trim());
      }
    });
  }
  var podcast = wfRegEx.getMatch(wfRegEx.RE_PODCAST, content);
  if (podcast) {
    result.podcast = {
      audioUrl: podcast,
      duration: wfRegEx.getMatch(wfRegEx.RE_PODCAST_DURATION, content),
      subtitle: wfRegEx.getMatch(wfRegEx.RE_PODCAST_SUBTITLE, content),
      fileSize: wfRegEx.getMatch(wfRegEx.RE_PODCAST_SIZE, content),
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
    var metaData = readMetadataForFile(file);
    if (metaData) {
      results.push(metaData);
    }
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

