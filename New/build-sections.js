'use strict';

/*
    build-sections.js

    Generates necessary index files, including:
    homepage, tocs, year indexes, RSS and ATOM feeds for updates and showcase
 */

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var Handlebars = require('handlebars');
var handlebarHelpers = require('handlebars-helpers');

var MAX_ARTICLES_ON_HOMEPAGE = 15;
var ROOT_PATH = './src/content/en/';
var RE_PUBLISHED = /{# wf_published_on: (.*?) #}/;
var RE_DESCRIPTION = /^description: (.*)/m;
var RE_TITLE = /^# (.*) {: .page-title }/m;
var RE_TAGS = /{# wf_tags: (.*?) #}/;
var RE_IMAGE = /{# wf_featured_image: (.*?) #}/;
var RE_SNIPPET = /{# wf_featured_snippet: (.*?) #}/;
var RE_AUTHOR = /{%[ ]?include "_shared\/contributors\/(.*?)\.html"[ ]?%}/;

/* Helper functions required for this library */

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

function getRegEx(regEx, content, defaultResponse) {
  var result = content.match(regEx);
  if (result && result[1]) {
    return result[1];
  }
  return defaultResponse;
}

/* Functions that do the work */

function getFileList(startPath) {
  var result = [];
  var files = fs.readdirSync(startPath);
  files.forEach(function(file) {
    if (file !== 'index.md' && file !== '_template.md' && file.endsWith('.md')) {
      result.push(path.join(startPath, file));
    } else {
      var fileStat = fs.statSync(path.join(startPath, file));
      if (fileStat.isDirectory()) {
        result = result.concat(getFileList(path.join(startPath, file)));
      }
    }
  });
  return result;
}

function getMetadata(file, sectionRoot) {
  var result = {};
  var content = fs.readFileSync(file, 'utf8');
  result.title = getRegEx(RE_TITLE, content);
  var url = '/web/';
  if (sectionRoot) {
    url += file.substring(file.indexOf(sectionRoot));
  } else {
    url += file;
  }
  url = url.replace('.md', '');
  result.path = url;
  var description = getRegEx(RE_SNIPPET, content);
  if (!description) {
    description = getRegEx(RE_DESCRIPTION, content);
  }
  result.description = description;
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

function getAllMetadata(fileList, sectionRoot) {
  console.log('Reading metadata for articles...');
  var result = {};
  fileList.forEach(function(file) {
    var article = getMetadata(file, sectionRoot);
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

function generateYearTOCs(metadata, section) {
  console.log('Generating _toc.yaml files...');
  var years = Object.keys(metadata);
  var ts = fs.readFileSync('./src/templates/generated-toc.yaml', 'utf8');
  var template = Handlebars.compile(ts);
  years.forEach(function(year) {
    console.log(' ', year);
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
    var filename = path.join(ROOT_PATH, section, year, '_toc.yaml');
    fs.writeFileSync(filename, template(result));
  });
}

function generateYearIndex(metadata, section, pageTitle) {
  console.log('Generating index.md files...');
  var years = Object.keys(metadata);
  var ts = fs.readFileSync('./src/templates/generated-index-year.md', 'utf8');
  var template = Handlebars.compile(ts);
  years.forEach(function(year) {
    console.log(' ', year);
    var context = {
      section: section,
      pageTitle: pageTitle.replace('{{year}}', year),
      year: year.toString(),
      articles: metadata[year]
    };
    var result = template(context);
    var filename = path.join(ROOT_PATH, section, year, 'index.md');
    fs.writeFileSync(filename, result);
  });
}

function generateHomePage(metadata, section, headerDesc) {
  console.log('Generating Home Page...');
  var years = Object.keys(metadata);
  years.sort();
  var year = years[years.length - 1];
  var forHomePage = metadata[year];
  if (forHomePage.length < MAX_ARTICLES_ON_HOMEPAGE) {
    year = years[years.length - 2];
    forHomePage = forHomePage.concat(metadata[year]);
  }
  if (forHomePage.length > MAX_ARTICLES_ON_HOMEPAGE) {
    forHomePage = forHomePage.slice(0, MAX_ARTICLES_ON_HOMEPAGE);
  }
  var ts = fs.readFileSync('./src/templates/generated-homepage.yaml', 'utf8');
  var template = Handlebars.compile(ts);
  var context = {
    section: section,
    headerDesc: headerDesc,
    articles: forHomePage,
    year: year
  };
  var result = template(context);
  var filename = path.join(ROOT_PATH, section, '_index.yaml');
  fs.writeFileSync(filename, result);
}

function generateATOM(metadata, section) {
  // TODO: NYI
  console.log('Generating ATOM feed... (NYI)');
}

function generateRSS(metadata, section) {
  // TODO: NYI
  console.log('Generating RSS feed... (NYI)');
}

function buildForSection(section, description, title) {
  console.log('Generating supporting files for', section);
  var fileList = getFileList(path.join(ROOT_PATH, section));
  if (fileList.length > 0) {
    var articles = getAllMetadata(fileList, section);
    generateHomePage(articles, section, description);
    generateYearIndex(articles, section, title);
    generateYearTOCs(articles, section);
    generateATOM(articles, section);
    generateRSS(articles, section);
  } else {
    console.log('No files found...');
  }
  console.log('');
}

handlebarHelpers();
var title = 'Updates ({{year}})';
var description = 'Discover the latest API\'s coming to the Web Platform, ';
description += 'find out what the Chrome team are working on and ';
description += 'check out the latest features in DevTools.';
buildForSection('updates', description, title);

title = 'Showcase ({{year}})';
description = 'Learn how other developers have built awesome experiences!';
buildForSection('showcase', description, title);
