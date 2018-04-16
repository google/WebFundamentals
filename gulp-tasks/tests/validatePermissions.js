/**
 * @fileoverview Validates the permissions on a file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const fs = require('fs');

/**
 * Checks the permissions on a file to ensure no -x- executable files.
 *
 * @param {string} filename The name of the file to be tested
 * @return {boolean} TRUE if the file is OK, FALSE if it has bad permissions.
 */
function test(filename) {
  try {
    const stats = fs.statSync(filename);
    const mode = stats.mode || 0;
    if ((mode & 0o0001) || (mode & 0o0010) || (mode & 0o0100)) {
      return false;
    }
  } catch (ex) {
    // Unable to get stats for file, ignore this result.
  }
  return true;
}

exports.test = test;
