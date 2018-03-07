/**
 * @fileoverview Validates HTML file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const path = require('path');
const wfRegEx = require('../wfRegEx');
const testHelpers = require('./helpers');
const validateContent = require('./validateContent');

const RE_HTML_TAG = /<html.*?>/;

/**
 * Tests & validates an HTML file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @param {Object} options The options object
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function test(filename, contents, options) {
  if (filename.indexOf('/_code/') >= 0) {
    return Promise.resolve(true);
  }

  const results = validateContent.test(filename, contents, options);

  const isPartialPage = !RE_HTML_TAG.test(contents);
  const isDevSiteHTMLPage = testHelpers.isDevSiteHTMLPage(filename, contents);

  // Verify extension on file is .html
  if (path.extname(filename.toLowerCase()) !== '.html') {
    results.push({
      level: 'ERROR',
      filename: filename,
      message: `File extension must be '.html'`,
    });
  }

  // If it's a full page & it doesn't contain the devsite attribute in the
  // <html> tag, warn that there could be an issue.
  if (!isPartialPage && !isDevSiteHTMLPage) {
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
      position: {line: testHelpers.getLineNumber(contents, match.index)},
    };
    results.push(result);
  });

  if (results.length > 0) {
    return Promise.reject(results);
  }
  return Promise.resolve(true);
}

exports.test = test;
