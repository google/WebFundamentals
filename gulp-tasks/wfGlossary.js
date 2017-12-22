/**
 * @fileoverview Reads the glossary.yaml file and uses Handlebars to
 *  generate the glossary file.
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const fs = require('fs-extra');
const jsYaml = require('js-yaml');
const gutil = require('gulp-util');
const Handlebars = require('handlebars');
require('handlebars-helpers')();

const GLOSSARY_FILE = './src/data/glossary.yaml';
const TEMPLATE = './src/templates/fundamentals/glossary.md';
const DEST_FILE = './src/content/en/fundamentals/glossary.md';

/**
 * Parses the glossary data file and renders the markdown version.
 *
 * @param {Array} glossary The parsed glossary data.
 */
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
  const context = {
    sortedTerms: terms,
  };
  const result = template(context);
  fs.outputFileSync(DEST_FILE, result);
}

/**
 * Reads glossary data file and generates a markdown version file.
 */
function build() {
  gutil.log(' ', 'Reading glossary.yaml file...');
  const contents = fs.readFileSync(GLOSSARY_FILE, 'utf8');
  const glossaryYaml = jsYaml.safeLoad(contents);
  buildGlossary(glossaryYaml);
}

exports.build = build;
