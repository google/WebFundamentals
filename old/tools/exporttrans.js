#!/usr/bin/env node

/* jshint strict: true, node:true, browser:false */


'use strict';

var fs = require('fs');
var path = require('path');
var under = require('underscore');
var commander = require('commander');
var moment = require('moment');
var common = require('./commontrans');
var AdmZip = require('adm-zip');
var rimraf = require('rimraf');
var YAML = require('js-yaml');
var colors = require('colors/safe');

var _arbs = {};

function handleFile(file) {
  var yaml, markdown, html;

  // Read the contents of the file
  var content = fs.readFileSync(file).toString();

  // Check if the file contains YAML, if it does, separate the two
  // pieces so that they can be dealt with individually.
  if (content.trimLeft().indexOf('---') === 0) {
    var yamlStart = content.indexOf('---') + 3;
    var yamlStop = content.indexOf('---', yamlStart);
    yaml = content.substring(yamlStart, yamlStop);
    try {
      // Convert the YAML string to a YAML object
      var yamlObj = YAML.load(yaml);

      // Get the document priority and compare to the minimum version, if
      // it's below the threshold, skip the file.
      var docPri = yamlObj.priority === undefined ? 2 : yamlObj.priority;
      if (docPri > commander.priority) {
        return {
          status: 'skipped',
          message: 'File was below priority',
          source: file
        };
      }

      // Get the date the document was last updated and compare to the last
      // translated date.  If hasn't been updated since, skip the file
      var lastUpdated;
      try {
        lastUpdated = moment(yamlObj.article.updated_on);
      } catch (ex) {
        // We either couldn't read the date or couldn't parse it, so instead
        // we'll set the last updated date to today.
        lastUpdated = moment();
      }
      if (commander.date.isAfter(lastUpdated) === true) {
        return {
          status: 'skipped',
          message: 'File has not changed.',
          source: file
        };
      }

      // Parse the YAML object and extract the strings we want to translate
      under.extend(_arbs, common.extractStringsFromYaml(yamlObj));
    } catch (ex) {
      // An error occured, most likely while trying to parse the YAML, #fail
      return {
        status: 'error',
        message: 'An error occured',
        source: file,
        ex: ex
      };
    }

    // Get the markdown out of the doc, and then convert it to HTML
    markdown = content.substring(yamlStop + 3);
    html = common.markdownToHTML(markdown);
  } else {
    // The doc is already an HTML document
    html = content;
  }

  // Wrap any remaining Jekyll tags in notranslate divs
  html = common.wrapJekyllTags(html);

  // Extract any table header rows and add to the Strings.arb file
  under.extend(_arbs, common.extractResponsiveTableHeaders(html));

  // If there is YAML, wrap it in notranslate and append it to the top of
  // the newly created HTML doc.
  if (yaml) {
    html = '<div class="notranslate">\n---' + yaml + '---\n</div>\n\n' + html;
  }

  // GTT gets cranky if you submit a file that has no translatable content
  // so we add a single string to the bottom of every file.
  html += common.standardString;

  // Generate the file name for the new file, GTT requires folders to be
  // essentially flat, so we use _-_ as a folder indicator, we also need to
  // rename the file to .html so that GTT doesn't get too upset.
  var newFileName = file.replace(commander.args[0], '');
  if (newFileName.indexOf(path.sep) === 0) {
    newFileName = newFileName.substring(1);
  }
  newFileName = newFileName.replace(/\//g, '_-_');
  newFileName = path.join(commander.temp, newFileName);
  newFileName = newFileName.replace('.markdown', '.html');

  // Attempt to save the new file.
  try {
    fs.writeFileSync(newFileName, html);
  } catch (ex) {
    return {
      status: 'error',
      message: 'Unable to save file',
      source: file,
      dest: newFileName,
      ex: ex
    };
  }
  return {
    status: 'success',
    source: file,
    dest: newFileName
  };
}

function main() {
  var detailLog = '';

  // Create our temporary working directory
  fs.mkdirSync(commander.temp);

  // Walk the source directory and generate the appropriate files.
  var iCount = 0, iSucceeded = 0, iFailed = 0, iSkipped = 0;
  common.recurseDir(commander.args[0], commander.args[0], function(file) {
    if ((file.endsWith('.html')) || (file.endsWith('.markdown'))) {
      iCount++;
      var result = handleFile(file, commander.temp);
      if (result.status === 'success') {
        console.log(colors.green('\u2714 %s'), file);
        iSucceeded++;
      } else if (result.status === 'skipped') {
        if (commander.verbose) {
          console.log(colors.yellow('- %s'), file);
        }
        iSkipped++;
      } else {
        console.log(colors.red('\u2718 %s'), file);
        iFailed++;
        detailLog += result.source + '\n';
        detailLog += '  ' + result.message + '\n';
        if (result.ex) {
          detailLog += '  ' + result.ex.message;
        }
        detailLog += '\n\n';
      }
    }
  });

  // write the ARBs file
  var arbsFile = path.join(commander.temp, 'strings.arb');
  common.writeArbs(arbsFile, _arbs);

  // Get the template localization file and add it to the ZIP
  var stringsFile = '../../_data/localized_strings/en.json';
  stringsFile = path.join(commander.args[0], stringsFile);
  var templateStringsArb = common.readArbs(stringsFile);
  var templateStringsFileName = path.join(commander.temp, 'templates-strings.arb');
  common.writeArbs(templateStringsFileName, templateStringsArb);


  // Get the _betterbook-*.yaml files, convert them to ARB files and add them
  // to the ZIP
  var bbYamlFiles = fs.readdirSync(path.join(commander.args[0], '../..'));
  for (var i = 0; i < bbYamlFiles.length; i++) {
    var bbFile = bbYamlFiles[i];
    if ((bbFile.indexOf('_betterbook-') === 0) && (bbFile.endsWith('.yaml'))) {
      var bbFileWithPath = path.join(commander.args[0], '../..', bbFile);
      var bBookYaml = YAML.load(fs.readFileSync(bbFileWithPath));
      var bBookArb = common.extractStringsFromYaml(bBookYaml);
      var arbFile = bbFile.replace('.yaml', '.arb');
      var bbArbFile = path.join(commander.temp, arbFile);
      common.writeArbs(bbArbFile, bBookArb);
    }
  }


  // Create the ZIP file with the necessary files.
  var zip = new AdmZip();
  common.recurseDir(commander.temp, commander.temp, function(file) {
    zip.addLocalFile(file);
  });
  zip.writeZip(commander.output);

  // Remove the working directory
  if (commander.verbose === undefined) {
    rimraf(commander.temp, function(err) {
      if (err) {
        console.log(colors.red('Error: Unable to remove temporary directory.'));
      }
    });
  }
  console.log('Files inspected:', iCount);
  console.log('Success: ', colors.green(iSucceeded.toString()));
  console.log('Skipped: ', colors.yellow(iSkipped.toString()));
  console.log('Errors:  ', colors.red(iFailed.toString()));
  console.log('ZIP file created:', colors.cyan(commander.output));
  if (detailLog.length > 0) {
    var dlHeader = 'WebFundamentals ExportTrans Log\n';
    dlHeader += new Date() + '\n\n';
    fs.writeFileSync('exporttrans.log', dlHeader + detailLog);
    console.log(' See', colors.red('exporttrans.log'), 'for details.');
  }
}


function init() {
  var tempDir = '_exporttrans-' + Date.now();
  var defaultFile = 'WebFundamentals-' + moment().format('YYYYMMDD') + '.zip';
  console.log('WebFundamentals ExportTrans');
  commander
    .version('0.0.1')
    .usage('[options] <path to _en>')
    .option('-p, --priority <#>', 'Maximum priority for files (1)', 1)
    .option('-d, --date <YYYY-MM-DD>', 'Cut off date for file selection (2000-01-01)', '2000-01-01')
    .option('-o, --output <filename>', 'ZIP file to create', defaultFile)
    .option('-t, --temp <path>', 'Temporary directory', tempDir)
    .option('-v, --verbose', 'Verbose and debug output')
    .parse(process.argv);

  if (commander.args.length !== 1) {
    commander.help();
    return;
  }

  if (fs.existsSync(commander.output) === true) {
    console.log(colors.yellow('Warning: output file exists, will be overwritten.'));
  }

  var errors = [];

  commander.date = moment(commander.date, 'YYYY-MM-DD');
  if (commander.date.isValid() === false) {
    errors.push(colors.red('Error: Invalid date format, try 2014-01-01'));
  }

  var pri = parseInt(commander.priority, 10);
  if ((pri < 0) || (under.isNaN(pri) === true)) {
    errors.push(colors.red('Error: Priority must be an integer greater >= 0'));
  }

  if (errors.length === 0) {
    main(commander.args[0], commander.files, commander.temp, commander.output);
  } else {
    under.each(errors, function(elem) {
      console.log(elem);
    });
  }
}


init();
