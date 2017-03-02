'use strict';

/*
    wfCodeLabHelper.js
    TODO
 */

var fs = require('fs');
var chalk = require('chalk');
var glob = require('globule');
var moment = require('moment');
var gutil = require('gulp-util');
const path = require('path');
const remark = require('remark');
const remarkHtml = require('remark-html');
const wfRegEx = require('./wfRegEx');
const mkdirp = require('mkdirp');

function updateCodeLab(sourceFile, destFile, bookPath) {
  gutil.log(' ', 'Processing', sourceFile);
  var authorId;
  var metadataFile = sourceFile.replace('index.md', 'codelab.json');
  var metadata = fs.readFileSync(metadataFile);
  metadata = JSON.parse(metadata);
  if (metadata.wfProcessed === true) {
    gutil.log(' ', 'Skipping', sourceFile);
    return;
  }
  try {
    var authorJSON = fs.readFileSync(sourceFile.replace('index.md', 'author.json'));
    authorJSON = JSON.parse(authorJSON);
    authorId = authorJSON.author;
  } catch (ex) {
  }
  metadata.wfProcessed = true;
  var result = [];
  var markdown = fs.readFileSync(sourceFile, 'utf8');
  result.push('project_path: /web/_project.yaml');
  result.push('book_path: ' + bookPath);
  if (metadata.summary) {
    result.push('description: ' + metadata.summary);
  }
  result.push('');
  var dateUpdated = metadata.updated;
  if (!dateUpdated) {
    dateUpdated = moment().format('YYYY-MM-DD');
  }
  result.push('{# wf_auto_generated #}');
  result.push('{# wf_updated_on: ' + dateUpdated + ' #}');
  result.push('{# wf_published_on: 2016-01-01 #}');
  result.push('');
  result.push('');
  result.push('# ' + metadata.title + ' {: .page-title }');
  if (authorId) {
    var authorInfo = '{% include "web/_shared/contributors/{{id}}.html" %}';
    result.push('');
    result.push(authorInfo.replace('{{id}}', authorId));
  }
  markdown = markdown.replace(/^# (.*)\n/, '');
  var feedbackLink = markdown.match(/\[Codelab Feedback\](.*)\n/);
  if (feedbackLink && feedbackLink[0]) {
    markdown = markdown.replace(feedbackLink[0], '');
  }
  markdown = markdown.replace(/^\*Duration is \d+ min\*\n/gm, '');
  markdown = markdown.replace(/\(https:\/\/developers.google.com\//g, '(\/');
  markdown = markdown.replace(/^\[\]\(/gm, '[Link](');
  markdown = markdown.replace(/__\s?Note:\s?__\s?/g, 'Note: ');
  markdown = markdown.replace(/<div class="note">((.|\n)*?)<\/div>/g, '$1');
  markdown = markdown.replace(/<aside markdown="1" class="special">/g, '<aside markdown="1" class="key-point">');
  markdown = markdown.replace(/<aside markdown="1" class="warning">/g, '<aside markdown="1" class="warning">');
  markdown = markdown.replace(/^<a id="(.*?)"\s*\/*?>/gm, '<div id="$1"></div>');
  markdown = markdown.replace(/!\[.+?\]\((.+?)\)\[IMAGEINFO\]:.+,\s*(.+?)\n/gm, '![$2]($1)\n');
  markdown = markdown.replace(/^## Contents?(\n|\s)*(__.*__(\s|\n)*)*/gm, '');
  markdown = markdown.replace(/^(#+) __(.*)__/gm, '$1 $2');

  // Convert markdown inside a set of HTML elements to HTML.
  //   This is required because DevSite's MD parser doesn't handle markdown
  //   inside of HTML. :(
  let matches;
  let RE_ASIDE = /<aside markdown="1" .*?>\n?((.|\n)*?)\n?<\/aside>/gm;
  matches = wfRegEx.getMatches(RE_ASIDE, markdown);
  matches.forEach(function(match) {
    let htmlAside = remark().use(remarkHtml).process(match[0]);
    markdown = markdown.replace(match[0], String(htmlAside));
  });

  let RE_TABLE = /<table markdown="1">((.|\n)*?)<\/table>/gm;
  matches = wfRegEx.getMatches(RE_TABLE, markdown);
  matches.forEach(function(match) {
    let htmlTable = remark().use(remarkHtml).process(match[0]);
    markdown = markdown.replace(match[0], String(htmlTable));
  });

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
