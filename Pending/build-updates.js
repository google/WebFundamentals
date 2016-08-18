'use strict';

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var jsYaml = require('js-yaml');

var ROOT_PATH = './src/content';
var JSYAML_OPTS = {
  lineWidth: 1024
};

var RE_PUBLISHED = /{# wf_published_on: (.*?) #}/;
var RE_DESCRIPTION = /^description: (.*)/m;
var RE_TITLE = /^# (.*) {: .page-title }/m;
var RE_TAGS = /{# wf_tags: (.*?) #}/;
var RE_IMAGE = /{# wf_featured_image: (.*?) #}/;


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

function buildMonth(lang, year, month) {
  var toc = [];
  var sourcePath = path.join(ROOT_PATH, lang, 'updates', year, month);
  var articles = fs.readdirSync(sourcePath);
  articles.forEach(function(file) {
    if (file.endsWith('.md')) {
      var url = '/web/updates/' + year + '/' + month + '/';
      url += file.replace('.md', '');
      var content = fs.readFileSync(path.join(sourcePath, file), 'utf8');
      var title = getRegEx(RE_TITLE, content);
      var published = getRegEx(RE_PUBLISHED, content);
      var article = {
        title: title,
        published: published,
        path: url
      };
      var description = getRegEx(RE_DESCRIPTION, content);
      if (description) {
        article.description = description;
      }
      var tags = getRegEx(RE_TAGS, content);
      if (tags) {
        article.tags = tags.split(',');
      }
      var image = getRegEx(RE_IMAGE, content);
      if (image) {
        article.image = image;
      }
      toc.push(article);
    }
  });
  toc.sort(compareTocDates);
  return toc;
}

function writeToc(articles, title, filename) {
  var toc = [];
  articles.forEach(function(article) {
    var tocItem = {
      title: article.title,
      path: article.path
    };
    toc.push(tocItem);
  });
  var result = {
    toc: [{
      title: title,
      section: toc
    }]
  };
  fs.writeFileSync(filename, jsYaml.dump(result, JSYAML_OPTS));
}

function buildYear(lang, year) {
  var tocs = [];
  var sourcePath = path.join(ROOT_PATH, lang, 'updates', year);
  var months = fs.readdirSync(sourcePath);
  months.forEach(function(month) {
    var fileStat = fs.statSync(path.join(sourcePath, month));
    if (month.length === 2 && fileStat.isDirectory()) {
      var articles = buildMonth(lang, year, month);
      if (articles) {
        var tocFile = path.join(ROOT_PATH, lang, 'updates', year, month, '_toc.yaml');
        var monthName = moment.months()[parseInt(month - 1)];
        writeToc(articles, monthName, tocFile);
        tocs.push(articles);
      }
    }
  });
  console.log(tocs);
}

function go(lang) {
  var sourcePath = path.join(ROOT_PATH, lang, 'updates');
  var years = fs.readdirSync(sourcePath);
  years.forEach(function(year) {
    var fileStat = fs.statSync(path.join(sourcePath, year));
    if (year.length === 4 && year.indexOf(20) === 0 && fileStat.isDirectory()) {
      buildYear(lang, year);
    }
  });
}

go('en');
