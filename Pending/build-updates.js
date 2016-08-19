'use strict';

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var jsYaml = require('js-yaml');
var Handlebars = require('handlebars');

var ROOT_PATH = './src/content';
var JSYAML_OPTS = {
  lineWidth: 1024
};

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

function compareInclude(a, b) {
  if (a.include < b.include) {
    return 1;
  } else if (a.include > b.include) {
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
      var author = getRegEx(RE_AUTHOR, content);
      var article = {
        title: title,
        published: published,
        author: author,
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

function writeYearToc(includes, year, tocFile) {
  includes.sort(compareInclude);
  var result = {
    toc: [{
      title: year.toString(),
      section: includes
    }]
  };
  fs.writeFileSync(tocFile, jsYaml.dump(result, JSYAML_OPTS));
}

function writeYearIndex(articles, year) {
  var ts = fs.readFileSync('./src/templates/updates-index-year.md', 'utf8');
  var template = Handlebars.compile(ts);
  articles.sort(compareTocDates);
  var context = {
    year: year.toString(),
    articles: articles
  };
  var lang = 'en';
  var result = template(context);
  var filename = path.join(ROOT_PATH, lang, 'updates', year, 'index.md');
  fs.writeFileSync(filename, result);
}

function buildYear(lang, year) {
  var tocFile;
  var yearToc = [];
  var abc = [];
  var sourcePath = path.join(ROOT_PATH, lang, 'updates', year);
  var months = fs.readdirSync(sourcePath);
  months.forEach(function(month) {
    var fileStat = fs.statSync(path.join(sourcePath, month));
    if (month.length === 2 && fileStat.isDirectory()) {
      var articles = buildMonth(lang, year, month);
      if (articles) {
        tocFile = path.join(ROOT_PATH, lang, 'updates', year, month, '_toc.yaml');
        var monthName = moment.months()[parseInt(month - 1)];
        writeToc(articles, monthName, tocFile);
        var x = '/web/updates/' + year + '/' + month + '/_toc.yaml';
        yearToc.push({include: x});
        abc = abc.concat(articles);
      }
    }
  });
  tocFile = path.join(ROOT_PATH, lang, 'updates', year, '_toc.yaml');
  writeYearToc(yearToc, year, tocFile);
  writeYearIndex(abc, year);
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

var authorYaml = fs.readFileSync('./src/data/_contributors.yaml', 'utf8');
authorYaml = jsYaml.safeLoad(authorYaml);
Handlebars.registerHelper('authorName', function(person) {
  var author = authorYaml[person];
  if (author) {
    return author.name.given + ' ' + author.name.family;
  }
  return '';
});
Handlebars.registerHelper('momentFormat', function(d) {
  var m = moment(d);
  return m.format('dddd, MMMM Do YYYY');
});

go('en');
