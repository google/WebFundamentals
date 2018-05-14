/**
 * @fileoverview Validates a filename.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const ILLEGAL_CHARACTERS = [' ', '%', '(', ')', '[', ']', '?'];

/**
 * Tests a JSON file
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function test(filename) {
  let isLegal = true;
  ILLEGAL_CHARACTERS.forEach((char) => {
    if (filename.indexOf(char) >= 0) {
      isLegal = false;
    }
  });
  return isLegal;
}

exports.test = test;
