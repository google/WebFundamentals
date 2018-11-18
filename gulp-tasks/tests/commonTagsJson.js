/**
 * @fileoverview Tests the common tags file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

/**
 * Tests and validates a commonTags.json file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {Object} tags The parsed contents of the tags file.
 * @return {Promise} A promise with the result of the test.
 */
function test(filename, tags) {
  if (Array.isArray(tags) === true) {
    return Promise.resolve(true);
  }
  return Promise.reject({
    level: 'ERROR',
    filename: filename,
    message: `Common tags file must be an array, was ${typeof tags}`,
  });
}

exports.test = test;
