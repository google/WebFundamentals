/**
 * @fileoverview Tests the common-typos.yaml file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const JSONValidator = require('jsonschema').Validator;

const SCHEMA_TYPOS = {
  id: '/Typos',
  type: 'array',
  items: {$ref: '/TypoItem'},
};
const SCHEMA_TYPO_ITEM = {
  id: '/TypoItem',
  type: 'object',
  properties: {
    typo: {type: 'string', required: true},
    fix: {type: 'string', required: true},
    description: {type: 'string'},
    caseSensitive: {type: 'boolean'},
    british: {type: 'boolean'},
  },
  additionalProperties: false,
};

/**
 * Tests the common-typos.yaml file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {Object} typosList The parsed contents of the redirects file.
 * @return {Promise} A promise with the result of the test.
 */
function test(filename, typosList) {
  return new Promise(function(resolve, reject) {
    const results = [];
    const validator = new JSONValidator();
    validator.addSchema(SCHEMA_TYPO_ITEM, SCHEMA_TYPO_ITEM.id);
    validator.validate(typosList, SCHEMA_TYPOS).errors.forEach((err) => {
      let msg = `${err.stack || err.message}`;
      msg = msg.replace('{}', '(' + err.instance + ')');
      const result = {
        level: 'ERROR',
        filename: filename,
        message: msg,
      };
      results.push(result);
    });

    if (results.length > 0) {
      reject(results);
      return;
    }
    resolve(true);
  });
}

exports.test = test;
