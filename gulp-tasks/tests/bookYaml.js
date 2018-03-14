/**
 * @fileoverview Tests a _project.yaml file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const testHelpers = require('./helpers');
const JSONValidator = require('jsonschema').Validator;

/**
 * Checks an enum
 *
 * @param {string} input
 * @param {Array} values
 * @return {boolean}
 */
function checkEnum(input, values) {
  if (!input || input.length === 0 || typeof input !== 'string') {
    return true;
  }
  return values.includes(input.trim().toLowerCase());
}

const BOOK_ROOT = {
  id: '/BookRoot',
  type: 'object',
  additionalProperties: false,
  properties: {
    guides: {type: 'array', items: {$ref: '/TOCElement'}},
    samples: {type: 'array', items: {$ref: '/TOCElement'}},
    support: {type: 'array', items: {$ref: '/TOCElement'}},
    reference: {type: 'array', items: {$ref: '/TOCElement'}},
    other: {type: 'array', items: {$ref: '/TOCElement'}},
    toc: {type: 'array', items: {$ref: '/TOCElement'}},
    upper_tabs: {type: 'array', items: {$ref: '/UpperTabs'}},
  },
};

const UPPER_TABS = {
  id: '/UpperTabs',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {type: 'string', required: true},
    heading: {type: 'string'},
    is_default: {type: 'boolean'},
    path: {type: 'string'},
    buttons: {type: 'array', items: {$ref: '/Link'}},
    attributes: {type: 'array', items: {$ref: '/Attribute'}},
    custom_html: {type: 'string'},
    lower_tabs: {type: 'object', items: {$ref: '/BookRoot'}, required: true},
    include: {type: 'string'},
  },
};

JSONValidator.prototype.customFormats.platform = function(input) {
  const validValues = ['android', 'cpp', 'ios', 'unity', 'unreal', 'web'];
  return checkEnum(input, validValues);
};
JSONValidator.prototype.customFormats.status = function(input) {
  const validValues =
    ['alpha', 'beta', 'deprecated', 'experimental', 'external', 'new'];
  return checkEnum(input, validValues);
};
JSONValidator.prototype.customFormats.styles = function(input) {
  const validValues = ['accordion', 'divider'];
  return checkEnum(input, validValues);
};
const TOC_ELEMENT = {
  id: '/TOCElement',
  type: 'object',
  additionalProperties: false,
  properties: {
    alternate_paths: {type: 'Array'},
    break: {type: 'boolean'},
    heading: {type: 'string'},
    include: {type: 'string'},
    path: {type: 'string'},
    path_attributes: {type: 'array', items: {$ref: '/Attribute'}},
    platform: {type: 'string', format: 'platform'},
    section: {type: 'array', items: {$ref: '/TOCElement'}},
    status: {type: 'string', format: 'status'},
    step_group: {type: 'string'},
    style: {type: 'string', format: 'styles'},
    title: {type: 'string'},
    version_added: {type: 'string'},
    version_deprecated: {type: 'string'},
    versioning: {type: 'string'},
    whitelist: {type: 'string'},
  },
};

const ATTRIBUTE = {
  id: '/Attribute',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {type: 'string', required: true},
    value: {type: 'string', required: true},
  },
};

const LINK = {
  id: '/Link',
  type: 'object',
  additionalProperties: false,
  properties: {
    attribute: {type: 'array', items: {$ref: '/Attribute'}},
    classname: {type: 'string'},
    description: {type: 'string'},
    icon: {type: 'string'},
    icon_name: {type: 'string'},
    label: {type: 'string', required: true},
    path: {type: 'string'},
  },
};

/**
 * Tests and validates a _project.yaml file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {Object} project The parsed contents of the project file.
 * @return {Promise} A promise with the result of the test.
 */
function test(filename, project) {
  return new Promise(function(resolve, reject) {
    const results = [];
    let validator = new JSONValidator();
    validator.addSchema(ATTRIBUTE, ATTRIBUTE.id);
    validator.addSchema(LINK, LINK.id);
    validator.addSchema(TOC_ELEMENT, TOC_ELEMENT.id);
    validator.addSchema(UPPER_TABS, UPPER_TABS.id);
    validator.validate(project, BOOK_ROOT).errors.forEach((err) => {
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
