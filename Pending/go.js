'use strict';

/*
    build-contributors.js

    Reads the _contributors.yaml file and uses Handlebars to generate the
    primary contributors file and the individual include files.
 */

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var Handlebars = require('handlebars');

var MAX_ARTICLES_ON_HOMEPAGE = 15;
var ROOT_PATH = './src/content';
var RE_PUBLISHED = /{# wf_published_on: (.*?) #}/;
var RE_DESCRIPTION = /^description: (.*)/m;
var RE_TITLE = /^# (.*) {: .page-title }/m;
var RE_TAGS = /{# wf_tags: (.*?) #}/;
var RE_IMAGE = /{# wf_featured_image: (.*?) #}/;
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

function getRegEx(regEx, content, defaultResponse) {
  var result = content.match(regEx);
  if (result && result[1]) {
    return result[1];
  }
  return defaultResponse;
}

function getListOfUpdates(sourcePath) {
  var result = [];
  var files = fs.readdirSync(sourcePath);
  files.forEach(function(file) {
    if (file !== 'index.md' && file.endsWith('.md')) {
      result.push(path.join(sourcePath, file));
    } else {
      var fileStat = fs.statSync(path.join(sourcePath, file));
      if (fileStat.isDirectory()) {
        result = result.concat(getListOfUpdates(path.join(sourcePath, file)));
      }
    }
  });
  return result;
}

function getMetadata(file) {
  var result = {};
  var content = fs.readFileSync(file, 'utf8');
  result.title = getRegEx(RE_TITLE, content);
  var url = '/web' + file.substring(file.indexOf('/updates'));
  url = url.replace('.md', '');
  result.path = url;
  result.description = getRegEx(RE_DESCRIPTION, content);
  result.author = getRegEx(RE_AUTHOR, content);
  result.image = getRegEx(RE_IMAGE, content);
  var published = moment(getRegEx(RE_PUBLISHED, content));
  result.published = published.format('YYYY-MM-DD');
  result.publishedYear = published.format('YYYY');
  result.publishedMonth = published.format('MM');
  var tags = getRegEx(RE_TAGS, content);
  if (tags) {
    result.tags = tags.split(',');
  } else {
    result.tags = [];
  }
  return result;
}

function compareTocDates(a, b) {
  var aPublished = moment(a.published);
  var bPublished = moment(b.published);
  if (aPublished < bPublished) {
    return 1;
  } else if (aPublished > bPublished) {
    return -1;
  }
  return 0;
}

function getAllMetadata(fileList) {
  var result = {};
  fileList.forEach(function(file) {
    var article = getMetadata(file);
    if (!result[article.publishedYear]) {
      result[article.publishedYear] = [];
    }
    result[article.publishedYear].push(article);
  });
  var keys = Object.keys(result);
  keys.forEach(function(key) {
    result[key].sort(compareTocDates);
  });
  return result;
}

function generateYearTOCs(metadata) {
  var years = Object.keys(metadata);
  var ts = fs.readFileSync('./src/templates/updates-toc.yaml', 'utf8');
  var template = Handlebars.compile(ts);
  years.forEach(function(year) {
    var result = {
      year: year,
      months: {}
    };
    metadata[year].forEach(function(article) {
      var month = moment.months()[parseInt(article.publishedMonth) - 1];
      if (!result.months[month]) {
        result.months[month] = [];
      }
      result.months[month].push(article);
    });
    var filename = path.join('./src/content/en/updates/', year, '_toc.yaml');
    fs.writeFileSync(filename, template(result));
  });
}

function generateYearIndex(metadata) {
  var years = Object.keys(metadata);
  var ts = fs.readFileSync('./src/templates/updates-index-year.md', 'utf8');
  var template = Handlebars.compile(ts);
  years.forEach(function(year) {
    var context = {
      year: year.toString(),
      articles: metadata[year]
    };
    var result = template(context);
    var filename = path.join('./src/content/en/updates/', year, 'index.md');
    fs.writeFileSync(filename, result);
  });
}

function generateHomePage(metadata) {
  var years = Object.keys(metadata);
  years.sort();
  var year = years[years.length - 1];
  var forHomePage = [];
  if (metadata[year].length > MAX_ARTICLES_ON_HOMEPAGE) {
    forHomePage = metadata[year].slice(0, MAX_ARTICLES_ON_HOMEPAGE);
  }
  var ts = fs.readFileSync('./src/templates/updates-homepage.yaml', 'utf8');
  var template = Handlebars.compile(ts);
  var context = {
    articles: forHomePage,
    currentYear: year
  };
  var result = template(context);
  var filename = './src/content/en/updates/_index.yaml';
  fs.writeFileSync(filename, result);
}

var lang = 'en';
var fileList = getListOfUpdates(path.join(ROOT_PATH, lang, 'updates'));
var articles = getAllMetadata(fileList);
generateHomePage(articles);
generateYearIndex(articles);
generateYearTOCs(articles);
