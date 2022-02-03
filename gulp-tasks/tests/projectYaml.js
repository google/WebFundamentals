/**
 * @fileoverview Tests a _project.yaml file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

const testHelpers = require('./helpers');
const JSONValidator = require('jsonschema').Validator;

const VALID_ANALYTICS_UA_STRINGS = [
  'UA-52746336-1',
  'UA-130569087-3',
];

JSONValidator.prototype.customFormats.wfUAString = function(input) {
  return VALID_ANALYTICS_UA_STRINGS.includes(input);
};

JSONValidator.prototype.customFormats.doesFileExist = function(input) {
  return testHelpers.doesFileExist(input);
};

const SCHEMA_PROJECT = {
  id: '/Project',
  type: 'object',
  properties: {
    name: {type: 'string', required: true},
    description: {type: 'string', required: true},
    home_url: {type: 'string', pattern: /^\/web\//i, required: true},
    buganizer_id: {type: 'number', pattern: /^180451$/, required: true},
    content_license: {
      type: 'string',
      pattern: /^cc-apache$/,
      required: true,
    },
    announcement: {
      type: 'object',
      properties: {
        description: {type: 'string', required: true},
        background: {type: 'string', required: false},
      },
      additionalProperties: false,
    },
    color: {
      type: 'string',
      pattern: /^google-blue|orange$/,
      required: true,
    },
    feedback: {
      type: 'object',
      properties: {
        product_id: {
          type: 'number',
          required: true,
        },
      },
      additionalProperties: false,
    },
    footer_path: {type: 'string', required: true},
    google_analytics_ids: {
      type: 'array',
      items: {type: 'string', format: 'wfUAString'},
      required: true,
    },
    keywords: {
      type: 'array',
      items: {type: 'string'},
    },
    hide_ratings_widget: {
      type: 'boolean',
      additionalProperties: false,
    },
    icon: {
      type: 'object',
      properties: {
        path: {type: 'string', required: true},
      },
      additionalProperties: false,
      required: true,
    },
    is_family_root: {type: 'boolean'},
    parent_project_metadata_path: {
      type: 'string',
      pattern: /^\/web\/_project.yaml$/,
    },
    social_media: {
      type: 'object',
      properties: {
        image: {
          type: 'object',
          properties: {
            path: {type: 'string', format: 'doesFileExist', required: true},
            width: {type: 'number'},
            height: {type: 'number'},
          },
          required: true,
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
    include: {
      type: 'string',
      pattern: /racialequity/,
    },
  },
  additionalProperties: false,
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
    validator.validate(project, SCHEMA_PROJECT).errors.forEach((err) => {
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
