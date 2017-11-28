'use strict';

const path = require('path');
const os = require('os');
const fs = require('fs-extra');

const getLatestTags = require('./get-latest-tags');
const filterTagsToBuild = require('./filter-tags-to-build');
const getSourceCode = require('./get-source-code');
const buildJSDocs = require('./build-js-docs');

const buildReferenceDocs = (gitUrl, docPath, jsdocConfPath) => {
  // Get all of the latest tags from Github
  let latestTags;
  return getLatestTags(gitUrl)
  .then((tags) => {
    latestTags = tags;
    // Filter the list down to tags that need to be built
    return filterTagsToBuild(latestTags, docPath);
  })
  .then((tagsToBuild) => {
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
            const latestOutputPath = path.join(docPath, 'latest');
            fs.removeSync(latestOutputPath);
            return buildJSDocs(tmpSrCodePath, latestOutputPath, jsdocConfPath);
          }
        });
      });
    }, Promise.resolve());
  });
};

module.exports = buildReferenceDocs;
