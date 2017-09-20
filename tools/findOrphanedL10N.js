'use strict';

const fs = require('fs');
const glob = require('globule');
const chalk = require('chalk');

let opts = {
  prefixBase: false
};
const langs = [
  'ar', 'de', 'es', 'fr', 'he', 'hi', 'id', 'it', 'ja', 'ko', 'nl',
  'pl', 'pt-br', 'ru', 'tr', 'zh-cn', 'zh-tw'];
const patterns = ['**/*/*.md', '**/*/index.yaml'];

function go(lang) {
  opts.srcBase = `src/content/${lang}/`;
  console.log(chalk.cyan(opts.srcBase));
  const files = glob.find(patterns, opts);
  files.forEach((file) => {
    try {
      const enVersion = 'src/content/en/' + file;
      fs.accessSync(enVersion, fs.R_OK);
    } catch (ex) {
      console.log(chalk.red('NO'), file)
    }
  });
  console.log('');
}

langs.forEach((lang) => {
  go(lang);
});
