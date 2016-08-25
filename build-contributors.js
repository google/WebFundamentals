'use strict';

/*
    build-contributors.js

    Reads the _contributors.yaml file and uses Handlebars to generate the
    primary contributors file and the individual include files.
 */

var fs = require('fs');
var path = require('path');
var jsYaml = require('js-yaml');
var Handlebars = require('handlebars');
var handlebarHelpers = require('handlebars-helpers');

var PHOTO_PATH = './src/content/en/images/contributors/';

function getPhotoForContributor(key) {
  var localImagePath = path.join(PHOTO_PATH, key) + '.jpg';
  try {
    var stat = fs.statSync(localImagePath);
    if (stat.isFile()) {
      return key;
    }
  } catch (ex) {}
  console.log(key, 'is missing a photo, using simple avatar instead.');
  return 'no-photo';
}

function buildIncludes(contributors) {
  var ts = fs.readFileSync('./src/templates/contributors/include.html', 'utf8');
  var template = Handlebars.compile(ts);
  var keys = Object.keys(contributors);
  keys.forEach(function(key) {
    var contributor = contributors[key];
    contributor.id = key;
    contributor.photo = getPhotoForContributor(key);
    var result = template(contributor);
    var filename = './src/content/en/_shared/contributors/';
    filename += key + '.html';
    fs.writeFileSync(filename, result);
  });
}

function buildIndex(contributors) {
  var ts = fs.readFileSync('./src/templates/contributors/index.md', 'utf8');
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

