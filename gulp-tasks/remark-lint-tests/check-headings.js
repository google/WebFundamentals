/**
 * @fileoverview Remark linter to verify headings
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

module.exports = {
  'wf-headings-tldr': wfTLDR,
  'wf-headings-blank': wfHeadingsBlank,
  'wf-headings-in-markdown': wfHeadingsInMarkdown,
  'wf-headings-no-markup-in-title': wfNoMarkupInTitle,
};

const reTLDR = /tl;dr/i;
const reHeading = /^<h\d>.*?<\/h\d>$/i;
const reHideFromTOC = /.hide-from-toc/;
const validHeadingTypes = ['text', 'linkReference'];

function wfHeadingsInMarkdown(ast, file, setting) {
  let msg = 'Headings must use markdown style, HTML is not permitted.';
  visit(ast, 'html', function(node) {
    if (reHeading.test(node.value)) {
      file.message(msg, node);
    }
  });
}

function wfHeadingsBlank(ast, file, setting) {
  visit(ast, 'heading', function(node) {
    let title = toString(node).trim();
    if (title.length === 0) {
      file.message('Headings cannot be empty.', node);
    }
  });
}

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

function wfTLDR(ast, file, setting) {
  let msgLevel = 'TL;DR headings must be level 3 or greater.';
  let msgHide = 'TL;DR headings must be hidden from the TOC with `{: .hide-from-toc }`';
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
