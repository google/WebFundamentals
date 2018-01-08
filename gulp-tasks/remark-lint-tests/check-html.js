/**
 * @fileoverview Remark linter to check links in HTML docs
 *
 * @see check-html.js - these are essentially the same, this is for checking
 *   html links, while check-links.js is for markdown links.
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const url = require('url');
const visit = require('unist-util-visit');

module.exports = {
  'wf-html-you-tube': wfYouTube,
  'wf-html-dgc-links': wfHTMLDGCLinks,
  'wf-html-internal-links': wfInternalLinks,
  'wf-html-link-forced-lang': wfForcedLang,
  'wf-html-link-line-breaks': wfLineBreakInLink,
  'wf-html-unsafe-short-links': wfUnsafeShortLinks,
};

// eslint-disable-next-line max-len
const reYouTube = /^<iframe\s.*?src=['|"]https?:\/\/(www.)?youtube.com\/.*?['|"| ].*>[.\s\n\r]*?<\/iframe>$/i;
const reDGCLink = /^<a\s.*?href=['|"]?(https?:)?\/\/developers.google.com/i;
const reSandboxedLink = /^<a\s.*?href=['|"]?(https?:)?\/\/sandbox.google.com/i;
const reGooGL = /^<a\s.*?href=['|"]?http:\/\/goo\.gl\//i;
const reHref = /^<a\s.*href=['|"](.*)['|"]>/i;

/**
 * Remark Lint Test - check if links have whitespace or line breaks.
 *
 * @param {Object} ast
 * @param {Object} file
 * @param {Object} setting
 */
function wfLineBreakInLink(ast, file, setting) {
  const msg = 'Link contains unescaped whitespace or accidental line break.';
  const RE_WHITESPACE = /\s/;
  visit(ast, 'html', function(node) {
    const anchorTag = node.value.match(/<a((.|\n)*?)>/i);
    if (anchorTag && anchorTag[1]) {
      const href = anchorTag[1].match(/href=["|']((.|\n)*?)["|']/i);
      if (href && href[1] && RE_WHITESPACE.test(href[1])) {
        file.message(msg, node);
      }
    }
  });
}

/**
 * Remark Lint Test - flags iframes that embed YouTube content.
 *
 * @param {Object} ast
 * @param {Object} file
 * @param {Object} setting
 */
function wfYouTube(ast, file, setting) {
  let msg = 'YouTube videos must use DevSite embed.';
  visit(ast, 'html', function(node) {
    if (reYouTube.test(node.value)) {
      file.message(msg, node);
    }
  });
}

/**
 * Remark Lint Test - flags hard coded developers.google.com links.
 *
 * @param {Object} ast
 * @param {Object} file
 * @param {Object} setting
 */
function wfHTMLDGCLinks(ast, file, setting) {
  let msg = 'Do not hard code `developers.google.com` in links.';
  visit(ast, 'html', function(node) {
    if (reDGCLink.test(node.value)) {
      file.message(msg, node);
    }
  });
}

/**
 * Remark Lint Test - flags *.sandbox.google.com links.
 *
 * @param {Object} ast
 * @param {Object} file
 * @param {Object} setting
 */
function wfInternalLinks(ast, file, setting) {
  let msg = 'Do not use internal Google sandboxed links';
  visit(ast, 'html', function(node) {
    if (reSandboxedLink.test(node.value)) {
      file.message(msg, node);
    }
  });
}

/**
 * Remark Lint Test - flags unsafe goo.gl short links.
 *
 * @param {Object} ast
 * @param {Object} file
 * @param {Object} setting
 */
function wfUnsafeShortLinks(ast, file, setting) {
  let msg = 'Do not use unsafe `HTTP://goo.gl/` links';
  visit(ast, 'html', function(node) {
    if (reGooGL.test(node.value)) {
      file.message(msg, node);
    }
  });
}

/**
 * Remark Lint Test - flags hard coded language links (hl=xx).
 *
 * @param {Object} ast
 * @param {Object} file
 * @param {Object} setting
 */
function wfForcedLang(ast, file, setting) {
  let msg = 'Hard coded language URL in link (`hl=xx`).';
  visit(ast, 'html', function(node) {
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
