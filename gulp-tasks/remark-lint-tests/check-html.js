/**
 * @fileoverview Remark linter to check links in HTML docs
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const url = require('url');
const wfRegEx = require('../wfRegEx');
const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

module.exports = {
  'wf-html-you-tube': wfYouTube,
  'wf-html-dgc-links': wfHTMLDGCLinks,
  'wf-html-internal-links': wfInternalLinks,
  'wf-html-link-forced-lang': wfForcedLang,
  'wf-html-unsafe-short-links': wfUnsafeShortLinks
};

const reYouTube = /^<iframe\s.*?src=['|"]https?:\/\/(www.)?youtube.com\/.*?['|"| ].*>[.\s\n\r]*?<\/iframe>$/i;
const reDGCLink = /^<a\s.*?href=['|"]?(https?:)?\/\/developers.google.com/i;
const reSandboxedLink = /^<a\s.*?href=['|"]?(https?:)?\/\/sandbox.google.com/i;
const reGooGL = /^<a\s.*?href=['|"]?http:\/\/goo\.gl\//i;
const reHref = /^<a\s.*href=['|"](.*)['|"]>/i;

function wfYouTube(ast, file, setting) {
  let msg = 'YouTube videos must use DevSite embed.';
  visit(ast, 'html', function (node) {
    if (reYouTube.test(node.value)) {
      file.message(msg, node);
    }
  });
}

function wfHTMLDGCLinks(ast, file, setting) {
  let msg = 'Do not hard code `developers.google.com` in links.';
  visit(ast, 'html', function (node) {
    if (reDGCLink.test(node.value)) {
      file.message(msg, node);
    }
  });
}

function wfInternalLinks(ast, file, setting) {
  let msg = 'Do not use internal Google sandboxed links';
  visit(ast, 'html', function (node) {
    if (reSandboxedLink.test(node.value)) {
      file.message(msg, node);
    }
  });
}

function wfUnsafeShortLinks(ast, file, setting) {
  let msg = 'Do not use unsafe `HTTP://goo.gl/` links';
  visit(ast, 'html', function (node) {
    if (reGooGL.test(node.value)) {
      file.message(msg, node);
    }
  });
}

function wfForcedLang(ast, file, setting) {
  let msg = 'Hard coded language URL in link (`hl=xx`).';
  visit(ast, 'html', function (node) {
    let match = reHref.exec(node.value);
    if (match && match[1]) {
      let parsedUrl = url.parse(match[1]);
      let queryString = parsedUrl.query;
      if (queryString && queryString.toLowerCase().indexOf('hl=') >= 0) {
        file.message(msg, node);
      }
    }
  });
}



