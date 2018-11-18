/**
 * @fileoverview Tests the glossary file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const JSONValidator = require('jsonschema').Validator;

const SCHEMA_GLOSSARY = {
  id: '/Glossary',
  type: 'array',
  items: {$ref: '/GlossaryItem'},
};
const SCHEMA_GLOSSARY_ITEM = {
  id: '/GlossaryItem',
  type: 'object',
  properties: {
    term: {type: 'string', required: true},
    description: {type: 'string', required: true},
    acronym: {type: 'string'},
    see: {$ref: '/GlossaryLink'},
    blink_component: {type: 'string'},
    tags: {type: 'array'},
    links: {type: 'array', items: {$ref: '/GlossaryLink'}},
  },
  additionalProperties: false,
};
const SCHEMA_GLOSSARY_LINK = {
  id: '/GlossaryLink',
  properties: {
    title: {type: 'string', required: true},
    link: {type: 'string', required: true},
  },
  additionalProperties: false,
};

/**
 * Tests and validates a glossary.yaml file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {Object} glossary The parsed contents of the glossary file.
 * @return {Promise} A promise with the result of the test.
 */
function test(filename, glossary) {
  return new Promise(function(resolve, reject) {
    const results = [];
    let validator = new JSONValidator();
    validator.addSchema(SCHEMA_GLOSSARY_ITEM, SCHEMA_GLOSSARY_ITEM.id);
    validator.addSchema(SCHEMA_GLOSSARY_LINK, SCHEMA_GLOSSARY_LINK.id);
    validator.validate(glossary, SCHEMA_GLOSSARY).errors.forEach((err) => {
      let msg = `${err.stack || err.message}`;
      msg = msg.replace('{}', '(' + err.instance + ')');
      const result = {
        level: 'ERROR',
        filename: filename,
        message: msg,
      };
      results.push(result);
    });
    let prevTermName = '';
    glossary.forEach((term) => {
      const termName = term.term.toLowerCase();
      if (prevTermName > termName) {
        const result = {
          level: 'ERROR',
          filename: filename,
          message: `'${prevTermName}' came before '${termName}'`,
        };
        results.push(result);
      }
      prevTermName = termName;
    });
    if (results.length > 0) {
      reject(results);
      return;
    }
    resolve(true);
  });
}

exports.test = test;
