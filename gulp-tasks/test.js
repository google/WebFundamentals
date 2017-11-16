/**
 * @fileoverview Gulp Task for staging and publishing /web from a Git repo.
 *
 * @author Pete LePage <petele@google.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const chalk = require('chalk');
const vfile = require('vfile');
const glob = require('globule');
const moment = require('moment');
const remark = require('remark');
const jsYaml = require('js-yaml');
const gutil = require('gulp-util');
const wfRegEx = require('./wfRegEx');
const wfHelper = require('./wfHelper');
const parseDiff = require('parse-diff');
const remarkLint = require('remark-lint');
const runSequence = require('run-sequence');
const jsonValidator = require('jsonschema').Validator;

/******************************************************************************
 * Constants & Remark Lint Options
 *****************************************************************************/

const MAX_DESCRIPTION_LENGTH = 485;
const MAX_FILE_SIZE_WARN = 500;   // Max file size (in kB) before warning
const MAX_FILE_SIZE_ERROR = 2500; // Max file size (in kB) before error
const MD_FILES = ['.md', '.mdown', '.markdown'];
const EXTENSIONS_TO_SKIP = ['.css', '.vtt', '.xml'];
const MEDIA_FILES = [
  '.gif', '.ico', '.jpg', '.png', '.psd', '.svg',
  '.mov', '.mp3', '.mp4', '.webm',
  '.pdf',
];
const VALID_DATE_FORMATS = [
  'YYYY-MM-DD'
];
const REMARK_WARNING_ONLY = [
  'maximum-line-length',
  'code-block-style',
  'heading-style'
];
const RE_BOM = /^\uFEFF/;
const RE_SRC_BASE = /src\/content\//;
const RE_DATA_BASE = /src\/data\//;
const COMMON_TAGS_FILE = 'src/data/commonTags.json';
const CONTRIBUTORS_FILE = 'src/data/_contributors.yaml';
const BLINK_COMPONENTS_FILE = 'src/data/blinkComponents.json';
const VALID_REGIONS = [
  'africa', 'asia', 'europe', 'middle-east', 'north-america', 'south-america'
];
const VALID_VERTICALS = [
  'education', 'entertainment', 'media', 'real-estate', 'retail',
  'transportation', 'travel'
];
const RESERVED_FILENAMES = ['index'];
const PAGE_TYPES = {
  LANDING: 'landing',
  ARTICLE: 'article',
};
const IS_TRAVIS = process.env.TRAVIS === 'true';
const IS_TRAVIS_PUSH = process.env.TRAVIS_EVENT_TYPE === 'push';
const IS_TRAVIS_ON_MASTER = process.env.TRAVIS_BRANCH === 'master';
const TRAVIS_BRANCH = process.env.TRAVIS_BRANCH;
const TRAVIS_EVENT_TYPE = process.env.TRAVIS_EVENT_TYPE;

let remarkLintOptions = {
  external: [
    './gulp-tasks/remark-lint-tests/check-links.js',
    './gulp-tasks/remark-lint-tests/check-headings.js',
    './gulp-tasks/remark-lint-tests/check-html',
    './gulp-tasks/remark-lint-tests/check-images',
  ],

  /* from check-links.js */
  wfLinksDGC: true,
  wfLinksInternal: true,
  wfLinksForcedLang: true,
  wfLinksUnsafeShort: true,

  /* from check-headings.js */
  wfHeadingsTldr: true,
  wfHeadingsBlank: true,
  wfHeadingsInMarkdown: true,
  wfHeadingsNoMarkupInTitle: true,

  /* from check-html.js */
  wfHtmlYouTube: true,
  wfHtmlDgcLinks: true,
  wfHtmlLinkForcedLang: true,
  wfHtmlInternalLinks: true,
  wfHtmlUnsafeShortLinks: true,

  /* from check-images.js */
  wfImagesMd: false,
  wfImagesHtml: false,

  /* from remark */
  firstHeadingLevel: 1,
  headingStyle: 'atx',
  maximumHeadingLength: false,
  maximumLineLength: false,
  noDuplicateDefinitions: true,
  noDuplicateHeadingsInSection: false,
  noEmphasisAsHeading: false,
  noEmptyLinkURL: true,
  noMultipleToplevelHeadings: true,
  noUnusedDefinitions: false,
};

/******************************************************************************
 * Results
 *****************************************************************************/

let filesTested = 0;
let allErrors = [];
let allWarnings = [];
let filesWithIssues = {};

/******************************************************************************
 * Logging Functions
 *****************************************************************************/

/**
 * Logs a message to the console
 *
 * @param {string} level ERROR or WARNING, the level of the error
 * @param {string} filename The file the issue occurred in
 * @param {Object} position The line/column the error occurred on
 * @param {string} message The message to be displayed
 * @param {Object} extra Any extra information to show
 */
function logMessage(level, filename, position, message, extra) {
  let logMsg = {
    filename: filename,
    position: position,
    message: message,
    extra: extra
  }
  let fileLoc = chalk.cyan(filename);
  level = level.toUpperCase();
  if (position && position.line) {
    fileLoc += chalk.gray('#') + chalk.cyan(position.line);
  }
  if (level === 'ERROR') {
    gutil.log(chalk.red('ERROR:'), fileLoc, message);
    allErrors.push(logMsg);
  } else {
    gutil.log(chalk.yellow('WARNING:'), fileLoc, message);
    allWarnings.push(logMsg);
  }
  if (GLOBAL.WF.options.verbose && extra) {
    console.log(extra);
  }
  filesWithIssues[filename] = true;
}

/**
 * Logs an ERROR message to the console
 *
 * @param {string} filename The file the issue occurred in
 * @param {Object} position The line/column the error occurred on
 * @param {string} message The message to be displayed
 * @param {Object} extra Any extra information to show
 */
function logError(filename, position, message, extra) {
  if (GLOBAL.WF.options.testWarnOnly) {
    logWarning(filename, position, message, extra);
    return;
  }
  logMessage('ERROR', filename, position, message, extra);
}

/**
 * Logs a WARNING message to the console
 *
 * @param {string} filename The file the issue occurred in
 * @param {Object} position The line/column the error occurred on
 * @param {string} message The message to be displayed
 * @param {Object} extra Any extra information to show
 */
function logWarning(filename, position, message, extra) {
  logMessage('WARNING', filename, position, message, extra);
}

/**
 * Prints a summary of the test results
 */
function printSummary() {
  var cFilesWithIssues = Object.keys(filesWithIssues).length;
  gutil.log('');
  gutil.log('Test Completed.');
  gutil.log('Files tested:  ', chalk.cyan(filesTested));
  gutil.log(' - with issues:', chalk.yellow(cFilesWithIssues));
  gutil.log('Errors  : ', chalk.red(allErrors.length));
  gutil.log('Warnings: ', chalk.yellow(allWarnings.length));
  if (IS_TRAVIS) {
    let result = {
      summary: {
        filesTested: filesTested,
        filesWithIssues: cFilesWithIssues,
      },
      errors: allErrors,
      warnings: allWarnings
    };
    result = JSON.stringify(result, null, 2);
    fs.writeFileSync('./test-results.json', result, 'utf8');
  }
}

/**
 * Throws an exception if there are any test failures.
 */
function throwIfFailed() {
  if (allErrors.length >= 1 && !GLOBAL.WF.options.testWarnOnly) {
    let errorMessage = `There were ${allErrors.length} errors.`;
    throw new Error(errorMessage);
  }
}

/******************************************************************************
 * Helper Functions
 *****************************************************************************/

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
 * Reads a file from the file system.
 *
 * @param {string} filename The file to read.
 * @return {string} The contents of the file, or NULL if it failed to read.
 */
function readFile(filename) {
  try {
    let contents = fs.readFileSync(filename, 'utf8');
    // Check if Byte order mark was included
    if (RE_BOM.test(contents)) {
      contents = contents.replace(RE_BOM, '');
      const msg = 'File was saved as UTF-8+BOM, please save without BOM';
      logWarning(filename, null, msg);
    }
    return contents;
  } catch (ex) {
    logWarning(filename, null, 'Unable to read file, was it deleted?', ex);
    return null;
  }
}

/**
 * Checks if a file exists.
 *
 * @param {string} filename The WebFundamentals file path.
 * @return {Boolean} True if it exists, false if not.
 */
function doesFileExist(filename) {
  if (!filename) {
    return false;
  }
  filename = filename.trim();
  filename = filename.replace(/^\/?web\/(.*)/, 'src/content/en/$1');
  try {
    fs.accessSync(filename, fs.R_OK);
    return true;
  } catch (ex) {
    return false;
  }
}

/**
 * Parses a JSON file
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Object} The parsed JSON object
 */
function parseJSON(filename, contents) {
  try {
    return JSON.parse(contents);
  } catch (ex) {
    let msg = `Unable to parse JSON: ${ex.message}`;
    logError(filename, null, msg, ex);
  }
  return null;
}

/**
 * Parses a YAML file
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Object} The parsed YAML object
 */
function parseYAML(filename, contents) {
  try {
    return jsYaml.safeLoad(contents);
  } catch (ex) {
    let msg = 'Unable to parse YAML';
    if (ex.reason) {
      msg = ex.reason;
    }
    let position = ex.mark;
    if (position && position.line) {
      position.line++;
    }
    logError(filename, position, msg, ex);
  }
  return null;
}

/**
 * Gets a list of all files to be tested.
 *
 * @return {Promise} The list of files
 */
function getFiles() {
  if (GLOBAL.WF.options.testPath || GLOBAL.WF.options.testAll) {
    return new Promise(function(resolve, reject) {
      let globs = [];
      let opts = {
        prefixBase: true,
        filter: 'isFile'
      };
      if (GLOBAL.WF.options.testPath) {
        gutil.log(' ', 'Searching for files in', chalk.cyan(GLOBAL.WF.options.testPath));
        opts.srcBase = GLOBAL.WF.options.testPath;
        globs.push('**/*');
      } else {
        opts.srcBase = './src/content';
        GLOBAL.WF.options.lang.forEach(function(lang) {
          gutil.log(' ', 'Searching for files in', chalk.cyan(`${opts.srcBase}/${lang}`));
          globs.push(`${lang}/**/*`);
        });
      }
      resolve(glob.find(globs, opts));
    });
  } else {
    gutil.log(' ', 'Searching for changed files');
    let cmd = 'git --no-pager diff --name-only ';
    if (IS_TRAVIS) {
      cmd += '$(git merge-base FETCH_HEAD master) FETCH_HEAD';
    } else {
      cmd += '$(git merge-base master HEAD)';
    }
    return wfHelper.promisedExec(cmd, '.')
    .then(function(results) {
      let files = [];
      results.split('\n').forEach(function(filename) {
        if (RE_SRC_BASE.test(filename) ||
            RE_DATA_BASE.test(filename) ||
            filename === 'app.yaml') {
              files.push(filename);
        }
      });
      return files;
    });
  }
}

/******************************************************************************
 * File Tests
 *****************************************************************************/

/**
 * Tests & validates a markdown file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function testMarkdown(filename, contents, options) {
  return new Promise(function(resolve, reject) {

    let msg;
    let matched;
    let position;
    let isInclude = wfRegEx.RE_MD_INCLUDE.test(contents);

    if (wfRegEx.RE_DEVSITE_TRANSLATION.test(contents)) {
      options.enforceLineLengths = false;
      options.lastUpdateMaxDays = null;
    }

    let pageType = PAGE_TYPES.ARTICLE;
    if (/page_type: landing/.test(contents)) {
      pageType = PAGE_TYPES.LANDING;
    }

    // Verify there are no dots in the filename
    let numDots = filename.split('.');
    if (numDots.length !== 2) {
      logError(filename, null, 'Filename or path should not contain dots.');
    }

    // Verify extension on file is .md
    if (path.extname(filename.toLowerCase()) !== '.md') {
      logError(filename, null, 'File extension must be `.md`');
    }

    // Validate book_path is specified and file exists
    const bookPath = wfRegEx.RE_BOOK_PATH.exec(contents);
    if (!bookPath && !isInclude) {
      msg = 'Attribute `book_path` missing from top of document';
      logError(filename, null, msg);
    }
    if (bookPath && bookPath[1] && !isInclude) {
      msg = 'Unable to find specified `book_path`:'
      if (doesFileExist(bookPath[1]) !== true) {
        logError(filename, null, `${msg} ${bookPath[1]}`);
      }
    }

    // Validate project_path is specified and file exists
    const projectPath = wfRegEx.RE_PROJECT_PATH.exec(contents);
    if (!projectPath && !isInclude) {
      msg = 'Attribute `project_path` missing from top of document';
      logError(filename, null, msg);
    }
    if (projectPath && projectPath[1] && !isInclude) {
      msg = 'Unable to find specified `project_path`:'
      if (doesFileExist(projectPath[1]) !== true) {
        logError(filename, null, `${msg} ${projectPath[1]}`);
      }
    }

    // Validate description
    matched = wfRegEx.RE_DESCRIPTION.exec(contents);
    if (matched) {
      let description = matched[1].trim();
      position = {line: getLineNumber(contents, matched.index)};
      if (isInclude) {
        msg = 'Included files should not include `description` tags.';
        logError(filename, position, msg);
      }
      if (description.length === 0) {
        msg = 'Attribute `description` cannot be empty';
        logError(filename, position, msg);
      } else if (description.length > MAX_DESCRIPTION_LENGTH) {
        msg = `Attribute \`description\` cannot exceed ${MAX_DESCRIPTION_LENGTH}`;
        msg += ` characters, was: ${description.length}`;
        logError(filename, position, msg);
      }
      if (description.indexOf('<') >= 0 || description.indexOf('`') >= 0) {
        msg = 'Attribute `description` cannot contain HTML or markdown, ';
        msg += `found: ${description}`;
        logError(filename, position, msg);
      }
    }

    // Validate wf_updated
    matched = wfRegEx.RE_UPDATED_ON.exec(contents);
    if (!isInclude) {
      if (!matched) {
        msg = 'WF Tag `wf_updated_on` is missing (YYYY-MM-DD)';
        logError(filename, null, msg);
      } else {
        position = {line: getLineNumber(contents, matched.index)};
        let d = moment(matched[1], VALID_DATE_FORMATS, true);
        if (d.isValid() === false) {
          msg = 'WF Tag `wf_updated_on` invalid format (YYYY-MM-DD)';
          msg += `, found: ${matched[1]}`;
          logError(filename, position, msg);
        } else if (options.lastUpdateMaxDays) {
          if (d.isBefore(moment().subtract(options.lastUpdateMaxDays, 'days'))) {
            msg = 'WF Tag `wf_updated_on` must be within the last ';
            msg += options.lastUpdateMaxDays + ' days.';
            logWarning(filename, position, msg);
          }
        }
      }
    }

    // Validate wf_published
    matched = wfRegEx.RE_PUBLISHED_ON.exec(contents);
    if (!isInclude) {
      if (!matched) {
        msg = 'WF Tag `wf_published_on` is missing (YYYY-MM-DD)';
        logError(filename, null, msg);
      } else {
        position = {line: getLineNumber(contents, matched.index)};
        let d = moment(matched[1], VALID_DATE_FORMATS, true);
        if (d.isValid() === false) {
          msg = 'WF Tag `wf_published_on` invalid format (YYYY-MM-DD)';
          msg += `, found: ${matched[1]}`;
          logError(filename, position, msg);
        }
      }
    }

    // Validate featured image path
    matched = wfRegEx.RE_IMAGE.exec(contents);
    if (matched) {
      if (doesFileExist(matched[1]) !== true) {
        position = {line: getLineNumber(contents, matched.index)};
        msg = 'WF Tag `wf_featured_image` found, but couldn\'t find ';
        msg += `image - ${matched[1]}`;
        logError(filename, position, msg);
      }
    }

    // Validate featured square image path
    matched = wfRegEx.RE_IMAGE_SQUARE.exec(contents);
    if (matched) {
      if (doesFileExist(matched[1]) !== true) {
        position = {line: getLineNumber(contents, matched.index)};
        msg = 'WF Tag `wf_featured_image_square` found, but couldn\'t find ';
        msg += `image - ${matched[1]}`;
        logError(filename, position, msg);
      }
    }

    // Check for uncommon tags
    matched = wfRegEx.RE_TAGS.exec(contents);
    if (matched && options.commonTags) {
      position = {line: getLineNumber(contents, matched.index)};
      matched[1].split(',').forEach(function(tag) {
        tag = tag.trim();
        if (options.commonTags.indexOf(tag) === -1) {
          msg = `Uncommon tag (\`${tag}\`) found.`;
          logWarning(filename, position, msg);
        }
      });
    }

    // Check for valid Blink components
    matched = wfRegEx.RE_BLINK_COMPONENTS.exec(contents);
    if (matched && options.blinkComponents) {
      position = {line: getLineNumber(contents, matched.index)};
      matched[1].split(',').forEach(function(component) {
        component = component.trim();
        if (options.blinkComponents.indexOf(component) === -1) {
          msg = `The component (\`${component}\`) is non-standard or misspelled.`
          logError(filename, position, msg);
        }
      })
    } else {
      msg = 'No `wf_blink_components` field found in metadata. Add if appropriate.';
      logWarning(filename, '', msg);
    }

    // Check for valid regions
    matched = wfRegEx.RE_REGION.exec(contents);
    if (matched) {
      let region = matched[1];
      if (VALID_REGIONS.indexOf(region) === -1) {
        position = {line: getLineNumber(contents, matched.index)};
        msg = 'Invalid `wf_region` (' + region + ') provided.';
        logError(filename, position, msg);
      }
    }

    // Check for valid verticals
    matched = wfRegEx.RE_VERTICAL.exec(contents);
    if (matched) {
      let vertical = matched[1];
      if (VALID_VERTICALS.indexOf(vertical) === -1) {
        position = {line: getLineNumber(contents, matched.index)};
        msg = 'Invalid `wf_vertical` (' + vertical + ') provided.';
        logError(filename, position, msg);
      }
    }

    // Check for a single level 1 heading with page title
    matched = wfRegEx.RE_TITLE.exec(contents);
    if (pageType === PAGE_TYPES.ARTICLE && !matched && !isInclude) {
      msg = 'Page is missing page title eg: `# TITLE {: .page-title }`';
      logError(filename, null, msg);
    }
    if (matched && isInclude) {
      msg = 'Include file should not contain a page title!';
      position = {line: getLineNumber(matched.index)};
      logError(filename, position, msg);
    }

    // Check for only a single instance of the {: .page-title } class
    matched = wfRegEx.getMatches(wfRegEx.RE_TITLE_CLASS, contents);
    msg = 'Page can only contain ONE title class `{: .page-title }`';
    let maxMatches = 1;
    if (isInclude) {
      msg = 'Includes should not contain any `{: .page-title }` classes.';
      maxMatches = 0;
    }
    if (matched.length > maxMatches) {
      matched.forEach(function(match) {
        position = {line: getLineNumber(contents, match.index)};
        logError(filename, position, msg);
      });
    }

    // Verify authors/translators are in the contributors file
    if (options.contributors) {
      matched = wfRegEx.getMatches(wfRegEx.RE_AUTHOR_LIST, contents);
      matched.forEach(function(match) {
        let key = match[1];
        if (!options.contributors[key]) {
          position = {line: getLineNumber(contents, match.index)};
          msg = `Unable to find contributor (\`${key}\`) in contributors file.`;
          logError(filename, position, msg);
        }
      });
    }

    // Verify all includes start with web/
    matched = wfRegEx.getMatches(wfRegEx.RE_INCLUDES, contents);
    matched.forEach(function(include) {
      let inclFile = include[1];
      if (inclFile === 'comment-widget.html' ||
          inclFile.indexOf('web/_shared/contributors/') === 0 ||
          inclFile.indexOf('web/_shared/latest_show.html') === 0) {
        return;
      }
      position = {line: getLineNumber(contents, include.index)};
      if (inclFile.indexOf('web/') !== 0) {
        msg = `Include path MUST start with \`web/\` - ${inclFile}`;
        logError(filename, position, msg);
      }
      if (doesFileExist(inclFile) !== true) {
        msg = '`{% include %}` tag found, but couldn\'t find related include'
        logError(filename, position, `${msg}: ${inclFile}`);
      }
    });

    // Verify all {% includecode %} elements work properly
    matched = wfRegEx.getMatches(wfRegEx.RE_INCLUDE_CODE, contents);
    matched.forEach(function(match) {
      const msg = 'IncludeCode widget -';
      const widget = match[0];
      const position = {line: getLineNumber(contents, match.index)};
      const inclFile = wfRegEx.getMatch(wfRegEx.RE_INCLUDE_CODE_PATH, widget, null);
      if (inclFile.indexOf('web/') !== 0) {
        logError(filename, position, `${msg} path must start with 'web/'`);
      }
      if (doesFileExist(inclFile) !== true) {
        logError(filename, position, `${msg} file not found: '${inclFile}'`);
      }
    });

    // Verify all <<include.md>> markdown files are accessible
    matched = wfRegEx.getMatches(wfRegEx.RE_INCLUDE_MD, contents);
    matched.forEach(function(match) {
      let inclFile = path.resolve(path.parse(filename).dir, match[1]);
      if (doesFileExist(inclFile) !== true) {
        position = {line: getLineNumber(contents, match.index)};
        msg = `Markdown include ${match[0]} found, but couldn't find file.`;
        logError(filename, position, msg);
      }
    });

    // Error on single line comments
    matched = wfRegEx.getMatches(wfRegEx.RE_SINGLE_LINE_COMMENT, contents);
    matched.forEach(function(match) {
      position = {line: getLineNumber(contents, match.index)};
      msg = 'Multi-line comment syntax used on single line comment.';
      msg += ' Use single line syntax: `{# this is my comment #}`';
      logError(filename, position, msg);
    });

    // Warn on unescaped template tags
    matched = wfRegEx.getMatches(/\{\{/g, contents);
    matched.forEach(function(match) {
      position = {line: getLineNumber(contents, match.index)};
      msg = 'Template tags (`{{`) should be escaped to `&#123;&#123;`';
      logError(filename, position, msg);
    });

    // Error on bad anchor tags
    matched = wfRegEx.getMatches(/{#\w+}/gm, contents);
    matched.forEach(function(match) {
      position = {line: getLineNumber(contents, match.index)};
      msg = 'Unsupported anchor style used, use `{: #anchor }`, found: ';
      msg += `\`${match[0]}\``;
      logError(filename, position, msg);
    });

    // Error on script blocks in markdown
    matched = wfRegEx.getMatches(/<script/gm, contents);
    matched.forEach(function(match) {
      position = {line: getLineNumber(contents, match.index)};
      msg = `'<script> tags are generally not allowed, please double check.`;
      logWarning(filename, position, msg);
    });

    // Warn on missing comment widgets
    let reComment = /^{%\s?include "comment-widget\.html"\s?%}/m;
    let reUpdatesPath = /src\/content\/.+?\/updates\/\d{4}\//;
    if (reUpdatesPath.test(filename)) {
      if (!reComment.test(contents)) {
        position = {line: getLineNumber(contents, contents.length -1)};
        msg = 'Updates post is missing comment widget: '
        msg += '`{% include "comment-widget.html" %}`';
        logWarning(filename, position, msg);
      }
    }

    remarkLintOptions.firstHeadingLevel = 1;
    if (isInclude) {
      remarkLintOptions.firstHeadingLevel = 2;
    }
    if (pageType === PAGE_TYPES.LANDING) {
      remarkLintOptions.firstHeadingLevel = 2;
    }
    remarkLintOptions.maximumLineLength = false;
    if (options.enforceLineLengths) {
      remarkLintOptions.maximumLineLength = 100;
      contents = contents.replace(wfRegEx.RE_DESCRIPTION, '\n');
      contents = contents.replace(wfRegEx.RE_SNIPPET, '\n\n');
    }

    // Use remark to lint the markdown
    let vFile = vfile({path: filename, extname: '.md', contents: contents});
    remark()
    .use(remarkLint, remarkLintOptions)
    .process(vFile, function(err, vFileResult) {
      if (err) {
        msg = `Critical linting error: ${err.message}`;
        logError(filename, null, msg, err);
      }
      if (vFileResult) {
        vFileResult.messages.forEach(function(vMsg) {
          let position = {
            line: vMsg.line,
            column: vMsg.column
          };
          if (REMARK_WARNING_ONLY.indexOf(vMsg.ruleId) >= 0) {
            logWarning(filename, position, vMsg.message, vMsg);
          } else {
            logError(filename, position, vMsg.message, vMsg);
          }
        });
      }
      resolve(true);
    });
  })
  .catch(function(ex) {
    let msg = `An exception occurred in testMarkdown: ${ex}`;
    logError(filename, null, msg, ex);
    return false;
  });
}

/**
 * Tests a YAML file
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function testYAML(filename, contents) {
  return new Promise(function(resolve, reject) {
    parseYAML(filename, contents);
    resolve(true);
  })
  .catch(function(ex) {
    let msg = `An exception occurred in testYAML: ${ex}`;
    logError(filename, null, msg, ex);
    return false;
  });
}

/**
 * Tests a JSON file
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function testJSON(filename, contents) {
  return new Promise(function(resolve, reject) {
    parseJSON(filename, contents);
    resolve(true);
  })
  .catch(function(ex) {
    let msg = `An exception occurred in testJSON: ${ex}`;
    logError(filename, null, msg, ex);
    return false;
  });
}

/**
 * Tests & validates a JavaScript file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function testJavaScript(filename, contents, options) {
  return new Promise(function(resolve, reject) {
    let isInCodeFolder = filename.indexOf('/_code/') > 0;
    if (options.warnOnJavaScript && !isInCodeFolder) {
      logWarning(filename, null, 'JavaScript files are generally not allowed.');
    }
    resolve(true);
  })
  .catch(function(ex) {
    let msg = `An exception occurred in testJavaScript: ${ex}`;
    logError(filename, null, msg, ex);
    return false;
  });
}

/**
 * Tests & validates an HTML file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested
 * @param {string} contents The contents of the file to be tested
 * @return {Promise} A promise that resolves with TRUE if the file was tested
 *  or FALSE if the file was not tested.
 */
function testHTML(filename, contents, options) {
  return new Promise(function(resolve, reject) {

    let isInCodeFolder = filename.indexOf('/_code/') > 0;

    // Throw error on hard coded developers.google.com
    if (!isInCodeFolder) {
      let matched = wfRegEx.getMatches(/developers\.google\.com/g, contents);
      matched.forEach(function(match) {
        let position = {line: getLineNumber(contents, match.index)};
        let msg = 'Do not use hard coded developers.google.com.';
        logError(filename, position, msg);
      });
    }

    resolve(true);
  })
  .catch(function(ex) {
    let msg = `An exception occurred in testHTML: ${ex}`;
    logError(filename, null, msg, ex);
    return false;
  });
}

/**
 * Tests and validates a commonTags.json file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {string} contents The unparsed contents of the tags file.
 * @return {Promise} A promise with the result of the test.
 */
function testCommonTags(filename, contents) {
  return new Promise(function(resolve, reject) {
    let tags = parseJSON(filename, contents);
    if (Array.isArray(tags) === true) {
      resolve(true);
    } else {
      let msg = `Common tags file must be an array, was ${typeof tags}`
      logError(filename, null, msg);
      resolve(false);
    }
  });
}

/**
 * Tests and validates a _project.yaml file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {string} contents The unparsed contents of the project file.
 * @return {Promise} A promise with the result of the test.
 */
function testProject(filename, contents) {
  return new Promise(function(resolve, reject) {
    const project = parseYAML(filename, contents);
    jsonValidator.prototype.customFormats.wfUAString = function(input) {
      return input === 'UA-52746336-1'
    }
    const schemaProject = {
      id: '/Project',
      type: 'object',
      properties: {
        is_family_root: {type: 'boolean'},
        parent_project_metadata_path: {
          type: 'string',
          pattern: /^\/web\/_project.yaml$/
        },
        name: {type: 'string', required: true},
        description: {type: 'string', required: true},
        home_url: {type: 'string', pattern: /^\/web\//i, required: true},
        color: {type: 'string', pattern: /^google-blue|orange$/, required: true},
        buganizer_id: {type: 'number', pattern: /^180451$/, required: true},
        content_license: {
          type: 'string',
          pattern: /^cc3-apache2$/,
          required: true
        },
        footer_path: {type: 'string', required: true},
        icon: {
          type: 'object',
          properties: {
            path: {type: 'string', required: true}
          },
          additionalProperties: false,
          required: true,
        },
        google_analytics_ids: {
          type: 'array',
          items: {type: 'string', format: 'wfUAString'},
          required: true
        },
        tags: {type: 'array'},
        announcement: {
          type: 'object',
          properties: {
            description: {type: 'string', required: true},
          },
          additionalProperties: false
        }
      },
      additionalProperties: false,
    }
    let validator = new jsonValidator();
    validator.validate(project, schemaProject).errors.forEach((err) => {
      let msg = `${err.stack || err.message}`;
      msg = msg.replace('{}', '(' + err.instance + ')');
      logError(filename, null, msg);
    });
    resolve();
  });
}


/**
 * Tests and validates a contributors.yaml file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {string} contents The unparsed contents of the contributors file.
 * @return {Promise} A promise with the result of the test.
 */
function testContributors(filename, contents) {
  return new Promise(function(resolve, reject) {
    let msg;
    let contributors = parseYAML(filename, contents);
    const schemaContributors = {
      id: '/Contributors',
      patternProperties: {
        '.*': {$ref: '/Contributor'}
      }
    };
    const schemaContributor = {
      id: '/Contributor',
      properties: {
        name: {
          type: 'object',
          properties: {
            given: {type: 'string'},
            family: {type: 'string'},
          },
          required: ['given'],
          additionalProperties: false,
        },
        org: {
          type: 'object',
          properties: {
            name: {type: 'string'},
            unit: {type: 'string'},
          },
          additionalProperties: false,
        },
        homepage: {type: 'string', pattern: /^https?:\/\//i},
        google: {type: 'string', pattern: /^(\+[a-z].*$|[0-9].*$)/i},
        twitter: {type: 'string', pattern: /^[a-z0-9_-]+$/i},
        github: {type: 'string', pattern: /^[a-z0-9_-]+$/i},
        lanyrd: {type: 'string', pattern: /^[a-z0-9_-]+$/i},
        description: {
          type: 'object',
          properties: {
            en: {type: 'string'},
          },
          additionalProperties: false,
        },
        role: {type: 'array'},
        country: {type: 'string'},
        email: {type: 'string'}
      },
      required: ['name'],
      additionalProperties: false,
    };
    let validator = new jsonValidator();
    validator.addSchema(schemaContributor, schemaContributor.id);
    validator.validate(contributors, schemaContributors)
      .errors.forEach((err) => {
        let msg = `${err.stack || err.message}`;
        msg = msg.replace('{}', '(' + err.instance + ')');
        logError(filename, null, msg);
      }
    );
    let prevFamilyName = '';
    Object.keys(contributors).forEach((key) => {
      if (/^[a-z]*$/gi.test(key) === false) {
        const msg = `Identifier must contain only letters, was '${key}'`;
        logError(filename, null, msg);
      }
      if (RESERVED_FILENAMES.indexOf(key.toLowerCase()) >= 0) {
        const msg = `Identifier cannot contain reserved word: '${key}'`;
        logError(filename, null, msg);
      }
      const contributor = contributors[key];
      const familyName = contributor.name.family || contributor.name.given;
      if (prevFamilyName.toLowerCase() > familyName.toLowerCase()) {
        const msg = `${prevFamilyName} came before ${key}`;
        logError(filename, null, msg);
      }
      prevFamilyName = familyName;
    });
    resolve();
  });
}


/**
 * Tests and validates a glossary.yaml file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {string} contents The unparsed contents of the glossary file.
 * @return {Promise} A promise with the result of the test.
 */
function testGlossary(filename, contents) {
  return new Promise(function(resolve, reject) {
    const msg = 'Glossary must be sorted alphabetically by term.';
    const glossary = parseYAML(filename, contents);
    const schemaGlossary = {
      id: '/Glossary',
      type: 'array',
      items: {$ref: '/GlossaryItem'}
    };
    const schemaGlossaryItem = {
      id: '/GlossaryItem',
      type: 'object',
      properties: {
        term: {type: 'string', required: true},
        description: {type: 'string', required: true},
        acronym: {type: 'string'},
        see: {$ref: '/GlossaryLink'},
        blink_component: {type: 'string'},
        tags: {type: 'array'},
        links: { type: 'array', items: {$ref: '/GlossaryLink'}},
      },
      additionalProperties: false,
    };
    const schemaGlossaryLink = {
      id: '/GlossaryLink',
      properties: {
        title: {type: 'string', required: true},
        link: {type: 'string', required: true},
      },
      additionalProperties: false
    };
    let validator = new jsonValidator();
    validator.addSchema(schemaGlossaryItem, schemaGlossaryItem.id);
    validator.addSchema(schemaGlossaryLink, schemaGlossaryLink.id);
    validator.validate(glossary, schemaGlossary).errors.forEach((err) => {
      let msg = `${err.stack || err.message}`;
      msg = msg.replace('{}', '(' + err.instance + ')');
      if (err.argument === 'description' && err.name === 'required') {
        logWarning(filename, null, msg);
        return;
      }
      logError(filename, null, msg);
    });
    let prevTermName = '';
    glossary.forEach((term) => {
      const termName = term.term.toLowerCase();
      if (prevTermName > termName) {
        const msg = `'${prevTermName}' came before '${termName}'`;
        logError(filename, null, msg);
      }
      prevTermName = termName;
    });
    resolve();
  });
}

/**
 * Tests and validates a _redirects.yaml file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {string} contents The unparsed contents of the redirects file.
 * @return {Promise} A promise with the result of the test.
 */
function testRedirects(filename, contents) {
  return new Promise(function(resolve, reject) {
    let parsed = parseYAML(filename, contents);
    let fromPattern = path.dirname(filename).split('/').splice(3).join('/');
    fromPattern = path.join('/', 'web', fromPattern, '/');
    const schemaRedirects = {
      id: '/Redirects',
      type: 'object',
      properties: {
        redirects: {type: 'array', items: {$ref: '/RedirectItem'}}
      },
      additionalProperties: false,
      required: ['redirects']
    };
    const schemaRedirectItem = {
      id: '/RedirectItem',
      type: 'object',
      properties: {
        to: {type: 'string', required: true},
        from: {
          type: 'string',
          pattern: new RegExp('^' + fromPattern.replace(/\//g, '\\/')),
          required: true
        },
        temporary: {type: 'boolean'},
      },
      additionalProperties: false,
    };
    let validator = new jsonValidator();
    validator.addSchema(schemaRedirectItem, schemaRedirectItem.id);
    validator.validate(parsed, schemaRedirects).errors.forEach((err) => {
      let msg = err.stack || err.message;
      msg = msg.replace('{}', '(' + err.instance + ')');
      logError(filename, null, msg);
    });
    resolve();
  });
}


/******************************************************************************
 * Primary File Test
 *****************************************************************************/

/**
 * Tests & validates a file.
 *   Note: The returned promise always resolves, it will never reject.
 *
 * @param {string} filename The name of the file to be tested.
 * @param {Object} contributors The list of contributors
 * @return {Promise} A promise that resolves after the tests have completed.
 */
function testFile(filename, opts) {
  return new Promise(function(resolve, reject) {
    let msg;
    let testPromise;
    let filenameObj = path.parse(filename.toLowerCase());

    // Check if the file is an extension we skip
    if (EXTENSIONS_TO_SKIP.indexOf(filenameObj.ext) >= 0) {
      if (GLOBAL.WF.options.verbose) {
        msg = 'Skipped (extension).';
        gutil.log(chalk.gray('SKIP:'), chalk.cyan(filename), msg);
      }
      resolve(false);
      return;
    }

    // Check media files & verify they're not too big
    if (MEDIA_FILES.indexOf(filenameObj.ext) >= 0) {
      let fsOK = true;
      try {
        // Read the file size and check if it exceeds the known limits
        const stats = fs.statSync(filename);
        const fileSize = Math.round(parseInt(stats.size, 10) / 1024);
        if (fileSize > MAX_FILE_SIZE_ERROR) {
          fsOK = false;
          msg = `Exceeds maximum files size (${MAX_FILE_SIZE_ERROR}K)`;
          // For builds of master on Travis, warn only, do not error.
          if (IS_TRAVIS && IS_TRAVIS_PUSH && IS_TRAVIS_ON_MASTER) {
            logWarning(filename, null, `${msg} - was ${fileSize}K`);
          } else {
            logError(filename, null, `${msg} - was ${fileSize}K`);
          }
        } else if (fileSize > MAX_FILE_SIZE_WARN) {
          fsOK = false;
          msg = `Try to keep files below (${MAX_FILE_SIZE_WARN}K)`;
          logWarning(filename, null, `${msg} - was ${fileSize}K`);
        }
      } catch (ex) {
        fsOK = false;
        logWarning(filename, null, `Unable to read file stats: ${ex.message}`);
      }
      resolve(fsOK);
      return;
    }

    // Attempt to read the file contents
    let contents = readFile(filename);
    if (!contents) {
      resolve(false);
      return;
    }

    // Check if the file is auto-generated, if it is, ignore it
    if (wfRegEx.RE_AUTO_GENERATED.test(contents)) {
      if (GLOBAL.WF.options.verbose) {
        msg = 'Skipped (auto-generated).';
        gutil.log(chalk.gray('SKIP:'), chalk.cyan(filename), msg);
      }
      resolve(false);
      return;
    }

    if (GLOBAL.WF.options.verbose) {
      gutil.log('TEST:', chalk.cyan(filename));
    }

    if (filenameObj.base === 'app.yaml') {
      let msg = 'app.yaml was changed, was that intentional?';
      logWarning(filename, null, msg);
      testPromise = testYAML(filename, contents);
    } else if (filenameObj.base === '_contributors.yaml') {
      testPromise = testContributors(filename, contents);
    } else if (filenameObj.base === 'glossary.yaml') {
      testPromise = testGlossary(filename, contents);
    } else if (filenameObj.base === '_redirects.yaml') {
      testPromise = testRedirects(filename, contents);
    } else if (filenameObj.base === '_project.yaml') {
      testPromise = testProject(filename, contents);
    } else if (filenameObj.base === 'commontags.json') {
      testPromise = testCommonTags(filename, contents);
    } else if (MD_FILES.indexOf(filenameObj.ext) >= 0) {
      testPromise = testMarkdown(filename, contents, opts);
    } else if (filenameObj.ext === '.html') {
      testPromise = testHTML(filename, contents);
    } else if (filenameObj.ext === '.yaml') {
      testPromise = testYAML(filename, contents);
    } else if (filenameObj.ext === '.json') {
      testPromise = testJSON(filename, contents);
    } else if (filenameObj.ext === '.js') {
      testPromise = testJavaScript(filename, contents, opts);
    } else if (filenameObj.ext === '.txt') {
      // Text files are allowed and don't need to be tested.
      resolve(true);
      return;
    } else {
      let msg = 'No tests found for file type, was not tested.';
      logWarning(filename, null, msg);
      resolve(false);
      return;
    }
    testPromise.then(function() {
      resolve(true);
    });
  })
  .catch(function(ex) {
    let msg = `A critical test exception occurred: ${ex.message}`;
    logError(filename, null, msg, ex);
  })
  .then(function(wasTested) {
    if (wasTested) {
      filesTested++;
    }
  });
}

/******************************************************************************
 * Gulp Test Task
 *****************************************************************************/

gulp.task('test', function() {
  if (IS_TRAVIS && IS_TRAVIS_PUSH && IS_TRAVIS_ON_MASTER) {
    GLOBAL.WF.options.testAll = true;
  }
  let opts = {
    enforceLineLengths: true,
    lastUpdateMaxDays: 7,
    warnOnJavaScript: true,
    commonTags: parseJSON(COMMON_TAGS_FILE, readFile(COMMON_TAGS_FILE)),
    contributors: parseYAML(CONTRIBUTORS_FILE, readFile(CONTRIBUTORS_FILE)),
    blinkComponents: parseJSON(BLINK_COMPONENTS_FILE, readFile(BLINK_COMPONENTS_FILE))
  }
  if (GLOBAL.WF.options.testTests) {
    GLOBAL.WF.options.testPath = './src/tests';
    opts.lastUpdateMaxDays = false;
  }
  if (GLOBAL.WF.options.testAll) {
    opts.enforceLineLengths = false;
    opts.lastUpdateMaxDays = false;
  }
  return getFiles()
  .then(function(files) {
    return Promise.all(files.map(function(filename) {
      return testFile(filename, opts);
    }));
  })
  .catch(function(ex) {
    let msg = `A critical gulp task exception occurred: ${ex.message}`;
    logError('gulp-tasks/test.js', null, msg, ex);
  })
  .then(printSummary)
  .then(throwIfFailed);
});
