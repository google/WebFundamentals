'use strict';

/*
    wfGlossary.js
    Reads the glossary.yaml file and uses Handlebars to generate the
    glossary file.
 */

const fs = require('fs-extra');
const path = require('path');
const jsYaml = require('js-yaml');
const gutil = require('gulp-util');
const wfHelper = require('./wfHelper');
const wfTemplateHelper = require('./wfTemplateHelper');
const Handlebars = require('handlebars');
require('handlebars-helpers')();

const GLOSSARY_FILE = './src/data/glossary.yaml';
const TEMPLATE = './src/templates/fundamentals/glossary.md';
const DEST_FILE = './src/content/en/fundamentals/glossary.md';

function buildGlossary(glossary) {
  gutil.log(' ', 'Building glossary');
  const ts = fs.readFileSync(TEMPLATE, 'utf8');
  const template = Handlebars.compile(ts);
  let terms = {};
  glossary.forEach((term) => {
    const firstChar = term.term.trim()[0].toUpperCase();
    if (!terms[firstChar]) {
      terms[firstChar] = [];
    }
    terms[firstChar].push(term);
  });
  const result = template({sortedTerms: terms});
  fs.outputFileSync(DEST_FILE, result);
}

function build() {
  gutil.log(' ', 'Reading contributors.yaml file...');
  const contents = fs.readFileSync(GLOSSARY_FILE, 'utf8');
  const glossaryYaml = jsYaml.safeLoad(contents);
  buildGlossary(glossaryYaml);
}

exports.build = build;
