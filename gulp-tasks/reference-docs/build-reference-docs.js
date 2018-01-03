/**
 * @fileoverview Helper function that gets all tags, filters out
 * built tags, downloads the remaining tags from git and then builds the
 * JSDocs for that tag.
 *
 * @author Matt Gaunt <gauntface@google.com>
 */
'use strict';

const path = require('path');
const os = require('os');
const fs = require('fs-extra');

const getLatestTags = require('./get-latest-tags');
const filterTagsToBuild = require('./filter-tags-to-build');
const getSourceCode = require('./get-source-code');
const buildJSDocs = require('./build-js-docs');

/**
 * Given a set of tags - Loop through each one and build the docs if needed.
 *
 * @param {Array<string>} latestTags The array of Git tags to build.
 * @param {string} gitUrl The URL of the Git repo to get tags from.
 * @param {string} docPath The path to write the docs to.
 * @param {string} jsdocConfPath The path to the JSDoc config file.
 * @param {string} latestDirName The name to use for a copy of the most up
 * to date docs. For stable releases this would be 'latest', for prereleases
 * it's 'prerelease'.
 * @return {Promise}
 */
const buildReferenceDocsForTags =
  (latestTags, gitUrl, docPath, jsdocConfPath, latestDirName) => {
  // Filter the list down to tags that need to be built
  return filterTagsToBuild(latestTags, docPath)
  .then((tagsToBuild) => {
    return tagsToBuild.reduce((promiseChain, tag) => {
      return promiseChain.then(() => {
        const tmpSrCodePath = path.join(
          os.tmpdir(), Date.now().toString(), tag);
        return getSourceCode(gitUrl, tag, tmpSrCodePath)
        .then(() => {
          const taggedOutputPath = path.join(docPath, tag);
          return buildJSDocs(tag, tmpSrCodePath, taggedOutputPath, jsdocConfPath);
        })
        .then(() => {
          if (tag === latestTags[0]) {
            const latestOutputPath = path.join(docPath, latestDirName);
            fs.removeSync(latestOutputPath);
            return buildJSDocs(tag, tmpSrCodePath, latestOutputPath, jsdocConfPath);
          }
        });
      });
    }, Promise.resolve());
  });
};

/**
 * Builds the stable release tags.
 *
 * @param {string} gitUrl The Github URL.
 * @param {string} docPath Path to place the documentation files (i.e. built
 * JSDocs)
 * @param {string} jsdocConfPath Path to the JSDoc config path/
 * @return {Promise}
 */
const buildStableReleases = (gitUrl, docPath, jsdocConfPath) => {
  // Get all of the latest tags from Github
  return getLatestTags.stable(gitUrl)
  .then((tags) => {
    return buildReferenceDocsForTags(
      tags, gitUrl, docPath, jsdocConfPath, 'latest');
  });
};

/**
 * Builds the prerelease tags.
 *
 * @param {string} gitUrl The Github URL.
 * @param {string} docPath Path to place the documentation files (i.e. built
 * JSDocs)
 * @param {string} jsdocConfPath Path to the JSDoc config path/
 * @return {Promise}
 */
const buildPreleases = (gitUrl, docPath, jsdocConfPath) => {
  return getLatestTags.prerelease(gitUrl)
  .then((tags) => {
    return buildReferenceDocsForTags(
      tags, gitUrl, docPath, jsdocConfPath, 'prerelease');
  });
};

/**
 * Build the reference docs for a project.
 *
 * @param {string} gitUrl The Github URL.
 * @param {string} docPath Path to place the documentation files (i.e. built
 * JSDocs)
 * @param {string} jsdocConfPath Path to the JSDoc config path/
 * @return {Promise}
 */
const buildReferenceDocs = (gitUrl, docPath, jsdocConfPath) => {
  return buildStableReleases(gitUrl, docPath, jsdocConfPath)
  .then(() => {
    return buildPreleases(gitUrl, docPath, jsdocConfPath);
  });
};

module.exports = buildReferenceDocs;
