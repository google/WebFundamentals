/**
 * @fileoverview Tests the common tags file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const ESlintEngine = require('eslint').CLIEngine;

/**
 * Lints a gulp-task JavaScript file
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {string} esLintConfig The parsed esLintConfig to use.
 * @param {string} contents The contents of the file to be tested.
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function test(filename, esLintConfig, contents) {
  return new Promise(function(resolve, reject) {
    const eslinter = new ESlintEngine(esLintConfig);
    const report = eslinter.executeOnText(contents);
    if (!report || !report.results[0]) {
      const result = {
        level: 'ERROR',
        filename: filename,
        message: `ESLint didn't return a report.`,
      };
      resolve([result]);
      return;
    }
    const results = [];
    report.results[0].messages.forEach((result) => {
      const logResult = {
        level: 'ERROR',
        filename: filename,
        message: `${result.message} (${result.ruleId})`,
        position: {line: result.line},
      };
      if (result.severity === 1) {
        result.level = 'WARNING';
      }
      results.push(logResult);
    });
    if (results.length > 0) {
      reject(results);
      return;
    }
    resolve(true);
  });
}

exports.test = test;
