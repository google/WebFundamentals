/**
 * @fileoverview Inspects media files.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const fs = require('fs');

const MAX_FILE_SIZE_WARN = 500; // Max file size (in kB) before warning
const MAX_FILE_SIZE_ERROR = 2500; // Max file size (in kB) before error

/**
 * Tests & validates a JavaScript file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {boolean} warnOnly Only warn, never throw an error.
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function test(filename, warnOnly) {
  try {
    // Read the file size and check if it exceeds the known limits
    const stats = fs.statSync(filename);
    const fileSize = Math.round(parseInt(stats.size, 10) / 1024);
    const result = {
      filename: filename,
    };
    if (fileSize > MAX_FILE_SIZE_ERROR && !warnOnly) {
      result.level = 'ERROR';
      result.message = `Exceeds maximum files size ${MAX_FILE_SIZE_ERROR}K,` +
        ` was ${fileSize}K`;
    } else if (fileSize > MAX_FILE_SIZE_WARN) {
      result.level = 'WARNING';
      result.message = `Try to keep files below ${MAX_FILE_SIZE_WARN}K,` +
        ` was ${fileSize}K`;
    }
    if (result.level) {
      return Promise.reject([result]);
    }
  } catch (ex) {
    return Promise.reject({
      level: 'WARNING',
      filename: filename,
      message: `Unable to read file stats: ${ex.message}`,
    });
  }
  return Promise.resolve(true);
}

exports.test = test;

