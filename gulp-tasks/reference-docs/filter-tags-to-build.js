/**
 * @fileoverview Filters tags if they exist.
 *
 * @author Matt Gaunt <gauntface@google.com>
 */
'use strict';

const fs = require('fs-extra');
const path = require('path');

/**
 * Given an Array of tags, return an array of tags don't currently have docs
 * already built.
 *
 * @param {Array<string>} tags Array of tags.
 * @param {String} docPath Path where the JSDocs for a tag should be written to.
 * @return {Promise}
 */
const filterTagsToBuild = (tags, docPath) => {
  const tagsToBuild = [];
  return tags.reduce((promiseChain, tag) => {
    return promiseChain
    .then(() => {
      const outputPath = path.join(docPath, tag);
      return fs.pathExists(outputPath);
    })
    .then((exists) => {
      if (!exists) {
        tagsToBuild.push(tag);
      }
    });
  }, Promise.resolve())
  .then(() => tagsToBuild);
};

module.exports = filterTagsToBuild;
