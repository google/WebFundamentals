#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var moment = require('moment');
var commander = require('commander');
var YAML = require('js-yaml');
var colors = require('colors/safe');
var AdmZip = require('adm-zip');
var rimraf = require('rimraf');

if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
  });
}

function recurseDir(dir, rootDir, callback) {
  if (dir.indexOf('_code') === -1) {
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
      var file = path.join(dir, files[i]);
      var stat = fs.statSync(file);
      if (stat.isDirectory()) {
        recurseDir(file, rootDir, callback);
      } else {
        if (file.indexOf('DS_Store') === -1) {
          callback(file);
        }
      }
    }
  }
}

function copyFile(source, destination) {
  fs.writeFileSync(destination, fs.readFileSync(source));
}

function requiresTranslation(filename) {

  // Read the contents of the file
  var content = fs.readFileSync(filename).toString();

  if (content.trimLeft().indexOf('---') === 0) {
    var yamlObj;
    var yamlStart = content.indexOf('---') + 3;
    var yamlStop = content.indexOf('---', yamlStart);
    var yaml = content.substring(yamlStart, yamlStop);
    try {
      yamlObj = YAML.load(yaml);
    } catch (ex) {
      console.log(colors.red('Error:'), 'Unable to parse YAML in file:', filename);
      return false;
    }

    // If published: false - skip
    if (yamlObj.published === false) {
      return false;
    }

    // Check the translation priority
    var translationPriority = yamlObj.translation_priority;
    if (translationPriority === undefined) {
      translationPriority = 2;
    }
    if (translationPriority > commander.priority) {
      return false;
    }

    // Check the date the article was last updated
    var lastUpdated = moment(yamlObj.lastUpdated);
    if (commander.date.isAfter(lastUpdated) === true) {
      return false;
    }

    return true;
  }
  return true;
}

function main() {
  var countAllFiles = 0;
  var countFilesToTranslate = 0;

  // Create our temporary working directory
  fs.mkdirSync(commander.temp);

  // Copy the EN strings file
  copyFile(commander.pathToStrings, path.join(commander.temp, 'en.arbs'));
  countAllFiles++;

  // Walk the source directory and generate the appropriate files.
  recurseDir(commander.pathToEn, commander.pathToEn, function(filename) {
    if ((filename.endsWith('.html')) || (filename.endsWith('.markdown'))) {

      // Check if the file needs to be translated or not
      if (requiresTranslation(filename) === true) {

        // Create the new file name by removing the source path and flattening
        // the path down to a single directory.
        var newFilename = filename.replace(commander.pathToEn, '');
        newFilename = newFilename.replace(/\//g, '_-_');
        copyFile(filename, path.join(commander.temp, newFilename));

        if (commander.verbose) {
          console.log(colors.green('\u2714 %s'), filename);
        }
      } else {
        if (commander.verbose) {
          console.log(colors.yellow('- %s'), filename);
        }
      }
    }
    countAllFiles++;
  });

  var zip = new AdmZip();
  recurseDir(commander.temp, commander.temp, function(filename) {
    zip.addLocalFile(filename);
    countFilesToTranslate++;
  });
  zip.writeZip(commander.output);

  if (commander.keep !== true) {
    rimraf(commander.temp, function(err) {
      if (err) {
        console.log(colors.red('Error: Unable to remove temporary directory.'));
      }
    });
  }

  console.log('Files inspected:    ', countAllFiles);
  console.log('Files to translate: ', colors.green(countFilesToTranslate));
  console.log('ZIP file created:   ', colors.cyan(commander.output));
}

function init() {
  var tempDir = '_exporttrans-' + Date.now();
  var defaultFile = 'WebFundamentals-' + moment().format('YYYYMMDD') + '.zip';
  console.log('WebFundamentals ExportTrans');
  commander
    .version('0.0.1')
    .usage('[options]')
    .option('-p, --priority <#>', 'Maximum priority for files (1)', 1)
    .option('-d, --date <YYYY-MM-DD>', 'Cut off date for file selection (2000-01-01)', '2000-01-01')
    .option('-o, --output <filename>', 'ZIP file to create', defaultFile)
    .option('-t, --temp <path>', 'Temporary directory', tempDir)
    .option('-k, --keep', 'Keep temporary directory', false)
    .option('-v, --verbose', 'Verbose and debug output', false)
    .parse(process.argv);

  commander.date = moment(commander.date, 'YYYY-MM-DD');
  commander.pathToEn = 'src/content/en/';
  commander.pathToStrings = 'src/jekyll/_data/localized_strings/en.json';

  if (fs.existsSync(commander.output) === true) {
    console.log(colors.yellow('Warning:'), 'output file exists, will be overwritten.');
  }

  if (commander.date.isValid() === false) {
    console.log(colors.red('Error:'), 'Invalid date format, try 2014-01-01');
    return;
  }

  var p = parseInt(commander.priority, 10);
  if ((p >= 0) && (p <= 10)) {
    commander.priority = p;
  } else {
    console.log(colors.red('Error:'), 'Invalid priority, must be an integer between 0-10');
    return;
  }

  main();

}

init();
