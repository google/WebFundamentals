/**
 * @fileoverview Validates HTML file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const fs = require('fs');
const wfRegEx = require('../wfRegEx');

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

/**
 * Checks if a file is an include file.
 *
 * @param {string} filename The WebFundamentals file path.
 * @param {string} contents The contents of the file
 * @return {Boolean} True if it is, false if not.
 */
function isInclude(filename, contents) {
  const isInclude = wfRegEx.RE_IS_INCLUDE.test(contents) ||
    wfRegEx.RE_IS_MD_INCLUDE.test(contents);
  return isInclude;
}

/**
 * Checks if a file is a translated file.
 *
 * @param {string} filename The WebFundamentals file path.
 * @param {string} contents The contents of the file
 * @return {Boolean} True if it is, false if not.
 */
function isTranslation(filename, contents) {
  return wfRegEx.RE_TRANSLATED_PATH.test(filename);
}

/**
 * Checks if a file is a DevSite HTML page.
 *
 * @param {string} filename The WebFundamentals file path.
 * @param {string} contents The contents of the file
 * @return {Boolean} True if it is, false if not.
 */
function isDevSiteHTMLPage(filename, contents) {
  // const RE_HTML_TAG = /<html.*?>/;
  const RE_HTML_DEVSITE = /<html\s.*?devsite.*?>/;
  return RE_HTML_DEVSITE.test(contents);
}

exports.doesFileExist = doesFileExist;
exports.getLineNumber = getLineNumber;
exports.isInclude = isInclude;
exports.isTranslation = isTranslation;
exports.isDevSiteHTMLPage = isDevSiteHTMLPage;
