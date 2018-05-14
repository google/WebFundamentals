/**
 * @fileoverview Reads the _contributors.yaml file and uses Handlebars to
 *  generate the primary contributors file and the individual include files.
 *  It also takes care of generating individual contributions pages.
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const path = require('path');
const fs = require('fs-extra');
const jsYaml = require('js-yaml');
const gutil = require('gulp-util');
const wfHelper = require('./wfHelper');
const wfTemplateHelper = require('./wfTemplateHelper');

const CONTRIBUTORS_FILE = './src/data/_contributors.yaml';
const PHOTO_PATH = './src/content/en/images/contributors/';
const TEMPLATE_LIST = './src/templates/contributors/index.md';
const DEST_LIST = './src/content/en/resources/contributors/index.md';
const TEMPLATE_INCLUDE = './src/templates/contributors/include.html';
const DEST_INCLUDE = './src/content/en/_shared/contributors/{{key}}.html';
const TEMPLATE_ARTICLE_LIST = './src/templates/contributors/article-list.md';
const DEST_ARTICLE_LIST = './src/content/en/resources/contributors/{{key}}.md';
const MISSING_AVATAR = 'is missing a photo, using simple avatar instead.';

/**
 * Parses & normalizes a markdown file.
 *
 * @param {string} key The key identifying the user
 * @return {string} filename to use
 */
function getPhotoForContributor(key) {
  const localImagePath = path.join(PHOTO_PATH, key) + '.jpg';
  try {
    const stat = fs.statSync(localImagePath);
    if (stat.isFile()) {
      return key;
    }
  } catch (ex) {
    // do nothing
  }
  gutil.log('  ', gutil.colors.red(key), MISSING_AVATAR);
  return 'no-photo';
}

/**
 * Loop through each contributor and render include file for each person.
 *
 * @param {Array} contributors The list of contributors
 */
function buildIncludes(contributors) {
  gutil.log(' ', 'Building include file for each contributor...');
  const keys = Object.keys(contributors);
  keys.forEach(function(key) {
    let contributor = contributors[key];
    contributor.id = key;
    contributor.photo = getPhotoForContributor(key);
    const dest = DEST_INCLUDE.replace('{{key}}', key);
    wfTemplateHelper.renderTemplate(TEMPLATE_INCLUDE, contributor, dest);
  });
  gutil.log('  ', 'Built', gutil.colors.magenta(keys.length + ' files'));
}

/**
 * Build the index file for all contributors.
 *
 * @param {Array} contributors The list of contributors.
 */
function buildIndex(contributors) {
  gutil.log(' ', 'Building index file of all contributors...');
  const context = {contributors: contributors};
  wfTemplateHelper.renderTemplate(TEMPLATE_LIST, context, DEST_LIST);
}

/**
 * Loop through each contributor and render individaul contribution index.
 *
 * @param {Array} contributors The list of contributors
 */
function buildIndividualPages(contributors) {
  gutil.log(' ', 'Building individual pages of all contributors...');
  const files = wfHelper.getFileList(global.WF.src.content, ['**/*.md']);
  const filesByAuthor = wfHelper.splitByAuthor(files);
  const keys = Object.keys(contributors);
  keys.forEach(function(key) {
    if (!(key in filesByAuthor)) {
      return;
    }
    const contributor = contributors[key];
    filesByAuthor[key].sort(wfHelper.publishedComparator);
    const context = {
      id: key,
      contributor: contributor,
      articles: filesByAuthor[key],
    };
    const dest = DEST_ARTICLE_LIST.replace('{{key}}', key);
    wfTemplateHelper.renderTemplate(TEMPLATE_ARTICLE_LIST, context, dest);
  });
}

/**
 * Reads the contributors file and parses it from YAML to JSON.
 *
 * @return {Array} The list of contributors
 */
function getContributors() {
  gutil.log(' ', 'Reading contributors.yaml file...');
  const yamlDoc = fs.readFileSync(CONTRIBUTORS_FILE, 'utf8');
  return jsYaml.safeLoad(yamlDoc);
}

/**
 * Build all of the necessary contributors files.
 *
 */
function buildAll() {
  const contributors = getContributors();
  buildIncludes(contributors);
  buildIndex(contributors);
  buildIndividualPages(contributors);
}

exports.build = buildAll;
