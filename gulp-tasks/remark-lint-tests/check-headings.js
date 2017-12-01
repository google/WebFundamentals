/**
 * @fileoverview Remark linter to verify headings
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');
const generated = require('unist-util-generated');

module.exports = {
  'wf-headings-tldr': wfTLDR,
  'wf-headings-blank': wfHeadingsBlank,
  'wf-headings-at-least': wfHeadingsAtLeast,
  'wf-headings-in-markdown': wfHeadingsInMarkdown,
  'wf-headings-no-markup-in-title': wfNoMarkupInTitle,
};

const reTLDR = /tl;dr/i;
const reHeading = /^<h\d>.*?<\/h\d>$/i;
const reHideFromTOC = /.hide-from-toc/;
const validHeadingTypes = ['text', 'linkReference'];

/**
 * Remark Lint Test - minimum heading level.
 *
 * @param {Node} ast - Root node.
 * @param {File} file - Virtual file.
 * @param {number} minLevel
 */
function wfHeadingsAtLeast(ast, file, minLevel) {
  if (!minLevel || minLevel <= 1 || minLevel > 6) {
    return;
  }
  visit(ast, 'heading', function(node) {
    if (generated(node)) {
      return;
    }
    if (node.depth <= minLevel) {
      const msg = `First heading level should be at least ${minLevel} ` +
        `was ${node.depth}.`;
      file.message(msg, node);
    }
    return false;
  });
}

/**
 * Remark Lint Test - flags HTML style heading tags.
 *
 * @param {Object} ast
 * @param {Object} file
 * @param {Object} setting
 */
function wfHeadingsInMarkdown(ast, file, setting) {
  let msg = 'Headings must use markdown style, HTML is not permitted.';
  visit(ast, 'html', function(node) {
    if (reHeading.test(node.value)) {
      file.message(msg, node);
    }
  });
}

/**
 * Remark Lint Test - flags empty headings.
 *
 * @param {Object} ast
 * @param {Object} file
 * @param {Object} setting
 */
function wfHeadingsBlank(ast, file, setting) {
  visit(ast, 'heading', function(node) {
    let title = toString(node).trim();
    if (title.length === 0) {
      file.message('Headings cannot be empty.', node);
    }
  });
}

/**
 * Remark Lint Test - verifies there is no markup in level 1 headings.
 *
 * @param {Object} ast
 * @param {Object} file
 * @param {Object} setting
 */
function wfNoMarkupInTitle(ast, file, setting) {
  visit(ast, 'heading', function(node) {
    if (node.depth !== 1) {
      return;
    }
    node.children.forEach((child) => {
      if (validHeadingTypes.indexOf(child.type) === -1) {
        let msg = 'Top level headings must only contain text.';
        file.message(`${msg} Contained: ${child.type}`, node);
      }
    });
  });
}

/**
 * Remark Lint Test - verifies TL;DRs are at least L3 & hidden from the TOC.
 *
 * @param {Object} ast
 * @param {Object} file
 * @param {Object} setting
 */
function wfTLDR(ast, file, setting) {
  const msgLevel = 'TL;DR headings must be level 3 or greater.';
  const msgHide = 'TL;DR headings must be hidden from the TOC with ' +
      ' `{: .hide-from-toc }`';
  visit(ast, 'heading', function(node) {
    let body = toString(node);
    if (reTLDR.test(body)) {
      if (node.depth < 3) {
        file.message(msgLevel, node);
      }
      if (!reHideFromTOC.test(body)) {
        file.message(msgHide, node);
      }
    }
  });
}
