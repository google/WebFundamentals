'use strict';

/*
    wfContributors.js
    Reads the _contributors.yaml file and uses Handlebars to generate the
    primary contributors file and the individual include files.
 */

var fs = require('fs');
var path = require('path');
var jsYaml = require('js-yaml');
var gutil = require('gulp-util');
var Handlebars = require('handlebars');
require('handlebars-helpers')();

var CONTRIBUTORS_FILE = './src/data/_contributors.yaml';
var PHOTO_PATH = './src/content/en/images/contributors/';
var TEMPLATE_LIST = './src/templates/contributors/index.md';
var DEST_LIST = './src/content/en/resources/contributors.md';
var TEMPLATE_INCLUDE = './src/templates/contributors/include.html';
var DEST_INCLUDE = './src/content/en/_shared/contributors/{{key}}.html';
var MISSING_AVATAR = 'is missing a photo, using simple avatar instead.';

function getPhotoForContributor(key) {
  var localImagePath = path.join(PHOTO_PATH, key) + '.jpg';
  try {
    var stat = fs.statSync(localImagePath);
    if (stat.isFile()) {
      return key;
    }
  } catch (ex) {}
  gutil.log('  ', gutil.colors.red(key), MISSING_AVATAR);
  return 'no-photo';
}

function buildIncludes(contributors) {
  gutil.log(' ', 'Building include file for each contributor...');
  var ts = fs.readFileSync(TEMPLATE_INCLUDE, 'utf8');
  var template = Handlebars.compile(ts);
  var keys = Object.keys(contributors);
  keys.forEach(function(key) {
    var contributor = contributors[key];
    contributor.id = key;
    contributor.photo = getPhotoForContributor(key);
    var result = template(contributor);
    fs.writeFileSync(DEST_INCLUDE.replace('{{key}}', key), result);
  });
  gutil.log('  ', 'Built', gutil.colors.magenta(keys.length + ' files'));
}

function buildIndex(contributors) {
  gutil.log(' ', 'Building index file of all contributors...');
  var ts = fs.readFileSync(TEMPLATE_LIST, 'utf8');
  var template = Handlebars.compile(ts);
  var context = {
    contributors: contributors
  };
  var result = template(context);
  fs.writeFileSync(DEST_LIST, result);
}

function getContributors() {
  gutil.log(' ', 'Reading contributors.yaml file...');
  var yamlDoc = fs.readFileSync(CONTRIBUTORS_FILE, 'utf8');
  return jsYaml.safeLoad(yamlDoc);
}

function buildAll() {
  var contributors = getContributors();
  buildIncludes(contributors);
  buildIndex(contributors);
}

exports.build = buildAll;
