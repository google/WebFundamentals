#!/usr/bin/env node

/* jshint strict: true, node:true, browser:false */


'use strict';

var fs = require('fs');
var path = require('path');
var YAML = require('js-yaml');
var md5 = require('blueimp-md5');
var under = require('underscore');
var commander = require('commander');
var AdmZip = require('adm-zip');
var rimraf = require('rimraf');
var common = require('./commontrans');
var mkdirp = require('mkdirp');
var colors = require('colors/safe');

function importLanguage(pathToLang, lang) {

  var wfRootForLang = path.join(commander.wfroot, '_' + lang);

  var result = {
    lang: lang,
    count: 0,
    success: 0,
    warning: 0,
    error: 0,
    skipped: 0,
    details: []
  };

  var arbs = {};

  var arbsFile = path.join(pathToLang, 'strings.arb');
  if (fs.existsSync(arbsFile) === true) {
    try {
      arbs = common.readArbs(arbsFile);
      result.success++;
    } catch (ex) {
      var msg = {
        file: 'strings.arb',
        lang: lang,
        error: ex
      };
      result.details.push(msg);
      console.log(colors.red('\u2718 Error reading or parsing strings.arb file.'));
    }
  }

  arbsFile = path.join(pathToLang, 'templates-strings.arb');
  if (fs.existsSync(arbsFile) === true) {
    // Copy the template strings file to the appropriate location
    try {
      var templateArbs = common.readArbs(arbsFile);
      var localizedTemplateStrings = path.join(commander.wfroot, '_data', 'localized_strings', lang + '.json');
      mkdirp.sync(path.dirname(localizedTemplateStrings));
      fs.writeFileSync(localizedTemplateStrings, JSON.stringify(templateArbs, null, 2));
      result.success++;
    } catch (ex) {
      var msg = {
        file: lang + '.json',
        lang: lang,
        error: ex
      };
      result.details.push(msg);
      console.log(colors.red('\u2718 Error copying template strings.'));
    }
  }

  arbsFile = path.join(pathToLang, 'betterbook.arb');
  if (fs.existsSync(arbsFile) === true) {
    // Copy the _betterbook.yaml and update it with the latest translations
    try {
      var bbArbs = common.readArbs(arbsFile);
      var betterBookFile = path.join(commander.wfroot, '_betterbook.yaml');
      var enBetterBook = fs.readFileSync(betterBookFile);
      var localizedBetterBook = common.replaceStringsInYaml(enBetterBook, bbArbs);
      betterBookFile = path.join(wfRootForLang, '_betterbook.yaml');
      mkdirp.sync(path.dirname(betterBookFile));
      fs.writeFileSync(betterBookFile, localizedBetterBook);
      result.success++;
    } catch (ex) {
      var msg = {
        file: 'betterbook.arb',
        lang: lang,
        error: ex
      };
      result.details.push(msg);
      console.log(colors.red('\u2718 Error reading or parsing betterbook.arb.'));
    }
  }

  // Get the list of files
  common.recurseDir(pathToLang, pathToLang, function(file) {
    result.count++;
    if (file.endsWith('.arb')) {
      // Do nothing, we've already processed this file types
    } else if (file.endsWith('.html')) {
      var html = null, yaml = null, markdown = null, error = false;

      // Read the file
      var content = fs.readFileSync(file).toString();

      content = common.gttCleanup(content);

      // If there is a notranslate block around the YAML, remove it.
      content = content.replace(/<div class="notranslate">\n---/, '---');
      content = content.replace(/---\n<\/div>/, '---');

      // Check if the file contains a YAML block, if it does, separate it
      // from the HTML, then replace the appropriate strings in the YAML
      // with the translated components from strings.arb.
      if (content.trim().indexOf('---') === 0) {
        var yamlStart = content.indexOf('---') + 3;
        var yamlStop = content.indexOf('---', yamlStart);
        yaml = content.substring(yamlStart, yamlStop);

        // Replace strings in YAML, this function takes YAML as string
        // and returns it as a string.
        try {
          yaml = common.replaceStringsInYaml(yaml, arbs);
        } catch (ex) {
          error = true;
          result.error++;
          var err = {
            file: file,
            lang: lang,
            error: ex
          };
          result.details.push(err);
          console.log(colors.red('\u2718 %s'), file);
          var msg = ex.message;
          if (msg.indexOf('JS-YAML') === 0) {
            console.log('  ', colors.red(msg.substring(0, msg.indexOf('\n') - 1)));
          } else {
            console.log('  ', colors.red(msg));
          }
        }

        // The YAML parser returns empty keys as null, we want to remove
        // them for consistency.
        yaml = yaml.replace(/ null/g, '');

        // Isolate the HTML from the YAML
        html = content.substring(yamlStop + 3);
      } else {
        html = content;
      }

      // Search the HTML for any responsive table headers and replace those
      // with the translated versions from strings.arb
      html = common.replaceResponsiveTableHeaders(html, arbs);

      // Convert the HTML back to markdown, this process isn't perfect but
      // it does remove about 90% of the HTML and get the file close to it's
      // original state.
      markdown = common.htmlToMarkdown(html);

      // Create the new doc
      var newDoc = '';

      // If there's YAML, put it first, wrapped in three dashes
      if (yaml) {
        newDoc += '---\n' + yaml + '\n---';
      }

      // Add the markdown that we converted earlier.
      newDoc += markdown;

      // Figure out the appropriate file name, remove the temporary folder
      // path, and unflatten the files.
      var newFileName = file;
      newFileName = newFileName.replace(pathToLang, '');
      newFileName = newFileName.replace(/_-_/g, path.sep);

      // If there is YAML in the file, rename it from .html to .markdown
      if (yaml) {
        newFileName = newFileName.replace('.html', '.markdown');
      }
      newFileName = path.join(wfRootForLang, newFileName);

      // Check if the file exists already
      // TODO: Add a check to see if we should update the file or not
      if (fs.existsSync(newFileName) === true) {
        error = true;
        result.warning++;
        var err = {
          file: file,
          lang: lang,
          error: {
            message: 'File already exists.'
          }
        };
        result.details.push(err);
        console.log(colors.red('? %s'), file);
        console.log('  ', colors.red('Translated file already exists, not overwriting it.'));
        var newFileNameExt = path.extname(newFileName);
        newFileName = newFileName.replace(newFileNameExt, '-new' + newFileNameExt);
      }

      // If necessary, recursivly create the directory for the new file.
      mkdirp.sync(path.dirname(newFileName));
      fs.writeFileSync(newFileName, newDoc);
      if (error === false) {
        result.success++;
        console.log(colors.green('\u2714 %s'), newFileName);
      }
    } else {
      result.skipped++;
    }
  });
  return result;
}


function main(pathToFiles, removeWhenDone) {

  var totals = {
    langs: [],
    count: 0,
    success: 0,
    warning: 0,
    error: 0,
    skipped: 0,
    details: []
  };

  // Get the list of translated languages
  var languages = fs.readdirSync(pathToFiles);
  under.each(languages, function(lang) {
    var pathToLang = path.join(pathToFiles, lang);
    var stat = fs.statSync(pathToLang);
    if (stat.isDirectory() && (lang !== 'en')) {
      totals.langs.push(colors.cyan(lang));
      console.log('Starting language:', colors.cyan(lang));
      var result = importLanguage(pathToLang, lang);
      totals.count += result.count;
      totals.success += result.success;
      totals.error += result.error;
      totals.skipped += result.skipped;
      totals.details = totals.details.concat(result.details);
    } else {
      console.log('Skipped: ', colors.yellow(lang));
    }
  });

  console.log('Languages:', totals.langs.length, totals.langs.join(', '));
  console.log('Files:', colors.cyan(totals.count));
  console.log('Success:', colors.green(totals.success));
  console.log('Warnings:', colors.yellow(totals.warning));
  console.log('Skipped:', colors.yellow(totals.skipped));
  console.log('Errors:', colors.red(totals.error));
  if (totals.details.length > 0) {
    console.log(' See', colors.red('importtrans.log'), 'for details.');
    console.log(' Source files retained in:', commander.temp);
    var errorLog = 'WebFundamentals ImportTrans Log\n';
    errorLog += new Date() + '\n';
    errorLog += 'Working directory: ' + pathToFiles + '\n\n';
    under.each(totals.details, function(err) {
      errorLog += err.file + '\n';
      var msg = err.error.message;
      errorLog += '  ' + msg + '\n\n';
    });
    fs.writeFileSync('importtrans.log', errorLog);
  }

  if ((removeWhenDone === true) && (totals.details.length === 0)) {
    rimraf(pathToFiles, function(err) {
      if (err) {
        console.log(colors.red('Error: Unable to remove folder.'));
      }
    });
  }
}

function unzipPackage() {
  var zip = new AdmZip(commander.args[0]);
  zip.extractAllTo(commander.temp, true);
  var languages = fs.readdirSync(commander.temp);
  under.each(languages, function(lang) {
    var langDir = path.join(commander.temp, lang);
    var files = fs.readdirSync(langDir);
    var langZip = new AdmZip(path.join(langDir, files[0]));
    langZip.extractAllTo(langDir, true);
    fs.unlink(path.join(langDir, files[0]));
  });
}

function init() {
  var tempDir = '_importtrans-' + Date.now();
  commander
    .version('0.4.1')
    .usage('[options] <file|folder containing translated files>')
    .option('-r, --wfroot [./site/]', 'Path to Web Fundamentals root', './site/')
    .option('-t, --temp [path]', 'Temporary directory', tempDir)
    .option('-v, --verbose', 'Verbose and debug output')
    .parse(process.argv);

  if (commander.args.length === 0) {
    commander.help();
    return;
  }

  if (commander.args[0].endsWith('.zip') === true) {
    unzipPackage();
    main(commander.temp, true);
  } else {
    main(commander.args[0], false);
  }

}


init();


