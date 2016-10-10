'use strict';

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var glob = require('globule');
var moment = require('moment');
var jsYaml = require('js-yaml');
var gutil = require('gulp-util');
var wfHelper = require('./wfHelper');

var TEST_ROOT = 'src/content/';
var STD_EXCLUDES = [
  '!**/_common-links.md',
  '!**/_generated.md',
  '!**/_template.md',
  '!**/tags/*',
  '!**/en/fundamentals/getting-started/codelabs/*/*.md'
];

// ToDo: HTTP test fails to match 'HTTPs' and ignores 'https://' and 'http://'.
// IndexedDB, not IndexedDb
var APPROVED_VOCABULARY = [
  { label: '"DevTools" must be spelled and capitalized as shown.', regEx: /(?!DevTools)([dD]ev\s?[tT]ools)/ },
  { label: '"Home screen" is two words.', regEx: /homescreen/ },
  { label: '"Mobile" should not be capitalized unless it begins a sentence.', regEx: /Mobile/ },
  { label: '"Website" is one word, not two.', regEx: /[Ww]eb [Ss]ite/ },
  { label: '"Service worker" should not be capitalized.', regEx: /(?!service worker)([Ss]ervice [Ww]orker)/ },
  { label: '"HTTP and HTTPS" must be capitalized.', regEx: /(?! http-)(?![-/]https?)(?![\S\s]https?:)(?![\S\s]HTTPS?[^s][\S\s])[\S\s]([Hh][Tt][Tt][Pp][Ss]?)[\S\s]/g },
  { label: 'There must be a space between "Chrome" and the version number.', regEx: /(?!wf_tags:\s(?:[\w\d]+,?)*,?[Cc]hrome\d\d)[Cc]hrome\d\d/ },
  { label: 'Don\'t use "version" in Chrome version numbers. Use "Chrome ##" instead.', regEx: /(?!wf_tags:\s(?:[\w\d]+,?)*,?[Cc]hrome\d\d)[Cc]hrome\s[Vv]ersion\s\d\d/g },
  { label: '"Chrome" must be capitalized.', regEx: /[^-/]\b(chrome)\b[^-/:]/ },
  { label: 'Don\'t use "M##" to indicate a Chrome release. Use "Chrome ##" instead.', regEx: /[^,/][Cc]hrome\d\d/g },
];

var EDITORIAL_SUGGESTIONS = [
  { label: 'Use "click" rather than "click on".', regEx: /click[ \r\n]on/g },
  { label: 'Spell out "control". Do not use "ctl".', regEx: /[Cc][Tt][Ll] ?[-+] ?\w/g },
  { label: 'Spell out "command". Do not use "cmd".', regEx: /[Cc][Mm][Dd] ?[-+] ?\w/g },
  { label: 'Abbreviation "i.e." frequently confused with "e.g.". Use "in other words" instead.', regEx: /\bi\.? ?e\.?\b/g},
  { label: 'Abbreviation "e.g." frequently confused with "i.e.". Use "for example" instead.', regEx: /\be\.? ?g\.?\b/g},
  { label: '"Email" is spelled as shown and only capitalized to begin a sentence.', regEx: /(?!email)(?!^Email)([Ee]-?mail)/mg},
  { lebel: '"Endpoint" is one word.', regEx: /[Ee]nd\s[Pp]oint/mg },
  { lebel: '"Filename" is one word.', regEx: /[Ff]ile\s[Nn]ame/mg },
  { label: '"ID" must be upper case.', regEx: /(?!.?\bid=)[^=]\b([Ii]d)s?\b/g }
];


function reviewMarkdownFile(fileName) {
  var tags;
  var errors = [];
  var warnings = [];
  var fileContent = fs.readFileSync(fileName, 'utf8');


  // Simplify content so that later regex can be simplified and more reliable

  // Get rid of some front matter
  var fileLines = fileContent.split('\n');
  for (var i = 0; i < fileLines.length; i++) {
    //gutil.log(fileLines[i]);
    if (fileLines[i].startsWith('# ')) {
      fileLines[i] = '';
      break;
    }
    if (!fileLines[i].startsWith('description:') && !fileLines[i].startsWith('{# wf_featured_snippet:')) {
      fileLines[i] = '';
    }
  }
  fileContent = fileLines.join('\n');

  // Get rid of other problem strings
  var SKIP_STRINGS = [
    /chrome:\/\/flags\/[#\w\d-]+\b/g,
    /\[[\w\s\-]*\]((?:\W)?\((?:https?:\/\/)?[\/\w\r\n-.]+\))/g,
    /(\[[\w\s\-]*\])(?:\W)?\((?:https?:\/\/)?[\/\w\r\n-.]+\)/g
  ]
  SKIP_STRINGS.forEach(function(str) {
    fileContent = fileContent.replace(str, '()')
  });

  // Check approved vocabulary
  APPROVED_VOCABULARY.forEach(function(str) {
    var result = str.regEx.exec(fileContent);
    if (result) {
      warnings.push({msg: 'Editing Required. "' + result[0] + '."', param: str.label});
    }
  });

  // Make editing suggestions
  EDITORIAL_SUGGESTIONS.forEach(function(str) {
    var result = str.regEx.exec(fileContent);
    if (result) {
      warnings.push({msg: 'Please edit. "' + result[0] + '."', param: str.label});
    }
  });

  return {file: fileName, errors: errors, warnings: warnings};
  
}


gulp.task('_edit-assist', function(callback) {
  var warnings = 0;
  var errors = 0;
  var errorList = [];
  var filesWithIssues = 0;
  var opts = {
    srcBase: TEST_ROOT,
    prefixBase: true
  };
  if (GLOBAL.WF.options.lang !== null) {
    opts.srcBase = path.join(TEST_ROOT, GLOBAL.WF.options.lang);
  }
  gutil.log('Base directory:', gutil.colors.cyan(opts.srcBase));
  gutil.log('Skipping wf_review_required tags:', gutil.colors.cyan(GLOBAL.WF.options.skipReviewRequired));
  gutil.log('Warn only:', gutil.colors.cyan(GLOBAL.WF.options.testWarnOnly));
  gutil.log('');

  gutil.log('Validating markdown (.md) files...');
  var files = glob.find(['**/*.md'], STD_EXCLUDES, opts);
  files.sort();
  files.forEach(function(fileObj) {
    var r = reviewMarkdownFile(fileObj);
    if (r.warnings.length > 0 || r.errors.length > 0) {
      filesWithIssues++;
      gutil.log(r.file);
      r.warnings.forEach(function(warning) {
        warnings++;
        gutil.log(' ', gutil.colors.yellow('WARNING'), warning.msg, gutil.colors.cyan(warning.param));
        gutil.log('');
      });
      r.errors.forEach(function(error) {
        errors++;
        gutil.log(' ', gutil.colors.red('ERROR'), error.msg, gutil.colors.cyan(error.param));
        gutil.log('');
        errorList.push(r.file + ': ' + error.msg + ' -- ' + error.param);
      });
    }
  });
  gutil.log('');
  gutil.log('Test Completed.');
  gutil.log('Files checked: ', gutil.colors.blue(files.length));
  gutil.log(' - with issues:', gutil.colors.yellow(filesWithIssues));
  gutil.log(' - warnings:   ', gutil.colors.yellow(warnings));
  gutil.log(' - errors:     ', gutil.colors.red(errorList.length));
  if (GLOBAL.WF.options.testWarnOnly === true) {
    callback();
  } else if (errorList.length > 0) {
    var err = new gutil.PluginError('test-suite', errorList.join('\n'));
    callback(err);
  }
});