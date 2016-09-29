'use strict';

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var glob = require('globule');
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
var MAX_DESCRIPTION_LENGTH = 485;
var VALID_TAGS = JSON.parse(fs.readFileSync('gulp-tasks/commonTags.json', 'utf8'));

var DO_EXPERIMENTAL = false;
var EXPERIMENTAL_STRINGS = [
  {label: 'Links (HTML) within DevSite should be relative', regEx: /href=['"]?https:\/\/developers.google.com/},
  {label: 'Links (MD) within DevSite should be relative', regEx: /]\(https:\/\/developers.google.com/}
];

var WARNING_STRINGS = [
  {label: 'mdl-* class', regEx: /mdl-(grid|cell|data-table|js-data-table)/},
  {label: 'TODO: Verify note type!', regEx: /<!-- TODO: Verify note type! -->/},
  {label: 'TODO: Verify Udacity', regEx: /<!-- TODO: Verify Udacity course fits here -->/},
  {label: 'quote__content', regEx: /quote__content/},
  {label: 'g-(wide|medium)--(push|pull)-x', regEx: /g-(wide|medium)--(push|pull)-\d/},
  {label: 'g--', regEx: /g--/}
];
var ERROR_STRINGS = [
  {label: 'Possible template tag ({{)', regEx: /{{/},
  {label: 'Old style include {% include_code', regEx: /{%[ ]?include_code/},
  {label: 'Old style link_sample {% link_sample', regEx: /{%[ ]?link_sample/},
  {label: 'Old style highlight {% highlight', regEx: /{%[ ]?highlight/},
  {label: 'Contributor is TODO', regEx: /{%[ ]?include.*web\/_shared\/contributors\/TODO.html/},
  {label: 'Invalid named anchor', regEx: /{#\w+}/m},
  {label: 'Old style animation tag {% animtion', regEx: /{% animation/},
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
    if (description.indexOf('<') >= 0 || description.indexOf('`') >= 0) {
      warnings.push({msg: 'description should not contain HTML tags', param: description});
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
  // Verify page has a title
  var title = fileContent.match(/^# (.*) {: .page-title }/gm);
  if (title) {
    if (title.length > 1) {
      errors.push({msg: 'Page has multiple title tags', param: title.join(',')});
    } else if (title[0].indexOf('<code>') >= 0 || title[0].indexOf('`') >= 0) {
      errors.push({msg: 'Title should not contain content wrapped in <code> tags', param: title[1]});
    }
  } else {
    errors.push({msg: 'Missing page title', param: '# TITLE {: .page-title}'});
  }
  // Look for bad strings
  WARNING_STRINGS.forEach(function(str) {
    if (fileContent.search(str.regEx) >= 0) {
      warnings.push({msg: 'Potentially bad string found', param: str.label});
    }
  });
  ERROR_STRINGS.forEach(function(str) {
    var result = str.regEx.exec(fileContent);
    if (result) {
      errors.push({msg: 'Bad string found "' + result[0] + '"', param: str.label});
    }
  });
  // Look for experimental strings
  if (DO_EXPERIMENTAL) {
    EXPERIMENTAL_STRINGS.forEach(function(str) {
      if (fileContent.search(str.regEx) >= 0) {
        warnings.push({msg: 'Experimental string found', param: str.label});
      }
    });
  }

  // Look for invalid tags in includecode
  tags = fileContent.match(/{% includecode (.*?) %}/g);
  if (tags) {
    tags.forEach(function(tag) {
      if (tag.indexOf('lang=') >= 0) {
        errors.push({msg: 'lang=xx attribute in includecode', param: tag});
      }
      if (tag.indexOf('adjust_indentation') === -1) {
        warnings.push({msg: 'Missing \'adjust_indentation="auto"\'', param: tag});
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
  tags = fileContent.match(/^#+ TL;DR.*\n/gm);
  if (tags) {
    tags.forEach(function(tag) {
      if (tag.indexOf('### ') === -1 || tag.indexOf('.hide-from-toc') === -1) {
        tag = tag.replace('\n', '');
        warnings.push({msg: 'TL;DRs should be H3 and inclue {: .hide-from-toc }', param: tag});
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
