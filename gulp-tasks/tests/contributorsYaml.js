/**
 * @fileoverview Tests the contributors file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const JSONValidator = require('jsonschema').Validator;

const SCHEMA_CONTRIBUTORS = {
  id: '/Contributors',
  patternProperties: {
    '.*': {$ref: '/Contributor'},
  },
};
const SCHEMA_CONTRIBUTOR = {
  id: '/Contributor',
  properties: {
    name: {
      type: 'object',
      properties: {
        given: {type: 'string'},
        family: {type: 'string'},
      },
      required: ['given'],
      additionalProperties: false,
    },
    org: {
      type: 'object',
      properties: {
        name: {type: 'string'},
        unit: {type: 'string'},
      },
      additionalProperties: false,
    },
    homepage: {type: 'string', pattern: /^https?:\/\//i},
    google: {type: 'string', pattern: /^(\+[a-z].*$|[0-9].*$)/i},
    twitter: {type: 'string', pattern: /^[a-z0-9_-]+$/i},
    github: {type: 'string', pattern: /^[a-z0-9_-]+$/i},
    lanyrd: {type: 'string', pattern: /^[a-z0-9_-]+$/i},
    description: {
      type: 'object',
      properties: {
        en: {type: 'string'},
      },
      additionalProperties: false,
    },
    role: {type: 'array'},
    country: {type: 'string'},
    email: {type: 'string'},
  },
  required: ['name'],
  additionalProperties: false,
};
const RESERVED_NAMES = ['index'];

/**
 * Tests and validates a contributors.yaml file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {Object} contributors The parsed contents of the contributors file.
 * @return {Promise} A promise with the result of the test.
 */
function test(filename, contributors) {
  return new Promise(function(resolve, reject) {
    const results = [];
    let validator = new JSONValidator();
    validator.addSchema(SCHEMA_CONTRIBUTOR, SCHEMA_CONTRIBUTOR.id);
    validator.validate(contributors, SCHEMA_CONTRIBUTORS)
      .errors.forEach((err) => {
        let msg = `${err.stack || err.message}`;
        msg = msg.replace('{}', '(' + err.instance + ')');
        results.push({
          level: 'ERROR',
          filename: filename,
          message: msg,
        });
      }
    );
    let prevFamilyName = '';
    Object.keys(contributors).forEach((key) => {
      if (/^[a-z]*$/gi.test(key) === false) {
        results.push({
          level: 'ERROR',
          filename: filename,
          message: `Identifier must contain only letters, was '${key}'`,
        });
      }
      if (RESERVED_NAMES.indexOf(key.toLowerCase()) >= 0) {
        results.push({
          level: 'ERROR',
          filename: filename,
          message: `Identifier cannot contain reserved word: '${key}'`,
        });
      }
      const contributor = contributors[key];
      const familyName = contributor.name.family || contributor.name.given;
      if (prevFamilyName.toLowerCase() > familyName.toLowerCase()) {
        results.push({
          level: 'ERROR',
          filename: filename,
          message: `${prevFamilyName} came before ${familyName}`,
        });
      }
      prevFamilyName = familyName;
    });
    if (results.length > 0) {
      reject(results);
      return;
    }
    resolve(true);
  });
}

exports.test = test;
