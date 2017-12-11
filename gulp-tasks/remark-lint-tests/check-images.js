/**
 * @fileoverview Remark linter to verify image paths & existance
 *
 * @todo - refactor to provide better testing of local and remote images
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const visit = require('unist-util-visit');

module.exports = {
  'wf-images-md': wfImagesInMD,
  'wf-images-html': wfImagesInHTML,
};

const reRemote = /(https?:)?\/\//i;
const reImgSrc = /src=['|"](.*?)['|"|>|\s]/i;

/**
 * Verifies that images exist and links are properly used.
 *
 * @param {Object} file The source file that included the image
 * @param {Object} imgPath The URI to the image
 * @param {Object} node The Remark node
 * @return {null} Nothing
 */
function doesImageExist(file, imgPath, node) {
  const msgHardCoded = 'Do not hard code `developers.google.com` in paths.';
  // Is the image potentially on a remote server?
  //  - indicated by http:// or https://
  if (reRemote.test(imgPath)) {
    // Is it on our server?
    if (imgPath.indexOf('developers.google.com') > 0) {
      file.message(msgHardCoded, node);
      imgPath = imgPath.replace(/https?:\/\/developers\.google\.com/i, '');
    } else {
      return;
    }
  }
  let filePath = file.cwd;
  if (imgPath.indexOf('/') === 0) {
    const noWeb = imgPath.replace('/web/', '');
    filePath = path.join(filePath, 'src/content/en', noWeb);
  } else {
    filePath = path.join(filePath, file.dirname, imgPath);
  }
  try {
    fs.accessSync(filePath, fs.R_OK);
    return true;
  } catch (ex) {
    let msg = `Unable to find image \`${imgPath}\``;
    file.message(msg, node);
  }
}

/**
 * Remark Lint Test - verifies markdown images files exist.
 *
 * @param {Object} ast
 * @param {Object} file
 * @param {Object} setting
 */
function wfImagesInMD(ast, file, setting) {
  visit(ast, 'image', function(node) {
    if (node.url && node.url.trim().length > 0) {
      doesImageExist(file, node.url, node);
    }
  });
}

/**
 * Remark Lint Test - verifies html image files exist.
 *
 * @param {Object} ast
 * @param {Object} file
 * @param {Object} setting
 */
function wfImagesInHTML(ast, file, setting) {
  visit(ast, 'html', function(node) {
    let matched = reImgSrc.exec(node.value);
    if (matched && matched[1]) {
      doesImageExist(file, matched[1], node);
    }
  });
}
