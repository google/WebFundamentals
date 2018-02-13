/**
 * @fileoverview Validates HTML file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

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

const RE_HTML_DEVSITE = /<html\s.*?devsite.*?>/;
const RE_HTML_TAG = /<html.*?>/;

/**
 * Tests & validates an HTML file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function test(filename, contents) {
  if (filename.indexOf('/_code/') >= 0) {
    return Promise.resolve(true);
  }
  const isPartialPage = !RE_HTML_TAG.test(contents);
  const hasDevSiteHTMLAttribute = RE_HTML_DEVSITE.test(contents);
  const results = [];

  // If it's a full page & it doesn't contain the devsite attribute in the
  // <html> tag, warn that there could be an issue.
  if (!isPartialPage && !hasDevSiteHTMLAttribute ) {
    results.push({
      level: 'WARNING',
      filename: filename,
      message: `HTML pages should include 'devsite' attribute in <html> tag`,
    });
  }

  // Search for and throw an error for hard coded developers.google.com
  const matched = wfRegEx.getMatches(/developers\.google\.com/g, contents);
  matched.forEach(function(match) {
    const result = {
      level: 'ERROR',
      filename: filename,
      message: `Do not use hard coded 'developers.google.com'.`,
      position: {line: getLineNumber(contents, match.index)},
    };
    results.push(result);
  });

  if (results.length > 0) {
    return Promise.reject(results);
  }
  return Promise.resolve(true);
}

exports.test = test;
