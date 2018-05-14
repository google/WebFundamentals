/**
 * @fileoverview Helper Utility to 'normalize' content exported from CLAAT
 *  to fit the WebFu styles.
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const remark = require('remark');
const moment = require('moment');
const mkdirp = require('mkdirp');
const gutil = require('gulp-util');
const wfRegEx = require('./wfRegEx');
const wfHelper = require('./wfHelper');
const remarkHtml = require('remark-html');

/**
 * Parses & normalizes a markdown file.
 *
 * @param {string} sourceFile Path the the file to read & normalize
 * @param {string} destFile Path to write the normalized file
 * @param {string} bookPath Path to the book.yaml file
 * @param {string} projPath Path to the project.yaml file
 */
function updateCodeLab(sourceFile, destFile, bookPath, projPath) {
  gutil.log(' ', 'Processing', sourceFile);
  let matches;
  let authorId;
  const metadataFile = sourceFile.replace('index.md', 'codelab.json');
  const metadata = JSON.parse(fs.readFileSync(metadataFile));
  if (metadata.wfProcessed === true) {
    gutil.log(' ', 'Skipping', sourceFile);
    return;
  }
  try {
    const authorFile = sourceFile.replace('index.md', 'author.json');
    const authorJSON = JSON.parse(fs.readFileSync(authorFile));
    authorId = authorJSON.author;
  } catch (ex) {
    // Do nothing, it's OK if we can't read it
  }
  metadata.wfProcessed = true;
  let result = [];
  let markdown = fs.readFileSync(sourceFile, 'utf8');
  result.push('project_path: ' + projPath);
  result.push('book_path: ' + bookPath);
  if (metadata.summary) {
    result.push('description: ' + metadata.summary);
  }
  result.push('');
  result.push('{# wf_auto_generated #}');
  let dateUpdated = moment(metadata.updated).utcOffset(0, true);
  if (!dateUpdated) {
    dateUpdated = moment();
  }
  dateUpdated = wfHelper.dateFormatISOShort(dateUpdated);
  result.push('{# wf_updated_on: ' + dateUpdated + ' #}');
  result.push('{# wf_published_on: 2016-01-01 #}');
  result.push('');
  result.push('');
  result.push('# ' + metadata.title + ' {: .page-title }');
  if (authorId) {
    result.push('');
    result.push(`{% include "web/_shared/contributors/${authorId}.html" %}`);
  }
  markdown = markdown.replace(/^# (.*)\n/, '');
  let feedbackLink = markdown.match(/\[Codelab Feedback\](.*)\n/);
  if (feedbackLink && feedbackLink[0]) {
    markdown = markdown.replace(feedbackLink[0], '');
  }

  let re;

  // Eliminate any links to GitBooks
  // eslint-disable-next-line max-len
  re = /https:\/\/google-developer-training\.gitbooks\.io\/progressive-web-apps-ilt-.*?\/content\/docs\/(.*?)\.html/g;
  markdown = markdown.replace(re, function(match) {
    match = match.replace(re, '$1').replace(/_/g, '-');
    return match;
  });

  // Remove .md from URLs in the current directory and change _ to -
  re = /href="(.*?)\.md(.*?)"/g;
  markdown = markdown.replace(re, function(match) {
    if (match.indexOf('/') > 0) {
      return match;
    }
    match = match.replace(re, 'href="$1$2"').replace(/_/g, '-');
    return match;
  });
  re = /\[(.*?)\]\((.*?)\.md(.*?)\)/g;
  markdown = markdown.replace(re, function(match) {
    if (match.indexOf('/') > 0) {
      return match;
    }
    match = match.replace(re, '[$1]($2$3)').replace(/_/g, '-');
    return match;
  });

  re = /(^\d+\. .*?)\n+(#### .*?)?\n*```\n((.|\n)*?)```/gm;
  matches = wfRegEx.getMatches(re, markdown);
  matches.forEach(function(match) {
    let result = match[1] + '\n\n';
    let code = match[3].split('\n');
    code.forEach(function(line) {
      result += '        ' + line + '\n';
    });
    markdown = markdown.replace(match[0], result);
  });

  // Eliminate the Duration on Codelabs
  markdown = markdown.replace(/^\*Duration is \d+ min\*\n/gm, '');

  // Make any links to d.g.c absolute, but not fully qualified
  re = /\(https:\/\/developers.google.com\//g;
  markdown = markdown.replace(re, '(/');
  re = /href="https:\/\/developers.google.com\//g;
  markdown = markdown.replace(re, 'href="/');

  // Change any empty markdown links to simply [Link](url)
  markdown = markdown.replace(/^\[\]\(/gm, '[Link](');

  // Convert Notes to the DevSite syntax
  markdown = markdown.replace(/__\s?Note:\s?__\s?/g, 'Note: ');
  markdown = markdown.replace(/^<strong>Note:<\/strong>/gm, 'Note: ');
  markdown = markdown.replace(/<div class="note">((.|\n)*?)<\/div>/g, '$1');

  // Change any Specials to key-point
  re = /<aside markdown="1" class="special">/g;
  markdown = markdown.replace(re, '<aside markdown="1" class="key-point">');

  // Convert any unclosed named anchors to simple div's
  re = /^<a id="(.*?)"\s*\/*?>/gm;
  markdown = markdown.replace(re, '<div id="$1"></div>');

  // Add image info to images using IMAGEINFO syntax
  re = /!\[.+?\]\((.+?)\)\[IMAGEINFO\]:.+,\s*(.+?)\n/g;
  markdown = markdown.replace(re, '![$2]($1)\n');

  // Replace [ICON HERE] with the correct icon
  re = /(\[ICON HERE\])(.*?)!\[(.*?)]\((.*?)\)/g;
  const repNew = '<img src="$4" style="width:20px;height:20px;" alt="$3"> $2';
  markdown = markdown.replace(re, repNew);

  // Remove the table of contents section
  re = /^## Contents?(\n|\s)+(\[.*?]\(.*?\).*\n+)+/gm;
  markdown = markdown.replace(re, '');

  // Remove any bold from headings
  markdown = markdown.replace(/^(#+) __(.*)__/gm, '$1 $2');

  // Convert markdown inside a set of HTML elements to HTML.
  //   This is required because DevSite's MD parser doesn't handle markdown
  //   inside of HTML. :(
  re = /<aside markdown="1" .*?>\n?((.|\n)*?)\n?<\/aside>/gm;
  matches = wfRegEx.getMatches(re, markdown);
  matches.forEach(function(match) {
    let htmlAside = remark().use(remarkHtml).process(match[0]);
    markdown = markdown.replace(match[0], String(htmlAside));
  });

  // Convert HTML tables with markdown in them to full HTML
  re = /<table markdown="1">((.|\n)*?)<\/table>/gm;
  matches = wfRegEx.getMatches(re, markdown);
  matches.forEach(function(match) {
    let htmlTable = remark().use(remarkHtml).process(match[0]);
    markdown = markdown.replace(match[0], String(htmlTable));
  });

  // Remove any spaces before newlines
  re = /[ ]+\n/g;
  markdown = markdown.replace(re, '\n');

  result.push(markdown);
  if (metadata.feedback) {
    result.push('');
    result.push('');
    result.push('## Found an issue, or have feedback? {: .hide-from-toc }');
    result.push('Help us make our code labs better by submitting an ');
    result.push('[issue](' + metadata.feedback + ') today. And thanks!');
  }
  result = result.join('\n');
  gutil.log('  ', chalk.cyan('->'), destFile);
  let destDir = path.parse(destFile).dir;
  mkdirp.sync(destDir);
  fs.writeFileSync(destFile, result);
}

exports.updateCodeLab = updateCodeLab;
