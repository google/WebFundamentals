/**
 * @fileoverview Validates JavaScript file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

/**
 * Tests & validates a JavaScript file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function test(filename, contents) {
  if (filename.indexOf('/_code/') > 0) {
    return Promise.resolve(true);
  }
  const result = {
    level: 'WARNING',
    filename: filename,
    message: 'JavaScript files are generally not allowed.',
  };
  return Promise.reject([result]);
}

exports.test = test;
