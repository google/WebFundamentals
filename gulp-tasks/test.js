'use strict';

var fs = require('fs');
var gulp = require('gulp');
var chalk = require('chalk');
var glob = require('globule');
var moment = require('moment');
var jsYaml = require('js-yaml');
var gutil = require('gulp-util');
var wfRegEx = require('./wfRegEx');
var wfHelper = require('./wfHelper');

var STD_EXCLUDES = [
  '!**/_common-links.md',
  '!**/updates/tags/*',
  '!**/showcase/tags/*',
  '!**/fundamentals/getting-started/codelabs/*/*.md',
  '!**/updates/201?/index.md',
  '!**/showcase/201?/index.md',
  '!**/shows/http203/podcast/index.md'
];
var MAX_DESCRIPTION_LENGTH = 485;
var ERROR_STRINGS = [
  {label: 'YouTube videos must use DevSite embed.', regEx: /<iframe .*? src="(https?:)?\/\/(www\.)?youtube.com\/.*?>/g},
  {label: 'Possible template tag ({{)', regEx: /{{/g},
  {label: 'Invalid named anchor', regEx: /{#\w+}/m},
  {label: 'Hard coded language URL in link (hl=xx)', regEx: /[\?|&]hl=\w\w/g},
  {label: 'Hard coded https://developers.google.com in link (MD)', regEx: /\(https:\/\/developers.google.com/},
  {label: 'Hard coded https://developers.google.com in link (HTML)', regEx: /href="https:\/\/developers.google.com/},
];
var VALID_DATE_FORMATS = ['YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ss.sssZ'];

var contributorList;
var summary = {
  files: 0,
  filesWithErrors: {},
  errors: 0,
  warnings: 0
};

/**
 * Logs a message to the console
 *
 * @param {string} level ERROR or WARNING, the level of the error
 * @param {string} filename The file the issue occured in
 * @param {string} message The message to be displayed
 */
function logMessage(level, filename, message) {
  var msgLevel;
  level = level.toUpperCase();
  if (level === 'ERROR') {
    summary.errors++;
    msgLevel = chalk.red('ERROR:');
  } else {
    summary.warnings++;
    msgLevel = chalk.yellow('WARNING:');
  }
  gutil.log(msgLevel, chalk.cyan(filename), message);
  summary.filesWithErrors[filename] = true; 
}

/**
 * Logs an ERROR message to the console
 *
 * @param {string} filename The file the issue occured in
 * @param {string} message The message to be displayed
 */
function logError(filename, message) {
  logMessage('ERROR', filename, message);
}

/**
 * Logs a WARNING message to the console
 *
 * @param {string} filename The file the issue occured in
 * @param {string} message The message to be displayed
 */
function logWarning(filename, message, extra) {
  logMessage('WARNING', filename, message, extra);
}

/**
 * Gets a list of all files with that extension for the languages
 * specified in the options or the test root.
 *
 * @param {string} extension The extension of files to search for
 * @param {string} extension2 A second extension of files to search for
 * @return {Array} A list of files matching the patterns
 */
function getFilelist(extension, extension2) {
  var opts = {prefixBase: true};
  var globs = [];
  if (GLOBAL.WF.options.testPath) {
    opts.srcBase = GLOBAL.WF.options.testPath;
    globs.push('**/*.' + extension);
    if (extension2) {
      globs.push('**/*.' + extension2);
    }
  } else {
    opts.srcBase = './src/content';
    GLOBAL.WF.options.lang.forEach(function(lang) {
      globs.push(lang + '/**/*.' + extension);
      if (extension2) {
        globs.push(lang + '/**/*.' + extension2);
      }
    });    
  }
  return glob.find(globs, STD_EXCLUDES, opts);
}

/**
 * Reads a file from the file system
 *
 * @param {string} filename The file to read
 * @return {Promise} A promise with the file contents
 */
function readFile(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, 'utf8', function(err, data) {
      summary.files++;
      if (err) {
        summary.filesWithErrors++;
        logError(filename, 'Unable to read file', err);
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

/**
 * Reads a file and parses it from YAML into JSON
 *
 * @param {string} filename The file to read
 * @return {Promise} A promise with the file contents
 */
function parseYaml(filename) {
  return new Promise(function(resolve, reject) {
    readFile(filename)
      .then(function(fileContents) {
        try {
          var parsed = jsYaml.safeLoad(fileContents);
          resolve(parsed);
        } catch(ex) {
          summary.filesWithIssues++;
          reject(logError(filename, 'Unable to parse YAML', ex));
        }
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

/**
 * Reads & validates the _contributors.yaml file checking for:
 *  * Proper YAML format
 *  * Entries are sorted by family name
 *  * Google+ IDs are strings, not integers
 *
 * Note: the promise will always be fulfilled, even if it fails.
 * 
 * @return {Promise} An empty promise
 */
function readAndValidateContributors() {
  if (GLOBAL.WF.options.verbose) { 
    gutil.log(' ', 'Validating _contributors.yaml');
  }
  return new Promise(function(resolve, reject) {
    parseYaml('./src/data/_contributors.yaml')
    .then(function(contributors) {
      var errors = 0;
      var prevFamilyName = '';
      Object.keys(contributors).forEach(function(key) {
        var errMsg;
        var contributor = contributors[key];
        var familyName = contributor.name.family || contributor.name.given;
        if (prevFamilyName.toLowerCase() > familyName.toLowerCase()) {
          errMsg = 'Contributors must be sorted by family name. ';
          errMsg += prevFamilyName + ' came before ' + familyName;
          logError('_contributors.yaml', errMsg)
          errors++;
        }
        if (contributor.google && typeof contributor.google !== 'string') {
          errMsg = 'Google+ ID for ' + key + ' must be a string';
          logError('_contributors.yaml', errMsg);
          errors++;
        }
        prevFamilyName = familyName;
      });
      contributorList = contributors;
      resolve();
    });
  });
}

/**
 * Reads & validates all YAML files in the project checking for:
 *  * Proper YAML format
 *
 * Note: the promise will always be fulfilled, even if it fails.
 * 
 * @return {Promise} An empty promise
 */
function testAllYaml() {
  if (GLOBAL.WF.options.verbose) { 
    gutil.log(' ', 'Validating YAML files...');
  }
  var files = getFilelist('yaml');
  return new Promise(function(resolve, reject) {
    var filesCompleted = 0;
    var filesRejected = 0;
    files.forEach(function(filename) {
      return parseYaml(filename)
        .catch(function() {
          filesRejected++;
        })
        .then(function() {
          if (++filesCompleted === files.length) {
            resolve();
          }
        });
    });
  });
}

/**
 * Checks to ensure there are no .markdown or .mdown files in the project
 *
 * Note: the promise will always be fulfilled, even if it fails.
 * 
 * @return {Promise} An empty promise
 */
function findBadMDExtensions() {
  return new Promise(function(resolve, reject) {
    var files = getFilelist('markdown', 'mdown');
    files.forEach(function(filename) {
      summary.files++;
      logError(filename, 'File extension must be .md');
    });
    resolve();
  });
}

/**
 * Checks to ensure there are no JavaSCript files in the content/ folder.
 *
 * Note: the promise will always be fulfilled, even if it fails.
 *
 * @return {Promise} An empty promsie
 */
 function findJavaScriptFiles() {
  return new Promise(function(resolve, reject) {
    var contentPath = GLOBAL.WF.src.content;
    if (GLOBAL.WF.options.testPath) {
      contentPath = GLOBAL.WF.options.testPath;
    }
    var patterns = ['**/*.js', '!**/_code/*.js', '!**/event-map.js'];
    var files = wfHelper.getFileList(contentPath, patterns);
    files.forEach(function(filename) {
      summary.files++;
      logError(filename.filePath, 'JavaScript files are not allowed.')
    });
    resolve();
  });
 }

/**
 * Tests all .MD files
 * 
 * Note: the promise will only be fulfilled, when all of the files have been
 * tested and their promises have been returned. It will be fulfilled even if
 * there are any failures.
 *  
 * @return {Promise} An empty promise
 */
function testAllMarkdown() {
  return readFile('./src/data/commonTags.json')
  .then(function(tags) {
    var files = getFilelist('md');
    return new Promise(function(resolve, reject) {
      var filesCompleted = 0;
      var filesRejected = 0;
      files.forEach(function(filename) {
        return validateMarkdown(filename, tags)
          .catch(function() {
            filesRejected++;
          })
          .then(function() {
            if (++filesCompleted === files.length) {
              resolve();
            }
          });
      });
    });
  });
}

/**
 * Gets the line number of the current string up to the index point
 * 
 * @param {string} content The content of the string to check
 * @param {Number} idx Where in the string to stop
 * @return {Number} The line number the index ends on
 */
function getLineNumber(content, idx) {
  var subStr = content.substring(0, idx);
  var lineNum = subStr.split(/\r\n|\r|\n/).length;
  return lineNum;
}

/**
 * Reads & validates the an individual markdown file
 *
 * Note: the promise will always be fulfilled, even if it fails.
 *
 * @param {string} filename The file to read
 * @param {Array} commonTags The list of common tags to verify against
 * @return {Promise} An empty promise
 */
function validateMarkdown(filename, commonTags) {
  return new Promise(function(resolve, reject) {
    readFile(filename)
    .then(function(content) {

      // Verify there are no dots in the filename
      var numDots = filename.split('.');
      if (numDots.length !== 2) {
        errMsg = 'Filename or path should not contain dots.';
        logError(filename, errMsg);
        errors++;
      }

      // Check if this is a markdown include file
      var isInclude = wfRegEx.RE_MD_INCLUDE.test(content);
      var errMsg;
      var matched;
      var errors = 0;
      var warnings = 0;

      // Validate book_path and project_path
      if (!wfRegEx.RE_BOOK_PATH.test(content) && !isInclude) {
        errMsg = 'Attribute `book_path` missing from top of document';
        logError(filename, errMsg)
        errors++;
      }
      if (!wfRegEx.RE_PROJECT_PATH.test(content) && !isInclude) {
        errMsg = 'Attribute `project_path` missing from top of document';
        logError(filename, errMsg)
        errors++;
      }

      // Validate description
      matched = wfRegEx.getMatch(wfRegEx.RE_DESCRIPTION, content, null);
      if (matched) {
        matched = matched.trim();
        if (matched.length === 0) {
          errMsg = 'Attribute `description` cannot be empty';
          logError(filename, errMsg);
          errors++;
        } else if (matched.length > MAX_DESCRIPTION_LENGTH) {
          errMsg = 'Attribute `description` cannot exceed ' + MAX_DESCRIPTION_LENGTH
          errMsg += ' characters, was: ' + matched.length;
          logError(filename, errMsg)
          errors++;
        }
        if (matched.indexOf('<') >= 0 || matched.indexOf('`') >= 0) {
          errMsg = 'Attribute `description` cannot contain HTML or markdown, ';
          errMsg += 'found: ' + matched;
          logError(filename, errMsg)
          errors++;
        }
      }

      // Validate wf_updated and wf_published
      matched = wfRegEx.getMatch(wfRegEx.RE_UPDATED_ON, content, 'NOT_FOUND');
      if (isInclude === false) {
        if (!moment(matched, VALID_DATE_FORMATS, true).isValid()) {
          errMsg = 'WF Tag `wf_updated_on` missing or invalid format (YYYY-MM-DD)';
          errMsg += ', found: ' + matched;
          logError(filename, errMsg)
          errors++;
        }
      }
      matched = wfRegEx.getMatch(wfRegEx.RE_PUBLISHED_ON, content, 'NOT_FOUND');
      if (isInclude === false) {
        if (!moment(matched, VALID_DATE_FORMATS, true).isValid()) {
          errMsg = 'WF Tag `wf_published_on` missing or invalid format (YYYY-MM-DD)';
          errMsg += ', found: ' + matched;
          logError(filename, errMsg)
          errors++;
        }
      }

      // Validate featured image path
      matched = wfRegEx.getMatch(wfRegEx.RE_IMAGE, content);
      if (matched) {
        var imgPath = matched;
        if (imgPath.indexOf('/web') === 0) {
          imgPath = imgPath.replace('/web', '');
        }
        imgPath = './src/content/en' + imgPath;
        try {
          fs.accessSync(imgPath, fs.R_OK);
        } catch (ex) {
          errMsg = 'WF Tag `wf_featured_image` found, but couldn\'t find ';
          errMsg += 'image - ' + matched;
          logError(filename, errMsg);
          errors++;
        }
      }

      // Check for uncommon tags
      matched = wfRegEx.getMatch(wfRegEx.RE_TAGS, content);
      if (matched) {
        matched.split(',').forEach(function(tag) {
          if (commonTags.indexOf(tag.trim()) === -1) {
            errMsg = 'Uncommon tag (' + tag.trim() + ') found.';
            logWarning(filename, errMsg)
            warnings++;
          }
        });
      } 

      // Count the number of H1 and # tags
      var numH1 = 0;
      matched = content.match(/^#\s{1}[^#].*/gm)
      if (matched) {
        numH1 += matched.length;
      }
      matched = content.match(/^<h1.*?>/gmi);
      if (matched) {
        numH1 += matched.length;
      }

      // Warn if there is an H1 in an include
      if (isInclude === true && numH1 > 0) {
        errMsg = 'Includes should not contain any H1 tags, found ' + numH1;
        logWarning(filename, errMsg);
        warnings++;
      }

      // Warn if there is more than 1 H1 in a document
      if (isInclude === false && numH1 > 1) {
        errMsg = 'Page should only have ONE H1 tag, found ' + numH1;
        logWarning(filename, errMsg);
        warnings++;
      }

      // Verify there is only ONE .page-title
      matched = content.match(/{:\s?\.page-title\s?}/gm);
      if (isInclude === true && matched) {
        errMsg = 'Includes must not contain the page title.';
        logError(filename, errMsg);
        errors++;
      }
      if (isInclude === false && matched && matched.length > 1) {
        errMsg = 'Page must only have one title tag, found: ' + matched.length;
        logError(filename, errMsg)
        errors++;
      }

      // Verify there is no markup/down in the title
      matched = wfRegEx.getMatch(wfRegEx.RE_TITLE, content);
      if (isInclude === false && matched) {
        if (matched.indexOf('<') >= 0 || 
            matched.indexOf('&gt;') >= 0 ||
            matched.indexOf('`') >= 0) {
          errMsg = 'Page title must not contain HTML or markdown ' + matched;
          logError(filename, errMsg);
          errors++;
        }
      } else if (isInclude === false) {
        errMsg = 'Page is missing page title eg: # TITLE {: .page-title }';
        logError(filename, errMsg)
        errors++;
      }

      // Verify authors/translators are in the contributors file
      matched = content.match(wfRegEx.RE_AUTHOR_LIST);
      if (matched) {
        matched.forEach(function(contributor) {
          var key = wfRegEx.getMatch(wfRegEx.RE_AUTHOR_KEY, contributor);
          if (!contributorList[key]) {
            errMsg = 'Unable to find contributor (' + key + ') in contributors file.'
            logError(filename, errMsg)
            errors++;
          }
        });
      }

      // Verify all includes start with web/
      matched = content.match(wfRegEx.RE_INCLUDES);
      if (matched) {
        matched.forEach(function(include) {
          var inclFile = wfRegEx.getMatch(wfRegEx.RE_INCLUDE_FILE, include, '');
          if (inclFile === 'comment-widget.html') {
            return;
          }
          if (inclFile.indexOf('web/') !== 0) {
            errMsg = 'Include path MUST start with web/ - ' + include;
            logError(filename, errMsg)
            errors++;
          }
        });
      }

      // Search for ``` wrapped code blocks
      matched = content.match(/```/g);
      if (matched) {
        errMsg = 'Found sample code block(s) wrapped in ```.';
        errMsg += ' Required style is indented by 4 spaces.';
        logError(filename, errMsg);
        errors++;
      }

      // Verify all TL;DRs are H3 and include hide-from-toc   
      matched = content.match(/^#+ TL;DR.*\n/gm);
      if (matched) {
        matched.forEach(function(tag) {
          if (tag.indexOf('### ') === -1 || tag.indexOf('.hide-from-toc') === -1) {
            errMsg = 'TL;DRs should be H3 and inclue {: .hide-from-toc }';
            errMsg += ' Found: ' + tag.replace('\n', '');
            logWarning(filename, errMsg)
            warnings++;
          }
        });
      }

      // Verify all TL;DRs are H3 and include hide-from-toc   
      matched = content.match(/http:\/\/goo.gl\//g);
      if (matched) {
        errMsg = 'Found ' + matched.length + ' non-secure goo.gl shortlinks.';
        errMsg += ' Preferred style: //goo.gl/XXXXXX (without protocol).';
        logWarning(filename, errMsg);
        warnings++;
      }

      // Look for bad strings
      ERROR_STRINGS.forEach(function(reObj) {
        matched = content.match(reObj.regEx);
        if (matched) {
          matched.forEach(function(m) {
            errMsg = reObj.label + ' -- ' + m;
            logError(filename, errMsg)
            errors++;
          });
        }
      });
      if (errors === 0) {
        resolve();
        return;
      }
      reject('failed.');
    });
  });
}

/**
 * Prints a summary of the test results
 *
 * @return {Promise} An empty promise.
 */
function printSummary() {
  return new Promise(function(resolve, reject) {
    var filesWithErrors = Object.keys(summary.filesWithErrors).length;
    gutil.log('');
    gutil.log('Test Completed.');
    gutil.log('Files checked: ', gutil.colors.blue(summary.files));
    gutil.log(' - with issues:', gutil.colors.yellow(filesWithErrors));
    gutil.log(' - warnings:   ', gutil.colors.yellow(summary.warnings));
    gutil.log(' - errors:     ', gutil.colors.red(summary.errors));
    if (summary.errors === 0) {
      resolve();
      return;
    }
    reject(new Error('There were ' + summary.errors + ' errors.'));
  });
}

gulp.task('test', function(callback) {
  if (GLOBAL.WF.options.testPath) {
    gutil.log('Test Base Dir:', chalk.cyan(GLOBAL.WF.options.testPath));
    gutil.log('');
  }
  return readAndValidateContributors()
    .catch(function(err) {
      gutil.log('');
      gutil.log(chalk.red('ABORT:'), 'Exception:', err);
    })
    .then(function() {
      return Promise.all([
        testAllYaml(),
        testAllMarkdown(),
        findBadMDExtensions(),
        findJavaScriptFiles()
      ]);
    })
    .catch(function(err) {
      gutil.log('');
      gutil.log(chalk.red('ABORT:'), 'Exception:', err);
    })
    .then(printSummary);
});
