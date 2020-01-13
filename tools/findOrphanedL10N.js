/* eslint-disable require-jsdoc */
/* eslint-disable no-console */
/**
 * @fileoverview Finds translated docs that no longer have a matching EN
 *  version.
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const fs = require('fs');
const glob = require('globule');
const chalk = require('chalk');

const DELETE_ORPHANED = true;
const opts = {
  prefixBase: false,
};
const langs = [
  'ar', 'de', 'es', 'fr', 'he', 'hi', 'id', 'it', 'ja', 'ko', 'nl',
  'pl', 'pt-br', 'ru', 'tr', 'zh-cn', 'zh-tw'];
const patterns = ['**/*/*.md', '**/*/index.yaml', '**/*/_index.yaml'];

function deleteFile(filePath) {
  if (!DELETE_ORPHANED) {
    console.log(chalk.red('ORPHANED'), filePath);
    return;
  }
  try {
    fs.unlinkSync(filePath);
    console.log(chalk.red('DELETED'), filePath);
  } catch (ex) {
    console.log(chalk.red('DELETE failed'), filePath);
    console.log(ex);
  }
}

function go(lang) {
  opts.srcBase = `src/content/${lang}/`;
  console.log(chalk.cyan(opts.srcBase));
  const files = glob.find(patterns, opts);
  files.forEach((file) => {
    try {
      const enVersion = 'src/content/en/' + file;
      fs.accessSync(enVersion, fs.R_OK);
    } catch (ex) {
      deleteFile(opts.srcBase + file);
    }
  });
  console.log('');
}

langs.forEach((lang) => {
  go(lang);
});
