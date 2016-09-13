'use strict';

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var glob = require('globule');
var gutil = require('gulp-util');
var wfHelper = require('./wfHelper');
var runSequence = require('run-sequence');

var STD_EXCLUDES = ['!**/_generated.md', '!**/_template.md', '!**/tags/*', '!**/codelabs/*/*'];
// var RE_UPDATED = /{# wf_updated_on: (.*?) #}/;
// var RE_PUBLISHED = /{# wf_published_on: (.*?) #}/;
// var RE_DESCRIPTION = /^description: (.*)/m;
var RE_TITLE = /^# (.*) {: .page-title }/m;
// var RE_TAGS = /{# wf_tags: (.*?) #}/;
var RE_IMAGE = /{# wf_featured_image: (.*?) #}/;
var RE_SNIPPET = /{# wf_featured_snippet: (.*?) #}/;
var RE_AUTHOR = /{%[ ]?include "web\/_shared\/contributors\/(.*?)\.html"[ ]?%}/;

var MAX_DESCRIPTION_LENGTH = 475;
var VALID_TAGS = JSON.parse(fs.readFileSync('gulp-tasks/commonTags.json', 'utf8'));
var BAD_STRINGS = [
  'mdl-grid',
  'mdl-cell',
  'mdl-data-table',
  'mdl-js-data-table',
  '{% include_code',
  '{% link_sample_button',
  '{{'
];

function testMarkdownFile(fileName) {
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
  // Validate wf_updated and wf_published
  if (wfHelper.getRegEx(/{# wf_updated_on: (.*?) #}/, fileContent, null) === null) {
    warnings.push({msg: 'Missing wf_updated_on tag', param: ''});
  }
  if (wfHelper.getRegEx(/{# wf_published_on: (.*?) #}/, fileContent, null) === null) {
    warnings.push({msg: 'Missing wf_published_on tag', param: ''});
  }
  // Check for uncommon tags
  var tags = wfHelper.getRegEx(/{# wf_tags: (.*?) #}/, fileContent);
  if (tags) {
    tags.split(',').forEach(function(tag) {
      if (VALID_TAGS.indexOf(tag.trim()) === -1) {
        warnings.push({msg: 'Uncommon tag found', param: tag.trim()});
      }
    });
  }
  // Look for bad strings
  BAD_STRINGS.forEach(function(str) {
    if (fileContent.indexOf(str) >= 0) {
      errors.push({msg: 'Bad string found', param: str});
    }
  });
  return {file: fileName, errors: errors, warnings: warnings};
}

gulp.task('test', function(cb) {
  var opts = {
    srcBase: GLOBAL.WF.src.content,
    prefixBase: true
  };
  var files = glob.find(['**/*.md'], STD_EXCLUDES, opts);
  files.forEach(function(fileObj) {
    var r = testMarkdownFile(fileObj);
    if (r.warnings.length > 0 || r.errors.length > 0) {
      gutil.log(r.file);
      r.warnings.forEach(function(warning) {
        gutil.log(' ', gutil.colors.yellow('WARNING'), warning.msg, gutil.colors.cyan(warning.param));
      });
      r.errors.forEach(function(error) {
        gutil.log(' ', gutil.colors.red('ERROR'), error.msg, gutil.colors.cyan(error.param));
      });
    }
  });
});
