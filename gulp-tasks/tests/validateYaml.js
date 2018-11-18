/**
 * @fileoverview Validates a file is a valid YAML file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const jsYaml = require('js-yaml');

/**
 * Tests a YAML file
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Promise<Object>} Parsed YAML object, or if it failed, an array
 *  of errors.
 */
function test(filename, contents) {
  try {
    const parsed = jsYaml.safeLoad(contents);
    return Promise.resolve(parsed);
  } catch (ex) {
    const position = ex.mark;
    const result = {
      level: 'ERROR',
      filename: filename,
      message: ex.reason || `Unable to parse YAML`,
      position: position,
    };
    return Promise.reject([result]);
  }
}

exports.test = test;
