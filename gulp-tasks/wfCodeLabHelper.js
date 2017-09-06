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

function updateCodeLab(sourceFile, destFile, bookPath, projPath) {
  gutil.log(' ', 'Processing', sourceFile);
  let matches;
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
  result.push('project_path: ' + projPath);
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

  // Eliminate any links to GitBooks
  let reGitBooks = /https:\/\/google-developer-training\.gitbooks\.io\/progressive-web-apps-ilt-.*?\/content\/docs\/(.*?)\.html/g;
  markdown = markdown.replace(reGitBooks, function(match) {
    match = match.replace(reGitBooks, '$1').replace(/_/g, '-');
    return match; 
  });

  // Remove .md from URLs in the current directory and change _ to -
  let reLinks = /href="(.*?)\.md(.*?)"/g;
  markdown = markdown.replace(reLinks, function(match) {
    if (match.indexOf('/') > 0) {
      return match;
    }
    match = match.replace(reLinks, 'href="$1$2"').replace(/_/g, '-');
    return match;
  });
  reLinks = /\[(.*?)\]\((.*?)\.md(.*?)\)/g;
  markdown = markdown.replace(reLinks, function(match) {
    if (match.indexOf('/') > 0) {
      return match;
    }
    match = match.replace(reLinks, '[$1]($2$3)').replace(/_/g, '-');
    return match;
  });

  let reCodeInOL = /(^\d+\. .*?)\n+(#### .*?)?\n*```\n((.|\n)*?)```/gm;
  matches = wfRegEx.getMatches(reCodeInOL, markdown);
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
  markdown = markdown.replace(/\(https:\/\/developers.google.com\//g, '(\/');
  markdown = markdown.replace(/href="https:\/\/developers.google.com\//g, 'href="/');

  // Change any empty markdown links to simply [Link](url)
  markdown = markdown.replace(/^\[\]\(/gm, '[Link](');

  // Convert Notes to the DevSite syntax
  markdown = markdown.replace(/__\s?Note:\s?__\s?/g, 'Note: ');
  markdown = markdown.replace(/^<strong>Note:<\/strong>/gm, 'Note: ');
  markdown = markdown.replace(/<div class="note">((.|\n)*?)<\/div>/g, '$1');

  // Change any Specials to key-point
  markdown = markdown.replace(/<aside markdown="1" class="special">/g, '<aside markdown="1" class="key-point">');
  
  // Convert any unclosed named anchors to simple div's
  markdown = markdown.replace(/^<a id="(.*?)"\s*\/*?>/gm, '<div id="$1"></div>');
  
  // Add image info to images using IMAGEINFO syntax
  markdown = markdown.replace(/!\[.+?\]\((.+?)\)\[IMAGEINFO\]:.+,\s*(.+?)\n/g, '![$2]($1)\n');
  
  // Replace [ICON HERE] with the correct icon
  markdown = markdown.replace(/(\[ICON HERE\])(.*?)!\[(.*?)]\((.*?)\)/g, '<img src="$4" style="width:20px;height:20px;" alt="$3"> $2');

  // Remove the table of contents section
  markdown = markdown.replace(/^## Contents?(\n|\s)+(\[.*?]\(.*?\).*\n+)+/gm, '');
  
  // Remove any bold from headings
  markdown = markdown.replace(/^(#+) __(.*)__/gm, '$1 $2');

  // Convert markdown inside a set of HTML elements to HTML.
  //   This is required because DevSite's MD parser doesn't handle markdown
  //   inside of HTML. :(
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
