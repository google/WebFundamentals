'use strict';

/*
    build-sections.js

    Generates necessary index files, including:
    homepage, tocs, year indexes, RSS and ATOM feeds for updates and showcase
 */

var fs = require('fs');
var path = require('path');
var moment = require('moment');

var CODELAB_ROOT = './src/content/en/fundamentals/getting-started/codelabs/';

function updateCodeLab(directory) {
  var docHead = '';
  var docFooter = '\n\n';

  var fileName = path.join(directory, 'index.md');
  var markdown = fs.readFileSync(fileName, 'utf8');
  if (markdown.indexOf('project_path: /web/_project.yaml') >= 0) {
    console.log('Skipping', fileName, 'it already be ready.');
    return;
  }
  var metadata = fs.readFileSync(path.join(directory, 'codelab.json'));
  metadata = JSON.parse(metadata);

  docHead = 'project_path: /web/_project.yaml\n';
  docHead += 'book_path: /web/fundamentals/_book.yaml\n';
  docHead += 'description: ';
  docHead += metadata.summary;
  docHead += '\n\n';
  docHead += '{# wf_updated_on: ' + metadata.updated + ' #}\n\n';

  var title = '# ' + metadata.title + ' {: .page-title }';
  markdown = markdown.replace(/^# (.*)/, title);
  var feedbackLink = markdown.match(/\[Codelab Feedback\](.*)\n/);
  if (feedbackLink && feedbackLink[0]) {
    markdown = markdown.replace(feedbackLink[0], '');
  }

  if (metadata.feedback) {
    docFooter += '\n\n';
    docFooter += '## Found an issue, or have feedback? {: .hide-from-toc }\n\n';
    docFooter += 'Help us make our code labs better by submitting an ';
    docFooter += '[issue](' + metadata.feedback + ') today. And thanks!';
  }

  var result = docHead + markdown + docFooter;
  fs.writeFileSync(fileName, result);
}

function run() {
  var directories = fs.readdirSync(CODELAB_ROOT);
  directories.forEach(function(directory) {
    var fullPath = path.join(CODELAB_ROOT, directory);
    if (fs.statSync(fullPath).isDirectory()) {
      updateCodeLab(fullPath);
    }
  });
}

run();
