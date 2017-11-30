/**
 * @fileoverview Remark linter to verify links
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const url = require('url');
const visit = require('unist-util-visit');

module.exports = {
  'wf-links-forced-lang': wfForcedLang,
  'wf-links-dgc': wfDGCLinks,
  'wf-links-unsafe-short': wfUnsafeShort,
  'wf-links-internal': wfInternalLinks
};

// Check for links with hard coded languages
function wfForcedLang(ast, file, setting) {
  let msg = 'Hard coded language URL in link (`hl=xx`)';
  visit(ast, 'link', function(node) {
    let parsedUrl = url.parse(node.url);
    let queryString = parsedUrl.query;
    if (queryString && queryString.toLowerCase().indexOf('hl=') >= 0) {
      file.message(msg, node);
    }
  });
}

// Check for links with FQDN to DevSite
function wfDGCLinks(ast, file, setting) {
  let msg = 'Do not hard code `developers.google.com` in links.';
  visit(ast, 'link', function(node) {
    let parsedUrl = url.parse(node.url);
    let hostname = parsedUrl.hostname;
    if (hostname && hostname.toLowerCase() === 'developers.google.com') {
      file.message(msg, node);
    }
  });
}

// Check for unsecured shortlinks
function wfUnsafeShort(ast, file, setting) {
  let msg = 'Do not use unsafe `HTTP://goo.gl/` links';
  visit(ast, 'link', function(node) {
    let parsedUrl = url.parse(node.url);
    let protocol = parsedUrl.protocol;
    let hostname = parsedUrl.hostname;
    if (hostname && hostname.toLowerCase() === 'goo.gl') {
      if (protocol && protocol.toLowerCase() === 'http:') {
        file.message(msg, node);
      }
    }
  });
}

// Check for internal & sandboxed links
function wfInternalLinks(ast, file, setting) {
  let msg = 'Do not use internal Google sandboxed links.';
  visit(ast, 'link', function(node) {
    let parsedUrl = url.parse(node.url);
    let hostname = parsedUrl.hostname;
    if (hostname && hostname.toLowerCase() === 'sandbox.google.com') {
      file.message(msg, node);
    }
  });
}
