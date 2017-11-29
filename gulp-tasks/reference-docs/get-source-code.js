/**
 * @fileoverview Gets the source code for a particular git tag.
 *
 * @author Matt Gaunt <gauntface@google.com>
 */
'use strict';

const fs = require('fs-extra');
const wfHelper = require('../wfHelper');

const getSourceCode = (gitUrl, tag, tmpPath) => {
  fs.ensureDirSync(tmpPath);

  const args = [
    'clone',
    '--branch', tag,
    '--depth', '1',
    '--config', 'advice.detachedHead=false',
    gitUrl,
    tmpPath,
  ];
  return wfHelper.promisedExec(`git ${args.join(' ')}`);
};

module.exports = getSourceCode;
