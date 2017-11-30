/**
 * @fileoverview Remark linter to verify image paths & existance
 *
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

function doesImageExist(file, imgPath, node) {
  let msgHardCoded = 'Do not hard code `developers.google.com` in paths.';
  if (reRemote.test(imgPath)) {
    if (imgPath.indexOf('developers.google.com') > 0) {
      file.message(msgHardCoded, node);
      imgPath = imgPath.replace(/https?:\/\/developers\.google\.com/i, '');
    } else {
      return;
    }
  }
  let filePath = file.cwd;
  if (imgPath.indexOf('/') === 0) {
    filePath = path.join(filePath, 'src/content/en', imgPath.replace('/web/', ''));
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

function wfImagesInMD(ast, file, setting) {
  visit(ast, 'image', function(node) {
    if (node.url && node.url.trim().length > 0) {
      doesImageExist(file, node.url, node);
    }
  });
}

function wfImagesInHTML(ast, file, setting) {
  visit(ast, 'html', function(node) {
    let matched = reImgSrc.exec(node.value);
    if (matched && matched[1]) {
      doesImageExist(file, matched[1], node);
    }
  });
}
