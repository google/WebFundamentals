'use strict';

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var glob = require('globule');
var moment = require('moment');
var jsYaml = require('js-yaml');
var gutil = require('gulp-util');
var wfHelper = require('./wfHelper');
var editUtils = require('./editUtils');

var TEST_ROOT = 'src/content/';
var STD_EXCLUDES = [
  '!**/_common-links.md',
  '!**/_generated.md',
  '!**/_template.md',
  '!**/tags/*',
  '!**/en/fundamentals/getting-started/codelabs/*/*.md'
];

var EXPERIMENTAL_STRINGS = [
  { label: '"DevTools" must be spelled and capitalized as shown.', regEx: /(?!DevTools)([dD]ev\s?[tT]ools)/ }
]


function reviewMarkdownFile(fileName) {
  var tags;
  var errors = [];
  var warnings = [];
  var fileContent = fs.readFileSync(fileName, 'utf8');
  // Split generally on 2 consecutive white space chars, usually line breaks
  var fileFragments = fileContent.split(/(?!  )\s\s/g);


  var reWfDates = /{#\s+wf_\w+:\s\d{4}(?:-\d{1,2}){2}\s+#}/;
  // var rePageTitle = /^#{1,6} (.*) {: .page-title }/gm;
  var reInclude = /{%\s+include\s+"web\/_shared\/contributors\/\w+\.html"\s+%}/
  // var reTitle = /#{1,6}\s(.*){:\s\..*\s}/;
  var reTitle = /#{1,6}\s([\w ,:]*[^{])(?:{:\s\..*\s})?/;
  var reTlDr = /#+\s+TL;DR\s+{:\s+\.hide-from-toc\s+}/

  fileFragments.forEach(function(fragment, index, array) {
    while (fragment.startsWith('\n')) {
      fragment = fragment.substring(1, fragment.length);
    }
    // if (fragment == '') { return; }

    //Skip metadata
    if (fragment.indexOf("project_path") >= 0) { return; }
    if (fragment.indexOf("book_path") >= 0 ) { return; }
    if (fragment.indexOf("description:") == 0 ) { return; }
    if (fragment.match(reWfDates)) { return; }
    if (fragment.match(reInclude)) { return; }

    //Skip certain kinds of fragments
    if (fragment.match(reTlDr)) { return; }
    if (editUtils.isCodeSample(fragment)) { return; }


    // Verify case of titles
    var title = fragment.match(reTitle);

    if (title) {
      // gutil.log(title[0], title[1]);
      if (title[0].indexOf(".page-title") >= 0) {
        if (!editUtils.isTitleCase(title[1])) {
          errors.push({msg: "Page title must be title case.", param: fragment});
        }
      } else {
        if (!editUtils.isSentenceCase(title[1])) {
          errors.push({msg: "Section title must be sentence case.", param: fragment});
        }
      }
    }


    // Check approved vocabulary
    EXPERIMENTAL_STRINGS.forEach(function(str) {
      var result = str.regEx.exec(fileContent);
      if (result) {
        warnings.push({msg: 'Editing Required. "' + result[0] + '."', param: str.label});
      }
    });

  });


  return {file: fileName, errors: errors, warnings: warnings};
  
}


gulp.task('edit-assist', function(callback) {
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