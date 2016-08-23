'use strict';

/*
    build-contributors.js

    Reads the _contributors.yaml file and uses Handlebars to generate the
    primary contributors file and the individual include files.
 */

var fs = require('fs');
var jsYaml = require('js-yaml');
var Handlebars = require('handlebars');
var handlebarHelpers = require('handlebars-helpers');

function buildIncludes(contributors) {
  var ts = fs.readFileSync('./src/templates/contributor-include.html', 'utf8');
  var template = Handlebars.compile(ts);
  var keys = Object.keys(contributors);
  keys.forEach(function(key) {
    var contributor = contributors[key];
    contributor.id = key;
    var result = template(contributor);
    var filename = './src/content/en/_shared/contributors/';
    filename += key + '.html';
    fs.writeFileSync(filename, result);
  });
}

function buildIndex(contributors) {
  var ts = fs.readFileSync('./src/templates/contributor-index.md', 'utf8');
  var template = Handlebars.compile(ts);
  var context = {
    contributors: contributors
  };
  var result = template(context);
  var filename = './src/content/en/resources/contributors.md';
  fs.writeFileSync(filename, result);
}

function getContributors() {
  var yamlDoc = fs.readFileSync('./src/data/_contributors.yaml', 'utf8');
  return jsYaml.safeLoad(yamlDoc);
}

handlebarHelpers();
var contributors = getContributors();
buildIncludes(contributors);
buildIndex(contributors);

