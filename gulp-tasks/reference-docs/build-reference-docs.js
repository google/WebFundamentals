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

const buildReferenceDocsForTags = (latestTags, gitUrl, docPath, jsdocConfPath, latestDirName) => {
  // Filter the list down to tags that need to be built
  console.log('latestTags: ', latestTags);
  return filterTagsToBuild(latestTags, docPath)
  .then((tagsToBuild) => {
    console.log('tagsToBuild: ', tagsToBuild);
    return tagsToBuild.reduce((promiseChain, tag) => {
      return promiseChain.then(() => {
        const tmpSrCodePath = path.join(
          os.tmpdir(), Date.now().toString(), tag);
        return getSourceCode(gitUrl, tag, tmpSrCodePath)
        .then(() => {
          const taggedOutputPath = path.join(docPath, tag);
          return buildJSDocs(tmpSrCodePath, taggedOutputPath, jsdocConfPath);
        })
        .then(() => {
          if (tag === latestTags[0]) {
            const latestOutputPath = path.join(docPath, latestDirName);
            fs.removeSync(latestOutputPath);
            return buildJSDocs(tmpSrCodePath, latestOutputPath, jsdocConfPath);
          }
        });
      });
    }, Promise.resolve());
  });
}

/**
 * Builds the stable release tags.
 *
 * @param {string} gitUrl The Github URL.
 * @param {string} docPath Path to place the documentation files (i.e. built
 * JSDocs)
 * @param {string} jsdocConfPath Path to the JSDoc config path/
 */
const buildStableReleases = (gitUrl, docPath, jsdocConfPath) => {
  // Get all of the latest tags from Github
  return getLatestTags.stable(gitUrl)
  .then((tags) => {
    return buildReferenceDocsForTags(tags, gitUrl, docPath, jsdocConfPath, 'latest');
  });
};

/**
 * Builds the prerelease tags.
 *
 * @param {string} gitUrl The Github URL.
 * @param {string} docPath Path to place the documentation files (i.e. built
 * JSDocs)
 * @param {string} jsdocConfPath Path to the JSDoc config path/
 */
const buildPreleases = (gitUrl, docPath, jsdocConfPath) => {
  return getLatestTags.prerelease(gitUrl)
  .then((tags) => {
    return buildReferenceDocsForTags(tags, gitUrl, docPath, jsdocConfPath, 'prerelease');
  });
};

/**
 * Build the reference docs for a project.
 *
 * @param {string} gitUrl The Github URL.
 * @param {string} docPath Path to place the documentation files (i.e. built
 * JSDocs)
 * @param {string} jsdocConfPath Path to the JSDoc config path/
 */
const buildReferenceDocs = (gitUrl, docPath, jsdocConfPath) => {
  return buildStableReleases(gitUrl, docPath, jsdocConfPath)
  .then(() => {
    return buildPreleases(gitUrl, docPath, jsdocConfPath)
  });
};

module.exports = buildReferenceDocs;
