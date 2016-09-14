'use strict';

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var glob = require('globule');
var gutil = require('gulp-util');
var wfHelper = require('./wfHelper');
var runSequence = require('run-sequence');

var TEST_ROOT = 'src/content/';
var STD_EXCLUDES = ['!**/_generated.md', '!**/_template.md', '!**/tags/*', '!**/codelabs/*/*'];
var MAX_DESCRIPTION_LENGTH = 475;
var VALID_TAGS = JSON.parse(fs.readFileSync('gulp-tasks/commonTags.json', 'utf8'));
var ERROR_STRINGS = [
  '{% include_code',
  '{% link_sample',
  '{% highlight',
  '{{',
  '{% include "web/_shared/contributors/TODO.html" %}'
];
var WARNING_STRINGS = [
  'mdl-grid',
  'mdl-cell',
  'mdl-data-table',
  'mdl-js-data-table',
  '<!-- TODO: Verify note type! -->',
  '<!-- TODO: Verify Udacity course fits here -->'
];

function testMarkdownFile(fileName) {
  var tags;
  var errors = [];
  var warnings = [];
  var fileContent = fs.readFileSync(fileName, 'utf8');

  // Has book.yaml and project.yaml
  if (wfHelper.getRegEx(/^book_path: (.*)\n/m, fileContent, null) === null) {
    errors.push({msg: 'Missing book_path definition', param: ''});
  }
  if (wfHelper.getRegEx(/^project_path: (.*)\n/m, fileContent, null) === null) {
    errors.push({msg: 'Missing project_path definition', param: ''});
  }
  // Validate description
  var description = wfHelper.getRegEx(/^description: (.*)/m, fileContent, null);
  if (description) {
    if (description.length === 0) {
      errors.push({msg: 'description cannot be empty', param: ''});
    } else if (description.length > MAX_DESCRIPTION_LENGTH) {
      errors.push({msg: 'description exceeds maximum length', param: description.length});
    }
  }
  // Check if it has review required
  if (GLOBAL.WF.options.skipReviewRequired === false) {
    if (wfHelper.getRegEx(/{# (wf_review_required) #}/, fileContent)) {
      warnings.push({msg: 'Has wf_review_required tag', param: ''});
    }
  }
  // Validate wf_updated and wf_published
  if (wfHelper.getRegEx(/{# wf_updated_on: (.*?) #}/, fileContent, null) === null) {
    warnings.push({msg: 'Missing wf_updated_on tag', param: ''});
  }
  if (wfHelper.getRegEx(/{# wf_published_on: (.*?) #}/, fileContent, null) === null) {
    warnings.push({msg: 'Missing wf_published_on tag', param: ''});
  }
  // Check for uncommon tags
  tags = wfHelper.getRegEx(/{# wf_tags: (.*?) #}/, fileContent);
  if (tags) {
    tags.split(',').forEach(function(tag) {
      if (VALID_TAGS.indexOf(tag.trim()) === -1) {
        warnings.push({msg: 'Uncommon tag found', param: tag.trim()});
      }
    });
  }
  // Look for bad strings
  WARNING_STRINGS.forEach(function(str) {
    if (fileContent.indexOf(str) >= 0) {
      warnings.push({msg: 'Potentially bad string found', param: str});
    }
  });
  ERROR_STRINGS.forEach(function(str) {
    if (fileContent.indexOf(str) >= 0) {
      errors.push({msg: 'Bad string found', param: str});
    }
  });
  // Look for invalid tags in includecode
  tags = fileContent.match(/{% includecode (.*?) %}/g);
  if (tags) {
    tags.forEach(function(tag) {
      if (tag.indexOf('lang=') >= 0) {
        errors.push({msg: 'lang=xx attribute in includecode', param: tag});
      }
    });
  }
  tags = fileContent.match(/{% include (.*?) %}/g);
  if (tags) {
    tags.forEach(function(tag) {
      if (tag.indexOf('inline=') >= 0) {
        errors.push({msg: 'inline=xx attribute in include', param: tag});
      }
    });
  }
  return {file: fileName, errors: errors, warnings: warnings};
}

gulp.task('test', function(callback) {
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
  var files = glob.find(['**/*.md'], STD_EXCLUDES, opts);
  files.sort();
  var warnings = 0;
  var errors = 0;
  var errorList = ['The following errors were found:'];
  var filesWithIssues = 0;
  files.forEach(function(fileObj) {
    var r = testMarkdownFile(fileObj);
    if (r.warnings.length > 0 || r.errors.length > 0) {
      filesWithIssues++;
      gutil.log(r.file);
      r.warnings.forEach(function(warning) {
        warnings++;
        gutil.log(' ', gutil.colors.yellow('WARNING'), warning.msg, gutil.colors.cyan(warning.param));
      });
      r.errors.forEach(function(error) {
        errors++;
        gutil.log(' ', gutil.colors.red('ERROR'), error.msg, gutil.colors.cyan(error.param));
        errorList.push(r.file + ': ' + error.msg + ' -- ' + error.param);
      });
    }
  });
  gutil.log('');
  gutil.log('Test Completed.');
  gutil.log('Files checked: ', gutil.colors.blue(files.length));
  gutil.log(' - with issues:', gutil.colors.yellow(filesWithIssues));
  gutil.log(' - warnings:   ', gutil.colors.yellow(warnings));
  gutil.log(' - errors:     ', gutil.colors.red(errors));
  if (GLOBAL.WF.options.testWarnOnly === true) {
    callback();
  } else if (errors > 0) {
    var err = new gutil.PluginError('Tests failed', errorList.join('\n'));
    callback(err);
  }
});
