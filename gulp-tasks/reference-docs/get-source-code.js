/**
 * @fileoverview Gets the source code for a particular git tag.
 *
 * @author Matt Gaunt <gauntface@google.com>
 */
'use strict';

const fs = require('fs-extra');
const wfHelper = require('../wfHelper');

/**
 * Get the source code from a tag from a git repo.
 * @param {string} gitUrl URL to git repo.
 * @param {string} tag The tag to get.
 * @param {string} outPath Path to write the source code to
 */
const getSourceCode = (gitUrl, tag, outPath) => {
  fs.ensureDirSync(outPath);

  const args = [
    'clone',
    '--branch', tag,
    '--depth', '1',
    '--config', 'advice.detachedHead=false',
    gitUrl,
    outPath,
  ];
  return wfHelper.promisedExec(`git ${args.join(' ')}`);
};

module.exports = getSourceCode;
