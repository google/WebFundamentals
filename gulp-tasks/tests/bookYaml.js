/**
 * @fileoverview Tests a _project.yaml file.
 *
 * @author Pete LePage <petele@google.com>
 */
'use strict';

// const testHelpers = require('./helpers');
const JSONValidator = require('jsonschema').Validator;

const VALID_PLATFORM = ['android', 'cpp', 'ios', 'unity', 'unreal', 'web'];
const VALID_STATUS = ['alpha', 'beta', 'deprecated', 'experimental',
                      'external', 'new'];
const VALID_STYLE = ['accordion', 'divider'];

const BOOK_ROOT = {
  id: '/BookRoot',
  type: 'object',
  additionalProperties: false,
  properties: {
    guides: {type: 'array', items: {$ref: '/TOCElement'}},
    samples: {type: 'array', items: {$ref: '/TOCElement'}},
    support: {type: 'array', items: {$ref: '/TOCElement'}},
    reference: {type: 'array', items: {$ref: '/TOCElement'}},
    other: {type: 'array', items: {$ref: '/TOCOther'}},
    toc: {type: 'array', items: {$ref: '/TOCElement'}},
    included: {type: 'array'},
    upper_tabs: {type: 'array', items: {$ref: '/UpperTabs'}},
  },
  dependencies: {

  },
};

const UPPER_TABS = {
  id: '/UpperTabs',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {type: 'string'},
    heading: {type: 'string'},
    is_default: {type: 'boolean'},
    path: {type: 'string'},
    buttons: {type: 'array', items: {$ref: '/Link'}},
    attributes: {type: 'array', items: {$ref: '/Attribute'}},
    custom_html: {type: 'string'},
    lower_tabs: {type: 'object', $ref: '/LowerTabs'},
    include: {type: 'string'},
    menu: {type: 'object', $ref: '/TOCMenu'},
  },
};

const LOWER_TABS = {
  id: '/LowerTabs',
  type: 'object',
  additionalProperties: false,
  properties: {
    guides: {type: 'array', items: {$ref: '/TOCElement'}},
    samples: {type: 'array', items: {$ref: '/TOCElement'}},
    support: {type: 'array', items: {$ref: '/TOCElement'}},
    reference: {type: 'array', items: {$ref: '/TOCElement'}},
    other: {type: 'array', items: {$ref: '/TOCOther'}},
  },
};

const TOC_MENU = {
  id: '/TOCMenu',
  additionalProperties: true,
  properties: {
    include: {type: 'string'},
  },
};

const TOC_ELEMENT = {
  id: '/TOCElement',
  type: 'object',
  additionalProperties: false,
  properties: {
    acl: {type: 'string'},
    attributes: {type: 'array', items: {$ref: '/Attribute'}},
    alternate_paths: {type: 'array'},
    break: {type: 'boolean'},
    heading: {type: 'string'},
    name: {type: 'string'},
    include: {type: 'string'},
    lower_tabs: {type: 'object', $ref: '/LowerTabs'},
    menu: {type: 'object', $ref: '/TOCMenu'},
    path: {type: 'string'},
    path_attributes: {type: 'array', items: {$ref: '/Attribute'}},
    platform: {enum: VALID_PLATFORM},
    section: {type: 'array', items: {$ref: '/TOCElement'}},
    status: {enum: VALID_STATUS},
    step_group: {type: 'string'},
    style: {enum: VALID_STYLE},
    title: {type: 'string'},
    version_added: {type: 'string'},
    version_deprecated: {type: 'string'},
    versioning: {type: 'string'},
  },
};

const TOC_OTHER = {
  id: '/TOCOther',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {type: 'string'},
    contents: {type: 'array', items: {$ref: '/TOCElement'}},
    include: {type: 'string'},
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
    validator.addSchema(LINK, LINK.id);
    validator.addSchema(ATTRIBUTE, ATTRIBUTE.id);
    validator.addSchema(TOC_ELEMENT, TOC_ELEMENT.id);
    validator.addSchema(LOWER_TABS, LOWER_TABS.id);
    validator.addSchema(UPPER_TABS, UPPER_TABS.id);
    validator.addSchema(TOC_OTHER, TOC_OTHER.id);
    validator.addSchema(TOC_MENU, TOC_MENU.id);
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
