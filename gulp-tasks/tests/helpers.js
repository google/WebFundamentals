/**
 * @fileoverview Validates HTML file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const fs = require('fs');

/**
 * Gets the line number of the current string up to the index point
 *
 * @param {string} content The content of the string to check
 * @param {Number} idx Where in the string to stop
 * @return {Number} The line number the index ends on
 */
function getLineNumber(content, idx) {
  const subStr = content.substring(0, idx);
  const lineNum = subStr.split(/\r\n|\r|\n/).length;
  return lineNum;
}

/**
 * Checks if a file exists.
 *
 * @param {string} filename The WebFundamentals file path.
 * @return {Boolean} True if it exists, false if not.
 */
function doesFileExist(filename) {
  if (!filename) {
    return false;
  }
  filename = filename.trim();
  filename = filename.replace(/^\/?web\/(.*)/, 'src/content/en/$1');
  try {
    fs.accessSync(filename, fs.R_OK);
    return true;
  } catch (ex) {
    return false;
  }
}

exports.doesFileExist = doesFileExist;
exports.getLineNumber = getLineNumber;
