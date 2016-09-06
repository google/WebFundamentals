'use strict';

/*
    generate-updates.js


 */

var path = require('path');
var log = require('./wf-Logger.js');
var wfHelper = require('./wf-Helpers.js');
var wfTemplater = require('./wf-Templater.js');

var SECTION = 'updates';
var ROOT_PATH = './src/content/en/updates/';
var FILES_TO_IGNORE = ['index.md', '_template.md'];

var rssDescription = 'The latest and freshest updates from the Web teams at Google. Chrome, Tooling and more.';

var files = wfHelper.getFileList(ROOT_PATH, true, FILES_TO_IGNORE);
files.sort(wfHelper.publishedComparator);
// console.log(files);
wfTemplater.generateIndex(SECTION, files);
wfTemplater.generateRSS(SECTION, rssDescription, files);
wfTemplater.generateATOM(SECTION, rssDescription, files);
// writeIndex(files);
// writeRSS(files);
// writeATOM(files);
