'use strict';

/*
    importTranslation.js
 */

const fs = require('fs');
const chalk = require('chalk');
const glob = require('globule');
const path = require('path');
const wfRegEx = require('../gulp-tasks/wfRegEx');
const moment = require('moment');

const DEST_LANG = 'zh-cn';
const SOURCE_LANG = 'ZHCN';
const SOURCE_ROOT = `../../Desktop/loc/${SOURCE_LANG}/web_fundamentals/`;
const DEST_ROOT = `src/content/${DEST_LANG}`;

function getFileList(base) {
  let opts = {
    srcBase: base,
    prefixBase: true,
    filter: 'isFile'
  };
  return glob.find('**/*', opts);
}

function readFile(filename) {
  try {
    let contents = fs.readFileSync(filename, 'utf8');
    return contents;
  } catch (ex) {
    return null;
  }
}

function importFile(sourceFile) {
  console.log(sourceFile);

  if (sourceFile.indexOf('_toc.yaml') >= 0) {
    console.log('->', chalk.yellow('SKIP '), 'Skipping', chalk.cyan('_toc.yaml'));
    return;
  }
  if (sourceFile.indexOf('_book.yaml') >= 0) {
    console.log('->', chalk.yellow('SKIP '), 'Skipping', chalk.cyan('_book.yaml'));
    return;
  }
  if (sourceFile.indexOf('_redirects.yaml') >= 0) {
    console.log('->', chalk.yellow('SKIP '), 'Skipping', chalk.cyan('_redirects.yaml'));
    return;
  }

  let destFile = path.join(DEST_ROOT, sourceFile.replace(SOURCE_ROOT, ''));

  let sourceContents = readFile(sourceFile);
  if (!sourceContents) {
    console.log('->', chalk.red('ERROR'), 'Unable to read source file');
    return;
  }

  let destContents = readFile(destFile);
  if (destContents) {
    let matched;
    let destLastUpdated;
    let sourceLastUpdated;
    matched = wfRegEx.RE_UPDATED_ON.exec(sourceContents);
    if (matched && matched[1]) {
      sourceLastUpdated = moment(matched[1]);
    }
    matched = wfRegEx.RE_UPDATED_ON.exec(destContents);
    if (matched && matched[1]) {
      destLastUpdated = moment(matched[1]);
    }
    if (sourceLastUpdated && destLastUpdated) {
      if (destLastUpdated.isAfter(sourceLastUpdated)) {
        console.log('->', chalk.yellow('SKIP '), 'Existing translation is newer.');
        return;
      }
    }
  }

  if (sourceFile.endsWith('.md')) {
    sourceContents += '\n\n{# wf_devsite_translation #}\n';
    // sourceContents = sourceContents.replace('http://goo.gl/jhXCBy', 'https://goo.gl/jhXCBy');
    // sourceContents = sourceContents.replace(/^#\s+(.+[\S]){: \.page-title }\n/gm, '# $1 {: .page-title }\n');
    // sourceContents = sourceContents.replace(/\/web\/fundamentals\/primers\/service-worker\/\?hl=en/g, '/web/fundamentals/primers/service-worker/');
    // sourceContents = sourceContents.replace(/\/ofhbbkphhbklhfoeikjpcbhemlocgigb\?hl=en/g, '/ofhbbkphhbklhfoeikjpcbhemlocgigb');
    // sourceContents = sourceContents.replace('‘https://developers.google.com/web/\'', '[developers.google.com](/web/)');
  }
  try {
    fs.writeFileSync(destFile, sourceContents, 'utf8');
    return;
  } catch (ex) {
    console.log('->', chalk.red('ERROR'), ex.message);
  }
}

getFileList(SOURCE_ROOT).forEach(importFile);
