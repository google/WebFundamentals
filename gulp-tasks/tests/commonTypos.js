/**
 * @fileoverview Validates the contents of an HTML or Markdown file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const wfRegEx = require('../wfRegEx');
const testHelpers = require('./helpers');

/**
 * Simple wrapper for testHelpers.getLineNumber.
 *
 * @param {string} contents The content of the string to check.
 * @param {Number} idx Where in the string to stop.
 * @return {Number} The line number the index ends on.
 */
function getLineNumber(contents, idx) {
  return testHelpers.getLineNumber(contents, idx);
}

/**
 * Tests & validates the contents of an HTML or Markdown file.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @param {Object} options The options object
 * @return {Array} An array of warnings and errors found in the file
 */
function test(filename, contents, options) {
  const results = [];
  if (!options.commonTypos || options.skipTypos) {
    return results;
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

  options.commonTypos.forEach((typo) => {
    let flags = 'g';
    if (!typo.caseSensitive) {
      flags += 'i';
    }
    const reTypo = new RegExp(typo.typo.trim(), flags);
    const matches = wfRegEx.getMatches(reTypo, contents);
    matches.forEach((matchResult) => {
      const position = {line: getLineNumber(contents, matchResult.index)};
      const match = matchResult[0].replace(/\n/g, ' ').trim();
      const fix = match.replace(reTypo, typo.fix);
      if (match.toLowerCase() === fix.toLowerCase()) {
        return;
      }
      let msg = `Common typo found: (${match})`;
      if (typo.fix) {
        msg += ` Should it be '${fix}'?`;
      }
      if (typo.british) {
        msg += ' Per our style guide, use American spellings.' +
          ' See: https://developers.google.com/style/spelling';
      }
      if (typo.description) {
        msg += ' ' + typo.description;
      }
      logWarning(msg, position);
    });
  });

  return results;
}

exports.test = test;
