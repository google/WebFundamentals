/**
 * @fileoverview Validates a file is a valid JSON file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

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
  try {
    const parsed = JSON.parse(contents);
    return Promise.resolve(parsed);
  } catch (ex) {
    const result = {
      level: 'ERROR',
      filename: filename,
      message: `Unable to parse JSON: ${ex.message}`,
    };
    return Promise.reject([result]);
  }
}

exports.test = test;
