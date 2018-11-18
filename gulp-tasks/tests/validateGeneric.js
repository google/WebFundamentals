/**
 * @fileoverview Validates a generic file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const path = require('path');

const PERMITTED_EXTENSIONS = [];
const PERMITTED_NOT_TESTED_EXTENSIONS = ['.conf'];
/**
 * Tests a JSON file
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function test(filename, contents) {
  const filenameObj = path.parse(filename.toLowerCase());
  const result = {
    level: 'WARNING',
    filename: filename,
    message: 'No tests found for file type, was not tested.',
  };
  if (PERMITTED_NOT_TESTED_EXTENSIONS.indexOf(filenameObj.ext) >= 0) {
    return Promise.reject(result);
  }
  if (PERMITTED_EXTENSIONS.indexOf(filenameObj.ext) == -1) {
    result.level = 'ERROR';
    result.message = `'${filenameObj.ext}' are NOT allowed on DevSite.`;
  }
  return Promise.reject(result);
}

exports.test = test;
