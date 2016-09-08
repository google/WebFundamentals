'use strict';

/*
    wfCodeLabHelper.js
    TODO
 */

var fs = require('fs');
var glob = require('globule');
var moment = require('moment');
var gutil = require('gulp-util');

function updateCodeLab(fileName) {
  var metadataFile = fileName.replace('index.md', 'codelab.json');
  var metadata = fs.readFileSync(metadataFile);
  metadata = JSON.parse(metadata);
  if (metadata.wfProcessed === true) {
    gutil.log(' ', 'Skipping', fileName);
    return;
  }
  gutil.log(' ', 'Processing', fileName);
  metadata.wfProcessed = true;
  var result = [];
  var markdown = fs.readFileSync(fileName, 'utf8');
  result.push('project_path: /web/_project.yaml');
  result.push('book_path: /web/fundamentals/_book.yaml');
  if (metadata.summary) {
    result.push('description: ' + metadata.summary);
  }
  result.push('');
  var dateUpdated = metadata.updated;
  if (!dateUpdated) {
    dateUpdated = moment().format('YYYY-MM-DD');
  }
  result.push('{# wf_updated_on: ' + dateUpdated + ' #}');
  result.push('');
  result.push('');
  result.push('# ' + metadata.title + ' {: page-title }');
  markdown = markdown.replace(/^# (.*)\n/, '');
  var feedbackLink = markdown.match(/\[Codelab Feedback\](.*)\n/);
  if (feedbackLink && feedbackLink[0]) {
    markdown = markdown.replace(feedbackLink[0], '');
  }
  markdown = markdown.replace(/^\*Duration is \d+ min\*\n/gm, '');
  result.push(markdown);
  if (metadata.feedback) {
    result.push('');
    result.push('');
    result.push('## Found an issue, or have feedback? {: .hide-from-toc }');
    result.push('Help us make our code labs better by submitting an ');
    result.push('[issue](' + metadata.feedback + ') today. And thanks!');
  }
  result = result.join('\n');
  fs.writeFileSync(fileName, result);
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));
}

function migrate(startPath) {
  var opts = {
    srcBase: startPath,
    prefixBase: true
  };
  var files = glob.find('**/index.md', opts);
  files.forEach(updateCodeLab);
}

exports.migrate = migrate;
