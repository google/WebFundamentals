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

const RE_HTML_TAG = /<html(\s.*?)?>/;
const RE_TITLE_TAG = /<title>(.*?)<\/title>/;
const MAX_DESCRIPTION_LENGTH = 485;

/**
 * Reads all <meta> tags and pulls the name & value into an object
 *
 * @param {string} contents The contents of the file
 * @return {Object} An object containing the meta tags
 */
function getMetaTags(contents) {
  const results = {};
  const matched = wfRegEx.getMatches(/<meta .*?>/g, contents);
  matched.forEach((match) => {
    const key = wfRegEx.getMatch(/name=["'](.*?)["']/, match[0]);
    if (key) {
      results[key] = wfRegEx.getMatch(/value=["'](.*?)["']/, match[0]);
    }
  });
  return results;
}


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

  /**
   * Simple wrapper that adds an error to the list
   *
   * @param {string} message The message to add.
   * @param {object} position The line number the error occured on.
   */
  function logError(message, position) {
    results.push({
      level: 'ERROR',
      filename: filename,
      position: position,
      message: message,
    });
  }

  /**
   * Simple wrapper that adds a warning to the list
   *
   * @param {string} message The message to add.
   * @param {object} position The line number the warning occured on.
   */
  function logWarning(message, position) {
    results.push({
      level: 'WARNING',
      filename: filename,
      position: position,
      message: message,
    });
  }

  const isInclude = testHelpers.isInclude(filename, contents);
  const hasHTMLTag = RE_HTML_TAG.test(contents);
  const isDevSiteHTMLPage = testHelpers.isDevSiteHTMLPage(filename, contents);
  const metaTags = getMetaTags(contents);

  // Verify extension on file is .html
  if (path.extname(filename.toLowerCase()) !== '.html') {
    logError(`File extension must be '.html'`);
  }

  // If it's a full page & it doesn't contain the devsite attribute in the
  // <html> tag, warn that there could be an issue.
  if (hasHTMLTag && !isDevSiteHTMLPage) {
    logWarning(`HTML pages should include 'devsite' attribute in <html> tag`);
  }

  // Validate the book_path is specified and the file exists
  if (isDevSiteHTMLPage) {
    const bookPath = metaTags['book_path'];
    if (bookPath) {
      if (testHelpers.doesFileExist(bookPath) !== true) {
        logError(`Unable to find specified 'book_path': ${bookPath}`);
      }
    } else {
      logError(`Attribute 'book_path' missing from top of document`);
    }
  }

  // Validate project_path is specified and file exists
  if (isDevSiteHTMLPage) {
    const projectPath = metaTags['project_path'];
    if (projectPath) {
      if (testHelpers.doesFileExist(projectPath) !== true) {
        logError(`Unable to find specified 'project_path': ${projectPath}`);
      }
    } else {
      logError(`Attribute 'project_path' missing from top of document`);
    }
  }

  // Validate description
  const description = metaTags['description'];
  if (isInclude && description) {
    const msg = `Included files should not include 'description' tags.`;
    logError(msg);
  }
  if (isDevSiteHTMLPage && description) {
    if (description.length === 0) {
      logError(`Attribute 'description' cannot be empty.`);
    } else if (description.length > MAX_DESCRIPTION_LENGTH) {
      const msg = `Attribute 'description' exceeds ` +
        `${MAX_DESCRIPTION_LENGTH} characters, was: ${description.length}`;
      logError(msg);
    }
    if (description.indexOf('<') >= 0 || description.indexOf('`') >= 0) {
      const msg = `Attribute 'description' cannot contain HTML or  ` +
        `markdown, found: ${description}`;
      logError(msg);
    }
  }

  // Check to make sure includes don't have a body
  if (isInclude) {
    const reBody = /<body(\s.*?)?>/;
    const reHead = /<head(\s.*?)?>/;
    if (hasHTMLTag) {
      logWarning(`Include files should not contain an <html> tag.`);
    }
    if (reHead.test(contents)) {
      logWarning(`Include files should not contain a <head> tag.`);
    }
    if (RE_TITLE_TAG.test(contents)) {
      logWarning(`Include files should not contain a <title> tag.`);
    }
    if (reBody.test(contents)) {
      logWarning(`Include files should not contain a <body> tag.`);
    }
  }

  // Verify document has a title tag
  if (!isInclude) {
    const title = wfRegEx.getMatch(RE_TITLE_TAG, contents);
    if (!title) {
      logWarning(`Page must include a meaningful '<title>' tag.`);
    } else {
      if (title.length === 0) {
        logWarning(`'<title>' cannot be empty.`);
      }
    }
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
