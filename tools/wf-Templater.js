'use strict';

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var jsYaml = require('js-yaml');
var Handlebars = require('handlebars');
require('handlebars-helpers')();

var SOURCE_ROOT = './src/content/en/';
var TEMPLATE_ROOT = './src/templates/';

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

function renderTemplate(templateFile, context, outputFile) {
  var ts = fs.readFileSync(templateFile, 'utf8');
  var template = Handlebars.compile(ts);
  var result = template(context);
  fs.writeFileSync(outputFile, result);
}

function generateIndex(section, articles) {
  var context = {
    section: section,
    articles: articles,
  };
  var template = path.join(TEMPLATE_ROOT, section, '_index.yaml');
  var outputFile = path.join(SOURCE_ROOT, section, '_index.yaml');
  renderTemplate(template, context, outputFile);
}

function generateRSS(section, description, articles) {
  var yamlCont = fs.readFileSync('./src/data/_contributors.yaml', 'utf8');
  var contributors = jsYaml.safeLoad(yamlCont);
  var context = {
    section: section,
    description: description,
    pubDate: '',
    articles: articles.slice(0, 5),
    contributors: contributors
  };
  var template = path.join(TEMPLATE_ROOT,  'rss.xml');
  var outputFile = path.join(SOURCE_ROOT, section, 'rss.xml');
  renderTemplate(template, context, outputFile);
}

function generateATOM(section, description, articles) {
  var yamlCont = fs.readFileSync('./src/data/_contributors.yaml', 'utf8');
  var contributors = jsYaml.safeLoad(yamlCont);
  var context = {
    section: section,
    description: description,
    pubDate: '',
    articles: articles.slice(0, 5),
    contributors: contributors
  };
  var template = path.join(TEMPLATE_ROOT, 'atom.xml');
  var outputFile = path.join(SOURCE_ROOT, section, 'atom.xml');
  renderTemplate(template, context, outputFile);
}

exports.generateIndex = generateIndex;
exports.generateRSS = generateRSS;
exports.generateATOM = generateATOM;
