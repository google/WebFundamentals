'use strict';

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var jsYaml = require('js-yaml');

var ROOT_PATH = './src/content';

var rePublished = /{# wf_published_on: (.*?) #}/;
var reDescription = /^description: (.*)/m;
var reTitle = /^# (.*) {: .page-title }/m;

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

function buildMonth(lang, year, month) {
  var toc = [];
  var sourcePath = path.join(ROOT_PATH, lang, 'updates', year, month);
  var articles = fs.readdirSync(sourcePath);
  articles.forEach(function(file) {
    if (file.endsWith('.md')) {
      var url = '/web/updates/' + year + '/' + month + '/' + file.replace('.md', '');
      file = path.join(sourcePath, file);
      var content = fs.readFileSync(file, 'utf8');
      var title = content.match(reTitle);
      var published = content.match(rePublished);
      var description = content.match(reDescription);
      var tocItem = {
        title: title[1],
        path: url
      };
      toc.push(tocItem);
    }
  });
  if (toc.length === 0) {
    return;
  }
  var monthName = moment.months()[parseInt(month - 1)];
  var result = {
    toc: [{
      title: monthName,
      section: toc
    }]
  };
  var tocFile = path.join(ROOT_PATH, lang, 'updates', year, month, '_toc.yaml');
  fs.writeFileSync(tocFile, jsYaml.safeDump(result));
  return tocFile;
}

function buildYear(lang, year) {
  var tocs = [];
  var sourcePath = path.join(ROOT_PATH, lang, 'updates', year);
  var months = fs.readdirSync(sourcePath);
  months.forEach(function(month) {
    var fileStat = fs.statSync(path.join(sourcePath, month));
    if (month.length === 2 && fileStat.isDirectory()) {
      var toc = buildMonth(lang, year, month);
      if (toc) {
        tocs.push(toc);
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
