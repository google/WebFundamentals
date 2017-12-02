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
 */
const filterTagsToBuild = (tags, docPath) => {
  return tags.filter((tag) => {
    const outputPath = path.join(docPath, tag);
    return !fs.pathExistsSync(outputPath);
  });
};

module.exports = filterTagsToBuild;
